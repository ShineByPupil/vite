<script setup lang="ts">
let obj = {
  a: 2,
  b: 3,
};

let _obj = new Proxy(obj, {
  get(target: any, key: any) {
    console.log(target, key);
    return target[key];
  },
  set(target, key, value) {
    target[key] = value;
    return true;
  },
});

console.log("", obj, "\n", _obj);
</script>

<template>Proxy</template>

<style scoped></style>
