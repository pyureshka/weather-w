<script setup>
import { useWeather } from '../composables/useWeather'
import { useStore } from '../composables/useStore'

let { formatName, formatDesc, formatTemp, getIcon } = useWeather()

let { store } = useStore()
</script>

<template>
  <div v-for="city in store" :key="city.id">
    <span class="text-h5">{{ formatName(city.name, city.sys.country) }}</span>

    <div class="row flex-center q-gutter-md">
      <img :src="getIcon(city.weather[0].icon)" alt="Weather icon" />
      <span class="text-h2">{{ formatTemp(city.main.temp) }}</span>
    </div>

    <div class="row">
      {{ formatDesc(city.main.feels_like, city.weather[0].main) }}
    </div>

    <div class="row items-center">
      <div class="col-6">
        <q-icon name="mdi-navigation-variant"></q-icon>
        {{ city.wind.speed }}m/s SSE
      </div>

      <div class="col-6">
        <q-icon name="mdi-speedometer"></q-icon>
        {{ city.main.pressure }}hPa
      </div>
    </div>

    <div class="row">
      <div class="col-6">Humidity: {{ city.main.humidity }}</div>

      <div class="col-6">Visibility: {{ city.visibility }}</div>
    </div>
  </div>
</template>
