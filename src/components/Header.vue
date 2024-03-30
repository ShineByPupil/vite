<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter, RouteRecordName } from "vue-router";
import Tab from "./Tab.vue";

const route_name = ref<RouteRecordName>("");
const store = useStore();
const router = useRouter();

// 更新侧边栏的状态
router.beforeEach((to) => {
  store.state.route_cache_set.has(to.name) ||
    store.commit("route_cache_set_add", to.name);

  route_name.value = to.name as RouteRecordName;
});

Object.assign(window, {
  route_name,
  route_cache_set: store.state.route_cache_set,
});
</script>

<template>
  <header>
    <Tab :active="route_name" :list="store.state.route_cache_set" />
  </header>
</template>

<style scoped lang="scss">
header {
  height: 50px;
  border-bottom: 1px solid #dddddd;
}
</style>
