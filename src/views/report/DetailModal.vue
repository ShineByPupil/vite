<script setup lang="ts">
import { computed, ref, reactive, watch } from "vue";
import { message } from "ant-design-vue";
import axios from "axios";

const emits = defineEmits(["updateRow"]); // 声明要触发的事件
const props = defineProps({
  type: {
    type: String,
    default: "add",
  },
  id: [String, Number],
});
const open = defineModel("open");

const title = computed(() => {
  return {
    add: "新增",
    edit: "编辑",
  }[props.type];
});
const loading = ref<boolean>(false);

const formRef = ref();
const formState = reactive({ name: "", age: "", address: "" });
const rules = {
  name: [{ required: true, message: "请输入姓名!" }],
  age: [{ required: true, message: "请输入年龄!" }],
};
const labelCol = {
  style: { width: "70px" },
};

watch(open, (value) => {
  if (value) {
    if (props.type === "edit") {
      axios
        .post("/api/user/detail", {
          id: props.id,
        })
        .then((res) => {
          formState.name = res.data.name;
          formState.age = res.data.age;
          formState.address = res.data.address;
        });
    }
  } else {
    formRef.value.resetFields();
  }
});
function handleCancel() {
  open.value = false;
}

function handleOk() {
  formRef.value.validate().then(() => {
    loading.value = true;

    const url = props.type === "add" ? "/api/user/add" : "/api/user/edit";
    const params =
      props.type === "add" ? formState : { id: props.id, ...formState };

    axios
      .post(url, params)
      .then((res) => {
        emits("updateRow", { id: res.data.id, type: props.type });
        message.success(`操作成功！`);
        open.value = false;
      })
      .finally(() => {
        loading.value = false;
      });
  });
}

Object.assign(window, { props, formRef, formState, rules, labelCol, handleOk });
</script>

<template>
  <a-modal v-model:open="open" :title="title" @ok="handleOk">
    <a-form
      ref="formRef"
      :model="formState"
      :rules="rules"
      :label-col="labelCol"
    >
      <a-form-item label="姓名" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item label="年龄" name="age">
        <a-input v-model:value="formState.age" />
      </a-form-item>

      <a-form-item label="地址" name="address">
        <a-input v-model:value="formState.address" />
      </a-form-item>
    </a-form>

    <template #footer>
      <a-button key="back" @click="handleCancel">取消</a-button>
      <a-button key="submit" type="primary" :loading="loading" @click="handleOk"
        >确定</a-button
      >
    </template>
  </a-modal>
</template>

<style scoped lang="scss"></style>
