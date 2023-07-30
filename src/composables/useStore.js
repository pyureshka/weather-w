import { ref, watch } from 'vue'
import { getWeatherByCord, getWeatherByCity } from '../services/weather.service'

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

async function updateStore() {
  const newStore = await Promise.all(store.value.map(async (el) => await getWeatherByCity(el.name)))

  Object.assign(store.value, newStore || store.value)
}

export function useStore() {
  return {
    store,
    updateStore
  }
}
