<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, RouteRecordName } from "vue-router";
import { CloseOutlined } from "@ant-design/icons-vue";
import Space from "./Space.vue";

const route_name = ref<RouteRecordName>("");
const store = useStore();
const router = useRouter();
const list = computed<Array<RouteRecordName>>(() =>
  Array.from(store.state.route_cache_set)
);
const index = computed<number>(() => {
  return Array.from(list.value).indexOf(route_name.value);
});

function handleClose(name: RouteRecordName) {
  if (name === route_name.value) {
    router.back();
  }
  store.commit("route_cache_set_del", name);
}

// 更新侧边栏的状态
router.beforeEach((to) => {
  store.state.route_cache_set.has(to.name) ||
    store.commit("route_cache_set_add", to.name);

  route_name.value = to.name as RouteRecordName;
});

Object.assign(window, {
  store,
  list,
  index,
  route_name,
  route_cache_set: store.state.route_cache_set,
});
</script>

<template>
  <div class="tabs-wrap">
    <template v-for="(el, i) in list">
      <Space
        :type="index === i ? 'left' : index + 1 === i ? 'right' : 'default'"
      />

      <router-link
        :to="{ name: el }"
        class="tab"
        :class="{ active: index === i }"
      >
        <span class="text">
          {{ el }}
          <CloseOutlined
            v-show="list.length > 1"
            size="small"
            @click="handleClose(el)"
          />
        </span>
      </router-link>
    </template>

    <Space :type="index === list.length - 1 ? 'right' : 'default'" />
  </div>
</template>

<style scoped lang="scss">
$light-color: #fff;
$dark-color: #f5f5f5;

$active-color: #1890ff;
$hover-color: #f5f5f5;
$border-radius: 16px;
$space: 10px;

.tabs-wrap {
  padding-top: 6px;
  display: flex;
  height: 100%;
  background-color: $dark-color;

  a {
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;

    .text {
      padding: 5px 12px;
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .anticon {
      position: absolute;
      transform: translateY(-50%);
      top: 50%;
      right: -12px;
      transition: right 0.4s;
    }

    &:hover .anticon {
      right: 0px;
    }
  }
  a.active {
    background-color: $light-color;
  }
  a:not(.active) {
    background-color: $dark-color;

    .text {
      border-radius: 12px;
      transition: background-color 0.4s;

      &:hover {
        background-color: #ccc;
      }
    }
  }

  .anticon-close {
    font-size: 12px;

    &:hover {
      color: #f5222d;
    }
  }
}
</style>
