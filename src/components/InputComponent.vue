<template>
    <form>

        <h1>PDB Visualizer</h1>

        <label>PDB File:</label>
        <input type="pdbFile" required v-model="pdbFile">

        <label>Structure Style:</label>
        <select v-model="structureStyle">
            <option value="spheresLines">Spheres + Lines</option>
            <option value="spheresOnly">Spheres Only</option>
            <option value="linesOnly">Lines Only</option>
            <option value="clouds">Clouds</option>
        </select>

        <label>Environment Style: </label>
        <select v-model="environmentStyle">
            <option value="default">Default</option>
            <option value="blood">Blood</option>
            <option value="emissive">Emissive</option>
            <option value="castleWall">Castle Wall</option>
        </select>

        <div class="caChoice">
            <input type="checkbox" v-model="caChoice">
            <label>Show CA Only</label>
        </div>


        <br>

        <button @click="submit">Submit</button>

    </form>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { BasicScene } from '@/Babylon/BasicScene';


export default {
    data() {
        return {
            email: '',
            pdbFile: '',
            structureStyle: 'spheresLines',
            environmentStyle: 'default',
            caChoice: false,
        }
    }
}



</script>

<style>
    form {
        max-width: 420px;
        margin: 30px auto;
        text-align: left;
        background: white;
        padding: 40px;
        border-radius: 10px;
    }
    label {
        color: #aaa;
        display: inline-block;
        margin: 25px 0 15px;
        font-size: 0.6em;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: bold; 
    }
    input, select {
        display: block;
        width: 100%;
        padding: 10px 6px;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #ddd;
        color: #555;
    }
    input[type="checkbox"] {
        display: inline-block;
        width: 16px;
        margin: 0 10px 0 0;
        position: relative;
        top: 2px;
    }
    h1 {
        text-align: center; 
    }
</style>