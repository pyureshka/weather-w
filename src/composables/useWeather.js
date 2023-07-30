import { ref } from 'vue'
import { getWeatherByCity } from '../services/weather.service'
import { useStore } from '../composables/useStore'

let { store } = useStore()

function formatName(city, country) {
  return `${city}, ${country}`
}

function formatTemp(temp) {
  return `${Math.round(temp)}°C`
}

function formatDesc(feel, desc) {
  return `Feels like ${formatTemp(feel)}. ${desc}`
}

async function createLocation(cityName) {
  const city = await getWeatherByCity(cityName)

  store.value.push(city)
}

function getIcon(id) {
  return `https://openweathermap.org/img/wn/${id}@2x.png`
}

export function useWeather() {
  return {
    formatName,
    formatDesc,
    formatTemp,
    createLocation,
    getIcon
  }
}
