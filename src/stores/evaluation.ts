import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Student {
  id: string
  name: string
  number: string
  avatar?: string
  attendance: number
  participation: number
  assignments: number
  overallScore: number
}

export interface EvaluationRecord {
  id: string
  studentId: string
  date: string
  scores: {
    attendance: number
    participation: number
    assignment: number
    practice: number
  }
  comments: string
}

export const useEvaluationStore = defineStore('evaluation', () => {
  const students = ref<Student[]>([
    {
      id: '1',
      name: '张明',
      number: '2024001',
      attendance: 95,
      participation: 85,
      assignments: 90,
      overallScore: 90
    },
    {
      id: '2',
      name: '李华',
      number: '2024002',
      attendance: 88,
      participation: 92,
      assignments: 85,
      overallScore: 88
    },
    {
      id: '3',
      name: '王芳',
      number: '2024003',
      attendance: 92,
      participation: 78,
      assignments: 88,
      overallScore: 86
    },
    {
      id: '4',
      name: '赵强',
      number: '2024004',
      attendance: 85,
      participation: 80,
      assignments: 82,
      overallScore: 82
    }
  ])

  const evaluationRecords = ref<EvaluationRecord[]>([])

  function updateStudentScore(studentId: string, field: keyof Student, value: number) {
    const student = students.value.find(s => s.id === studentId)
    if (student) {
      student[field] = value
      // 重新计算总分
      student.overallScore = Math.round(
        (student.attendance * 0.3 +
        student.participation * 0.3 +
        student.assignments * 0.4)
      )
    }
  }

  function addEvaluation(record: Omit<EvaluationRecord, 'id'>) {
    const newRecord: EvaluationRecord = {
      ...record,
      id: Date.now().toString()
    }
    evaluationRecords.value.push(newRecord)
    return newRecord
  }

  function getStudentById(id: string) {
    return students.value.find(s => s.id === id)
  }

  function getStudentEvaluations(studentId: string) {
    return evaluationRecords.value.filter(e => e.studentId === studentId)
  }

  return {
    students,
    evaluationRecords,
    updateStudentScore,
    addEvaluation,
    getStudentById,
    getStudentEvaluations
  }
})
