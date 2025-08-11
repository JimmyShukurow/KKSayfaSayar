<template>
  <div class="one-day" :class="[status]" @click="checkDone()">
    <div>
      {{ date }}
    </div>
    <div>
      {{ turkishWeekday }}
    </div>
    <div>
      <label for="page"> Sayfa </label>
      <span>{{ page }}</span>
    </div>
    <input type="checkbox" v-model="done" id="page" />
    <StatusComponent v-if="done" class="status-done" />
  </div>
</template>

<script setup lang="ts">
import StatusComponent from '@/components/StatusComponent.vue'
import { onMounted, ref, computed } from 'vue'

const done = ref(false)

const status = ref('present') // 'past', 'present', or 'future'

const props = defineProps({
  incomingDate: {
    type: Date,
    default: () => new Date(),
    required: true,
  },
  page: {
    type: String,
    default: '101-105',
    required: true,
  },
})

const date = ref(
  props.incomingDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }),
)

const weekday = ref(props.incomingDate.toLocaleDateString('en-GB', { weekday: 'long' }))

// A map to convert English weekdays to Turkish weekdays
const turkishWeekdayMap = new Map([
  ['Monday', 'Pazartesi'],
  ['Tuesday', 'Salı'],
  ['Wednesday', 'Çarşamba'],
  ['Thursday', 'Perşembe'],
  ['Friday', 'Cuma'],
  ['Saturday', 'Cumartesi'],
  ['Sunday', 'Pazar'],
])

// A computed property to get the Turkish weekday
const turkishWeekday = computed(() => {
  return turkishWeekdayMap.get(weekday.value)
})

const checkDone = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // reset to midnight

  const incoming = new Date(props.incomingDate)
  incoming.setHours(0, 0, 0, 0)
  if (incoming <= today) {
    done.value = !done.value // toggle done status
  } else {
    alert('Bu gün daha gelmedi.')
    return
  }

  if (!done.value) {
    alert('eminmisin?')
  }
}

onMounted(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0) // reset to midnight

  const incoming = new Date(props.incomingDate)
  incoming.setHours(0, 0, 0, 0)

  if (incoming < today) {
    status.value = 'past'
  } else if (incoming.getTime() === today.getTime()) {
    status.value = 'present'
  } else {
    status.value = 'future'
  }
})
</script>
<style scoped>
.one-day {
  --size: 130px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  border-radius: 1rem;
  color: white;
  min-width: var(--size);
  max-width: var(--size);
  width: var(--size);
  min-height: var(--size);
  max-height: var(--size);
  height: var(--size);
  cursor: pointer;
  position: relative;
  user-select: none;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none;
}

.past {
  background-color: lightgray;
}
.present {
  background-color: cadetblue;
}
.future {
  background-color: lightcoral;
}
.status-done {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
