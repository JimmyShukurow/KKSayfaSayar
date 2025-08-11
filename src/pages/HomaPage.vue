<template>
  <div class="title">{{ welcome }}</div>
  <div class="pages">
    <div v-for="(item, i) in days" :key="i">
      <OneDayComponent :incoming-date="item.date" :page="item.page" />
    </div>
  </div>
</template>

<script setup lang="ts">
import OneDayComponent from '@/components/OneDayComponent.vue'
import { ref } from 'vue'

const welcome = ref('Ikra Jimmy, Ikra ... Bol-bol oku')

const startDate = new Date('2025-06-11')
const startPage = 101
const endPage = 600
const increment = 5
const totalDays = 120

const days = Array.from({ length: totalDays }, (_, i) => {
  // date
  const d = new Date(startDate)
  d.setDate(startDate.getDate() + i)

  // pages
  const firstPage = ((startPage - 1 + i * increment) % endPage) + 1
  const lastPage = firstPage + increment - 1
  const pageStr = `${firstPage}-${lastPage}`

  return { date: d, page: pageStr }
})
</script>

<style scoped>
.title {
  font-size: 20px;
  color: #333;
  text-align: center;
  margin-block: 50px;
}
.pages {
  font-size: 20px;
  color: #333;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
