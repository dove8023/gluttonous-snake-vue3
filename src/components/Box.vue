<template>
    <div class="main-box"
        :style="{ width, height }"
    >
        <Cell 
            v-for="item in coordinates"
            :id="item.id"
            :snake="snake"
            :key="item.id"
         />
    </div>
</template>

<script setup>
import Cell from "./Cell.vue";

import { Snake } from "../../common/snake";
import { onMounted } from "@vue/runtime-core";
const CELL_SIDE = 20;

const { x, y } = defineProps({
    x: Number,
    y: Number
});

const snake = new Snake(x, y);

const width = x * CELL_SIDE + 'px';
const height = y * CELL_SIDE + 'px';
const coordinates = snake.createCoordinates();
document.onkeydown = (event) => {
    snake.keydown(event);
}

onMounted(()=>{
    setTimeout(() => {
        snake.start();
    }, 1000);
})

</script>

<style>
.main-box {
    margin: 100px auto 0;
    border: 1px solid #666;
}
</style>