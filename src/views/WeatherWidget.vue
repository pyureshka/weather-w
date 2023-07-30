<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Settings from '../components/Settings.vue'
import WeatherList from '../components/WeatherList.vue'
import { useStore } from '../composables/useStore'

let { updateStore } = useStore()

let isSettings = ref(false)
let timer = ref(null)

async function onUpdate() {
  updateStore()
}

function onSettings() {
  isSettings.value = !isSettings.value
}

onMounted(() => {
  onUpdate()
  timer = setInterval(onUpdate, 60 * 1000)
})

onUnmounted(() => clearInterval(timer))
</script>
<template>
  <div class="row">
    <q-card flat bordered class="col-3">
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

      <q-card-section v-if="isSettings">
        <settings />
      </q-card-section>

      <q-card-section v-else class="q-gutter-y-md">
        <weather-list></weather-list>
      </q-card-section>
    </q-card>
  </div>
</template>
