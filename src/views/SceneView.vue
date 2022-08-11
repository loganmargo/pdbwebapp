<template>
  <canvas>
    <SceneComponent />
  </canvas>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SceneComponent from '../components/SceneComponent.vue';
/* eslint-disable */
export default {
  name: "Scene",
  components: {
    SceneComponent
  }
}
</script>

<style scoped>
  canvas {
    width: 100%;
    height: 100%; 
  }
</style>