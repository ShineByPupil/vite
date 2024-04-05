<script setup lang="ts">
import Header from "@/components/Header.vue";
import Aside from "@/components/Aside.vue";

import { computed } from "vue";
import store from "@/store";

const route_cache_include = computed<[]>(
  () => store.getters["route_cache_include"]
);
const isLogin = computed<boolean>(() => store.state.isLogin);
</script>

<template>
  <template v-if="!isLogin">
    <Header />

    <Aside />
  </template>

  <main>
    <router-view v-slot="{ Component }">
      <keep-alive :max="store.route_cache_max" :include="route_cache_include">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </main>
</template>

<style lang="scss">
#app {
  height: 100%;
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
