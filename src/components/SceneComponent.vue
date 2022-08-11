<template>
  <div>
    <h3>
        PDB Visualizer
    </h3>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { BasicScene } from '@/Babylon/BasicScene';

export default defineComponent ({
name: 'SceneComponent',
mounted(){
    const canvas = document.querySelector("canvas"); 
    new BasicScene(canvas); 
}
}); 
</script>

<style scoped>
    canvas {
        width: 80%;
        height: 80%; 
    }
</style>