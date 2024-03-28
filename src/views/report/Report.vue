<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { message } from "ant-design-vue";
import axios from "axios";

let dataSource = ref<any>([]); // todo type

const columns = [
  { title: "姓名", dataIndex: "name", key: "name" },
  { title: "年龄", dataIndex: "age", key: "age" },
  { title: "住址", dataIndex: "address", key: "address" },
];
const selectedRowKeys = ref<any>([]);

import DetailModal from "./DetailModal.vue";

const pagination = ref({
  total: 0,
  current: 1,
  pageSize: 20,
});
const modalInfo = reactive({
  id: "",
  visible: false,
  type: "",
});

function onSelectChange(list) {
  console.log("selectedRowKeys changed: ", list);
  selectedRowKeys.value = list;
}

function handleQuery() {
  const params = {
    current: pagination.value.current,
    pageSize: pagination.value.pageSize,
  };
  axios.post("/api/user/query", params).then((res) => {
    dataSource.value = res.data.list;
    pagination.value.total = res.data.total;
  });
}

function handleAdd() {
  Object.assign(modalInfo, {
    id: "",
    visible: true,
    type: "add",
  });
}

function handleEdit() {
  if (selectedRowKeys.value.length === 0) {
    message.warning("请选择数据");
  } else if (selectedRowKeys.value.length > 1) {
    message.warning("只能选择一条数据");
  } else {
    Object.assign(modalInfo, {
      id: selectedRowKeys.value[0].id,
      visible: true,
      type: "edit",
    });
  }
}

function handleDelete() {
  if (selectedRowKeys.value.length === 0) {
    message.warning("请选择数据");
  } else {
    axios
      .post("/api/user/delete", { id_list: selectedRowKeys.value })
      .then(() => {
        message.success("删除成功");
        handleQuery();
      });
  }
}

function updateRow({ id, type }) {
  axios.post("/api/user/detail", { id }).then((res) => {
    if (type === "add") {
      dataSource.value.unshift(res.data);
    } else {
      for (let i = 0; i < dataSource.value.length; i++) {
        if (dataSource.value[i].id === id) {
          dataSource.value.splice(i, 1, res.data);
          break;
        }
      }
    }
  });

  console.log(arguments);
}

function handleDblclick(record) {
  Object.assign(modalInfo, {
    id: record.id,
    visible: true,
    type: "edit",
  });
}

function handleTableChange(pag) {
  Object.assign(pagination.value, {
    current: pag.current,
    pageSize: pag.pageSize,
  });

  handleQuery();
}

onMounted(() => {
  handleQuery();
});

Object.assign(window, { pagination, selectedRowKeys, dataSource });
</script>

<template>
  <div class="report">
    <a-button-group>
      <a-button @click="handleAdd">新增</a-button>
      <a-button @click="handleEdit">修改</a-button>
      <a-button @click="handleDelete">删除</a-button>
    </a-button-group>

    <a-table
      :dataSource="dataSource"
      :columns="columns"
      :row-key="(record) => record.id"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange,
      }"
      :customRow="
        (record) => {
          return {
            onDblclick: () => handleDblclick(record),
          };
        }
      "
      :pagination="pagination"
      size="small"
      :scroll="{ y: 'calc(100vh - 200PX' }"
      @change="handleTableChange"
    />

    <DetailModal
      :id="modalInfo.id"
      v-model:open="modalInfo.visible"
      v-model:type="modalInfo.type"
      @updateRow="updateRow"
    />
  </div>
</template>

<style scoped lang="scss">
.report {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;

  .ant-btn-group {
    margin-bottom: 10px;
  }
}
</style>
