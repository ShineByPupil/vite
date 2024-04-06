<script setup lang="ts">
import { ref, reactive } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import request from "@/request";
import router from "@/router";

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: "",
  password: "",
  remember: true,
});
const isAnimating = ref(false);

function onFinish(values: any) {
  console.log("Success:", values);
  request.post("/api/login", values).then((res) => {
    if (res.status === 200) {
      router.push("/");
    }
  });
}

function onFinishFailed(errorInfo: any) {
  console.log("Failed:", errorInfo);
  isAnimating.value = true;
}

function animationend() {
  isAnimating.value = false;
}
</script>

<template>
  <a-form
    v-on:animationend="animationend"
    :class="{ 'animate__animated animate__headShake': isAnimating }"
    :model="formState"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="账号"
      name="username"
      :rules="[{ required: true, message: '请输入账号!' }]"
    >
      <a-input v-model:value="formState.username">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item
      label="密码"
      name="password"
      :rules="[{ required: true, message: '请输入密码!' }]"
    >
      <a-input-password v-model:value="formState.password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>

    <a-form-item>
      <a-button type="primary" html-type="submit" class="login-form-button">
        登录
      </a-button>
    </a-form-item>
  </a-form>
</template>

<style scoped lang="scss">
form {
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  width: 400px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);

  .login-form-button {
    width: 100%;
    margin-top: 30px;
  }
}
</style>
