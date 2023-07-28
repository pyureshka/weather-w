<script setup>
import { ref } from 'vue'
import { useStore } from '../composables/useStore'
import { useWeather } from '../composables/useWeather'
import draggable from 'vuedraggable'

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
    <draggable v-model="store" itemKey="id" :options="{ draggable: 'q-list' }">
      <template #item="{ element: city }">
        <q-item class="bg-grey-2 q-pa-xs q-mb-sm">
          <q-item-section avatar>
            <q-icon name="mdi-menu" class="handle" style="cursor: move"></q-icon>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ formatName(city.name, city.sys.country) }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn icon="mdi-delete" @click="onDelete(city)" round dense flat></q-btn>
          </q-item-section>
        </q-item>
      </template>
    </draggable>

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
