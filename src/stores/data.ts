import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useDaysStore = defineStore('days', () => {
  // Load from localStorage or start empty
  const daysStatus = ref<Record<string, boolean>>(
    JSON.parse(localStorage.getItem('daysStatus') || '{}'),
  )

  // Save to localStorage whenever it changes
  watch(
    daysStatus,
    (newVal) => {
      localStorage.setItem('daysStatus', JSON.stringify(newVal))
    },
    { deep: true },
  )

  const setDayStatus = (date: Date, status: boolean) => {
    const key = date.toISOString().split('T')[0] // format YYYY-MM-DD
    daysStatus.value[key] = status
  }

  const getDayStatus = (date: Date) => {
    const key = date.toISOString().split('T')[0]
    return daysStatus.value[key] ?? false
  }

  return { daysStatus, setDayStatus, getDayStatus }
})
