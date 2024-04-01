<script setup lang="ts">
const { type } = defineProps({ type: String });
</script>

<template>
  <div class="left" v-show="type === 'left'"></div>

  <div class="right" v-show="type === 'right'"></div>

  <div class="default" v-show="type === 'default'"></div>
</template>

<style scoped lang="scss">
$width: 10px;
$border-radius: 16px;
$light-color: #fff;
$dark-color: #f5f5f5;

@mixin common-styles {
  content: "";
  display: block;
  width: $width;
  height: 100%;
}

.left {
  height: 100%;
  background: linear-gradient(
    to right,
    $light-color,
    $light-color 50%,
    $dark-color 50%,
    $dark-color
  );
  display: flex;

  &::before {
    @include common-styles;
    background-color: $dark-color;
    border-bottom-right-radius: $border-radius;
  }
  &::after {
    @include common-styles;
    background-color: $light-color;
    border-top-left-radius: $border-radius;
  }
}

.right {
  height: 100%;
  background: linear-gradient(
    to right,
    $dark-color,
    $dark-color 50%,
    $light-color 50%,
    $light-color
  );
  display: flex;

  &::before {
    @include common-styles;
    background-color: $light-color;
    border-top-right-radius: $border-radius;
  }
  &::after {
    @include common-styles;
    background-color: $dark-color;
    border-bottom-left-radius: $border-radius;
  }
}

.default {
  height: 100%;
  width: $width * 2;
  background-color: $dark-color;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 2px;
    height: 20px;
    background-color: $light-color;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
