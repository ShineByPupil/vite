<script setup lang="ts">
import { ref, reactive, shallowRef, shallowReactive } from "vue";

const obj1 = ref({ a: 1, b: 2, obj: { a: 1, b: 2 } });
const obj2 = reactive({ a: 1, b: 2, obj: { a: 1, b: 2 } });
const obj3 = shallowRef({ a: 1, b: 2, obj: { a: 1, b: 2 } });
const obj4 = shallowReactive({ a: 1, b: 2, obj: { a: 1, b: 2 } });

Object.assign(window, { obj1, obj2, obj3, obj4 });

console.log("", obj1, "\n", obj2, "\n", obj3, "\n", obj4);
</script>

<template></template>

<style scoped lang="scss"></style>
