<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-10">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'defaultLayout',

  data () {
    return {
      abd: {}
    }
  }
}
</script>
