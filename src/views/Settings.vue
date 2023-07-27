<script setup>
import { ref } from 'vue'
import { useStore } from '../composables/useStore'
import { useWeather } from '../composables/useWeather'

let { store } = useStore()
let { createLocation, formatName } = useWeather()

let cityName = ref('')

function onDelete(item) {
  store.value.splice(store.value.indexOf(item), 1)
}

async function onCreate() {
  await createLocation(cityName.value).finally(() => (cityName.value = ''))
}
</script>
<template>
  <div class="col q-gutter-md">
    <q-list class="q-pa-none">
      <q-item v-for="city in store" :key="city.id" class="bg-grey-2 q-pa-xs q-mb-sm">
        <q-item-section avatar>
          <q-icon name="mdi-menu"></q-icon>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ formatName(city.name, city.sys.country) }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn icon="mdi-delete" @click="onDelete(city)" round dense flat></q-btn>
        </q-item-section>
      </q-item>
    </q-list>

    <q-input v-model="cityName" dense outlined rounded label="New location">
      <template v-slot:after>
        <q-btn
          @click="onCreate"
          icon="mdi-send"
          :disable="cityName.length === 0"
          round
          dense
          flat
        />
      </template>
    </q-input>
  </div>
</template>
