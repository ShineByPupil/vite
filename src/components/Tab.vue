<script setup lang="tsx">
import { CloseOutlined } from "@ant-design/icons-vue";
import { useRouter, RouteRecordName } from "vue-router";

const props = defineProps<{
  active: RouteRecordName;
  list: Set<RouteRecordName>;
}>();
const router = useRouter();

function handleClose(name: RouteRecordName) {
  if (name === props.active) {
    router.back();
  }
  props.list.delete(name);
}
</script>

<template>
  <div class="tabs-wrap">
    <div
      v-for="item in props.list"
      class="tab"
      :class="{ active: props.active && item === props.active }"
    >
      <div class="before"></div>
      <div class="content">
        <router-link :to="{ name: item }">
          {{ item }}
          <CloseOutlined size="small" @click="handleClose(item)" />
        </router-link>
      </div>
      <div class="after"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$active-color: #1890ff;
$hover-color: #f5f5f5;
$bg-color: #f5f5f5;
$border-radius: 16px;
$space: 10px;

.tabs-wrap {
  padding-top: 6px;
  display: flex;
  height: 100%;
  background-color: $bg-color;

  .tab {
    display: flex;
    height: 100%;
    background-color: #f5f5f5;

    .content {
      display: flex;
      align-items: center;
    }

    .before,
    .after {
      width: $space;
      height: 100%;
      background-color: #f5f5f5;
    }

    a {
      position: relative;
      padding: 6px 20px;
      overflow: hidden;

      .anticon {
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        right: -15px;
        transition: right 0.4s;
      }
      &:hover .anticon {
        right: 5px;
      }
    }

    &.active {
      background-color: #f5f5f5;

      .before,
      .content,
      .after {
        background-color: #fff;
      }

      .before {
        border-top-left-radius: $border-radius;
      }
      .after {
        border-top-right-radius: $border-radius;
      }
    }

    &:not(.active) {
      background-color: #fff;

      .before,
      .content,
      .after {
        background-color: #f5f5f5;
      }

      a {
        border-radius: 15px;
        transition: background-color 0.4s;

        &:hover:not(.active) {
          background-color: #ccc;
        }
      }

      .before {
        border-bottom-left-radius: $border-radius;
      }
      .after {
        border-bottom-right-radius: $border-radius;
      }
    }
  }

  .anticon-close {
    font-size: 12px;
  }
}
</style>
