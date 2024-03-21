<script setup lang="ts">
import { ref, reactive, toRaw } from "vue";
const add = (n1: string | number, n2: string | number): string => {
  if (isNaN(Number(n1)) || isNaN(Number(n2))) {
    return "不是数字";
  }

  return (BigInt(n1) + BigInt(n2)).toString();
};
const sub = (n1: string | number, n2: string | number): string => {
  if (isNaN(Number(n1)) || isNaN(Number(n2))) {
    return "不是数字";
  }
  return (BigInt(n1) - BigInt(n2)).toString();
};

const mul = (n1: string | number, n2: string | number): string => {
  if (isNaN(Number(n1)) || isNaN(Number(n2))) {
    return "不是数字";
  }
  return (BigInt(n1) * BigInt(n2)).toString();
};

const div = (n1: string | number, n2: string | number): string => {
  if (isNaN(Number(n1)) || isNaN(Number(n2))) {
    return "不是数字";
  }
  return (BigInt(n1) / BigInt(n2)).toString();
};

const formState = ((window as any).form = reactive({
  num1: "",
  num2: "",
  method: "",
  result: "",
}));
const formRef = ref();

const handleCaculate = () => {
  formRef.value
    .validate()
    .then(() => {
      let result = "";
      switch (formState.method) {
        case "add":
          result = add(formState.num1, formState.num2);
          break;
        case "sub":
          result = sub(formState.num1, formState.num2);
          break;
        case "mul":
          result = mul(formState.num1, formState.num2);
          break;
        case "div":
          result = div(formState.num1, formState.num2);
          break;
        default:
          break;
      }

      formState.result = result;
      console.log("values", formState, toRaw(formState));
    })
    .catch((error: Error) => {
      console.log("error", error);
    });
};
</script>

<template>
  <a-form
    ref="formRef"
    :model="formState"
    name="basic"
    layout="inline"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
  >
    <a-form-item label="num1" name="num1" :rules="[{ required: true }]">
      <a-input v-model:value="formState.num1" />
    </a-form-item>

    <a-form-item label="method" name="method" :rules="[{ required: true }]">
      <a-select v-model:value="formState.method">
        <a-select-option value="add">+</a-select-option>
        <a-select-option value="sub">-</a-select-option>
        <a-select-option value="mul">×</a-select-option>
        <a-select-option value="div">÷</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item label="num2" name="num2" :rules="[{ required: true }]">
      <a-input v-model:value="formState.num2" />
    </a-form-item>

    <a-form-item label="result" name="result">
      <a-input v-model:value="formState.result" disabled />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit" @click="handleCaculate"
        >caculate</a-button
      >
    </a-form-item>
  </a-form>
</template>

<style scoped></style>
