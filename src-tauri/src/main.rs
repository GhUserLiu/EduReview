// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize,Serialize};
use std::fs;
use std::path::PathBuf;
use tauri::{AppHandle, Manager};

#[derive(Debug, Serialize, Deserialize)]
pub struct StoreData {
    pub key: String,
    pub value: serde_json::Value,
}

// 获取应用数据目录
fn get_data_dir(handle: &AppHandle) -> Result<PathBuf, String> {
    handle.path()
        .app_data_dir()
        .map_err(|e| format!("Failed to get app data dir: {}", e))
}

// 确保数据目录存在
fn ensure_data_dir(handle: &AppHandle) -> Result<PathBuf, String> {
    let data_dir = get_data_dir(handle)?;
    fs::create_dir_all(&data_dir).map_err(|e| format!("Failed to create data dir: {}", e))?;
    Ok(data_dir)
}

// 获取数据文件路径
fn get_data_file(handle: &AppHandle, key: &str) -> Result<PathBuf, String> {
    let data_dir = ensure_data_dir(handle)?;
    Ok(data_dir.join(format!("{}.json", key)))
}

#[tauri::command]
async fn save_data(handle: AppHandle, key: String, value: serde_json::Value) -> Result<(), String> {
    let file_path = get_data_file(&handle, &key)?;
    let content = serde_json::to_string_pretty(&value)
        .map_err(|e| format!("Failed to serialize data: {}", e))?;
    fs::write(&file_path, content)
        .map_err(|e| format!("Failed to write data: {}", e))?;
    Ok(())
}

#[tauri::command]
async fn load_data(handle: AppHandle, key: String) -> Result<serde_json::Value, String> {
    let file_path = get_data_file(&handle, &key)?;
    if !file_path.exists() {
        return Ok(serde_json::json!(null));
    }
    let content = fs::read_to_string(&file_path)
        .map_err(|e| format!("Failed to read data: {}", e))?;
    let value: serde_json::Value = serde_json::from_str(&content)
        .map_err(|e| format!("Failed to parse data: {}", e))?;
    Ok(value)
}

#[tauri::command]
async fn delete_data(handle: AppHandle, key: String) -> Result<(), String> {
    let file_path = get_data_file(&handle, &key)?;
    if file_path.exists() {
        fs::remove_file(&file_path)
            .map_err(|e| format!("Failed to delete data: {}", e))?;
    }
    Ok(())
}

#[tauri::command]
async fn list_keys(handle: AppHandle) -> Result<Vec<String>, String> {
    let data_dir = ensure_data_dir(&handle)?;
    let mut keys = Vec::new();

    for entry in fs::read_dir(&data_dir)
        .map_err(|e| format!("Failed to read data dir: {}", e))?
    {
        let entry = entry.map_err(|e| format!("Failed to read entry: {}", e))?;
        if let Some(name) = entry.file_name().to_str() {
            if name.ends_with(".json") {
                keys.push(name.trim_end_matches(".json").to_string());
            }
        }
    }

    keys.sort();
    Ok(keys)
}

#[tauri::command]
async fn get_app_version() -> String {
    env!("CARGO_PKG_VERSION").to_string()
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .invoke_handler(tauri::generate_handler![
            save_data,
            load_data,
            delete_data,
            list_keys,
            get_app_version
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
