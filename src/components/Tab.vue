<script setup lang="ts">
import { computed } from "vue";
import Space from "./Space.vue";
import { CloseOutlined } from "@ant-design/icons-vue";
import { useRouter, RouteRecordName } from "vue-router";

const props = defineProps<{
  active: RouteRecordName;
  list: Set<RouteRecordName>;
}>();
const router = useRouter();
const index = computed(() => {
  return Array.from(props.list).indexOf(props.active);
});
function handleClose(name: RouteRecordName) {
  if (name === props.active) {
    router.back();
  }
  props.list.delete(name);
}
</script>

<template>
  <div class="tabs-wrap">
    <template v-for="(item, i) in props.list">
      <Space
        :type="index === i ? 'left' : index + 1 === i ? 'right' : 'default'"
      />

      <router-link
        :to="{ name: item }"
        class="tab"
        :class="{ active: index === i }"
      >
        <span class="text">{{ item }}</span>
        <CloseOutlined size="small" @click="handleClose(item)" />
      </router-link>
    </template>

    <Space :type="index === props.list.size - 1 ? 'right' : 'default'" />
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
  }
}
</style>
