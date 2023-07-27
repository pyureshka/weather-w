import { ref } from 'vue'

function formatName(city, country) {
  return `${city}, ${country}`
}

function formatTemp(temp) {
  return `${Math.round(temp)}°C`
}

function formatDesc(feel, desc) {
  return `Feels like ${formatTemp(feel)}. ${desc}`
}

export function useWeather() {
  return {
    formatName,
    formatDesc,
    formatTemp
  }
}
