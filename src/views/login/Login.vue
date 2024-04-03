<script setup lang="ts">
import Form from "./Form.vue";
</script>

<template>
  <div class="login">
    <Form />
  </div>
</template>

<style scoped lang="scss">
.login {
  position: relative;
  background-color: #feebc1;
  background-image: url(../../assets/images/bg.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  overflow: hidden;

  width: 100%;
  height: 100%;

  form {
    margin: 40vh auto 0 auto;
  }
}
</style>
