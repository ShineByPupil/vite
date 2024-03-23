<script setup lang="ts">
import axios from "axios";

axios.get("/api/hello").then((res) => {
  console.log(res.data);
});
</script>

<template>Report</template>

<style scoped></style>
