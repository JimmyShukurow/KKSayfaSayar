<template>
  <div class="title">{{ welcome }}</div>
  <div class="config">
    <div>
      <label for="start-date">Başlangıç Tarihi (dd-MM-YYYY)</label>
      <input type="text" id="start-date" v-model="startDateText" :disabled="disabled" />
    </div>
    <div>
      <label for="pages-per-day">Günlük Sayfa Sayısı</label>
      <input type="number" id="pages-per-day" v-model="pagesPerDay" :disabled="disabled" />
    </div>
    <div>
      <label for="pages-per-day">Başlangıç sayfa</label>
      <input type="number" id="pages-per-day" v-model="startPage" :disabled="disabled" />
    </div>
    <div v-if="not_now">
      <input type="checkbox" id="disabled" v-model="disabled" />
    </div>
  </div>
  <div class="pages">
    <div v-for="(item, i) in days" :key="i">
      <OneDayComponent
        :incoming-date="item.date"
        :page="item.page"
        :id="isToday(item.date) ? 'today' : null"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import OneDayComponent from '@/components/OneDayComponent.vue'
import { onMounted, ref } from 'vue'

const welcome = ref('Ikra Jimmy, Ikra ... Bol-bol oku')

const disabled = ref(true)
const not_now = ref(false)

const startDateText = ref('11-08-2025')
const pagesPerDay = ref(5)
const startDate = new Date('2025-08-11')
const startPage = ref(101)
const endPage = 600
const increment = 5
const totalDays = 120

const days = Array.from({ length: totalDays }, (_, i) => {
  // date
  const d = new Date(startDate)
  d.setDate(startDate.getDate() + i)

  // pages
  const firstPage = ((startPage.value - 1 + i * increment) % endPage) + 1
  const lastPage = firstPage + increment - 1
  const pageStr = `${firstPage}-${lastPage}`

  return { date: d, page: pageStr }
})

const isToday = (date: Date) => {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}
onMounted(() => {
  const el = document.getElementById('today')
  if (el) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }
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
.config {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 20px;
  font-size: 1rem;
  color: #555;
  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 4px;
    border-radius: 8px;
  }
  div {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
}

@media screen and (max-width: 500px) {
  .config {
    flex-direction: column;
    div {
      flex-direction: column;
    }
  }
}
</style>
