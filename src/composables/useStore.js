import { ref, watch } from 'vue'
import { getWeatherByCord } from '../services/weather.service'

const weatherKey = 'weather'

let store = ref(JSON.parse(localStorage.getItem(weatherKey) || JSON.stringify([])))

watch(() => store, save, { deep: true, immediate: true })

function getPosition() {
  return new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej)
  })
}

async function initDefault() {
  const position = await getPosition()

  return await getWeatherByCord(position.coords.longitude, position.coords.latitude)
}

async function save(data) {
  if (data.value?.length === 0) {
    const def = await initDefault()
    store.value.push(def)
  }

  localStorage.setItem(weatherKey, JSON.stringify(data.value))
}

function read() {
  console.log(store)
  Object.assign(store.value, JSON.parse(localStorage.getItem(weatherKey) || store.value))
}

// read()

export function useStore() {
  return {
    store
  }
}
