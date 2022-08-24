<template>
  <v-app>
    <v-app-bar absolute>
      <v-row justify="space-between">
        <v-col class="d-flex justify-start">
          <v-btn text>{{$t('lgvue')}}</v-btn>
        </v-col>
        <v-col class="d-flex justify-center">
        </v-col>
        <v-col class="d-flex justify-end">
          <languge></languge>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer app>
    </v-footer>
  </v-app>
</template>

<script>
import languge from '@/components/languge/'
export default {
  name: 'deflayout',
  components: {
    languge,
  },
}
</script>

<style>
</style>