<script setup>
import { useStore } from '../composables/useStore'

let { store } = useStore()

function onDelete(item) {
  store.value.splice(store.value.indexOf(item), 1)
}
</script>
<template>
  <q-list class="q-pa-none">
    <q-item v-for="city in store" :key="city.id" class="bg-grey-2 q-pa-xs">
      <q-item-section avatar>
        <q-icon name="mdi-menu"></q-icon>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ city.name }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-btn icon="mdi-delete" @click="onDelete(city)" round dense flat></q-btn>
      </q-item-section>
    </q-item>
  </q-list>
</template>
