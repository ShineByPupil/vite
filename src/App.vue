<script setup lang="ts">
import Header from "@/components/Header.vue";
import Aside from "@/components/Aside.vue";
</script>

<template>
  <Header />

  <Aside />

  <main>
    <router-view></router-view>
  </main>
</template>

<style lang="scss">
#app {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "header header"
    "aside main";

  > header {
    grid-area: header;
  }

  > aside {
    grid-area: aside;
  }

  > main {
    grid-area: main;
    padding: 10px;
    background-color: #f2f2f2;
    overflow: hidden;
  }
}
</style>

<style scoped lang="scss"></style>
