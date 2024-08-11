<script setup lang="ts">
const websoket = new WebSocket("ws://localhost:4001/business1");

websoket.onopen = () => {
  console.log("open");

  send();
};

websoket.onclose = () => {
  console.log("close");
};

websoket.onmessage = (event) => {
  console.log(event.data);
};

websoket.onerror = (event) => {
  console.log(event);
};

const send = () => {
  websoket.send("hello");
};
</script>

<template>websoket</template>

<style scoped></style>
