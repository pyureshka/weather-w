<script setup>
import { ref } from 'vue'
import Settings from './Settings.vue'
import { useStore } from '../composables/useStore'
import { useWeather } from '../composables/useWeather'

let { store } = useStore()
let isSettings = ref(false)
let { formatName, formatDesc, formatTemp } = useWeather()

function getIcon(id) {
  return `https://openweathermap.org/img/wn/${id}@2x.png`
}

function onSettings() {
  isSettings.value = !isSettings.value
}
</script>
<template>
  <div class="row">
    <q-card flat bordered class="col-4">
      <q-card-section class="row justify-end q-pa-xs">
        <q-btn
          @click="onSettings"
          :icon="isSettings ? 'mdi-close' : 'mdi-cog'"
          flat
          round
          color="dark"
          class="justufy-end"
        />
      </q-card-section>

      <div v-if="isSettings">
        <q-card-section>
          <settings />
        </q-card-section>
      </div>

      <div v-else>
        <q-card-section v-for="city in store" :key="city.id" class="q-pt-none">
          <div class="text-h6">{{ formatName(city.name, city.sys.country) }}</div>
          <div class="row flex-center q-gutter-md">
            <div id="icon"><img :src="getIcon(city.weather[0].icon)" alt="Weather icon" /></div>
            <div class="text-h2">{{ formatTemp(city.main.temp) }}</div>
          </div>

          <div class="row">
            {{ formatDesc(city.main.feels_like, city.weather[0].main) }}
          </div>
        </q-card-section>
      </div>
    </q-card>
  </div>
</template>
