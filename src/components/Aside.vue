<script setup lang="ts">
import { reactive, ref, h, computed, VNode, onBeforeMount } from "vue";
import cloneDeep from "lodash/cloneDeep";
import { useRouter, RouteRecordName } from "vue-router";
import {
  BarsOutlined,
  FileOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import type { ItemType } from "ant-design-vue";
import type { stateType } from "./Aside";
import axios from "axios";

const router = useRouter();
const state: stateType = reactive({
  collapsed: false, // inline 时菜单是否收起状态
  selectedKeys: [], // 当前选中的菜单项 key 数组
  openKeys: [], // 当前展开的 SubMenu 菜单项 key 数组
});
const menuRef = ref<any>();
const menu_list = ref<ItemType[]>([]);
const keyword = ref("");
const menu_list_filter = computed(() => {
  return keyword.value
    ? filter(cloneDeep(menu_list.value), keyword.value)
    : menu_list.value;
});

/**
 * 根据输入列表生成一个 ItemType 对象数组。
 *
 * @param {any[]} list - 要转换为 ItemType 对象的项目列表
 * @return {ItemType[]} 一个 ItemType 对象数组
 */
function getItem(list: any[]): ItemType[] {
  return list.map((n) => {
    return {
      label: n.name,
      key: n.route_name,
      icon: () => h(n.children ? BarsOutlined : FileOutlined),
      children:
        n.children && n.children.length ? getItem(n.children) : undefined,
    };
  });
}

/**
 * 关键词着色。在给定的项目中突出显示关键字的函数。
 *
 * @param {Array} items - 要突出显示的项目数组。
 * @param {string} keyword - 要突出显示的关键字。
 */
function highlightKeyword(items, keyword) {
  if (!keyword) return;

  let re = new RegExp(keyword, "ig");

  items.forEach((item) => {
    if (re.test(item.label)) {
      // 未匹配字符串集合
      let notMatched: string[] = item.label.split(re);
      let matched: VNode[] = item.label
        .match(re)
        .map((n) => h("span", { style: { color: "red" } }, n));
      let list: (string | VNode)[] = [];

      while (notMatched.length) {
        list.push(notMatched.shift() || "");
        list.push(matched.shift() || "");
      }

      item.label = h("span", {}, list);
    }

    if (item.children) {
      highlightKeyword(item.children, keyword);
    }
  });
}

/**
 * 根据提供的关键词对项目数组进行过滤。
 *
 * @param {Array} items - 要过滤的项目数组。
 * @param {string} keyword - 要根据的关键词进行过滤。
 * @return {Array} 过滤后的项目数组。
 */
function filter(items, keyword) {
  return items.filter((item) => {
    // 检查路由名称是否匹配关键词
    const isMatched = item.label.toLowerCase().includes(keyword.toLowerCase());

    if (isMatched) {
      highlightKeyword([item], keyword);

      // 如果路由名称匹配，则返回该路由对象
      return true;
    } else if (item.children) {
      // 如果路由有子路由，则递归筛选子路由
      item.children = filter(item.children, keyword);
      // 如果子路由筛选结果非空，则保留该路由对象
      return item.children.length > 0;
    }

    // 路由名称不匹配且没有子路由，则过滤掉该路由对象
    return false;
  });
}

/**
 * 切换折叠状态。
 */
function toggleCollapsed() {
  state.collapsed = !state.collapsed;
}

/**
 * 处理点击事件，通过将新路由推送到路由器。
 *
 * @param {Event} e - 触发函数的事件对象。
 * @return {void}
 */
function handleClick(e) {
  router.push({ name: e.key as RouteRecordName });
}

/**
 * 一个处理打开键变化的函数。
 *
 * @param {string[]} openKeys - 一个打开键的数组
 * @return {void}
 */
function handleOpenChange(openKeys: string[]) {
  console.log("handleOpenChange:", openKeys);
}

/**
 * 从 API 获取菜单并更新菜单列表。
 */
function getMemu() {
  axios.get("/api/getMenu").then((res) => {
    menu_list.value = getItem(res.data.menu_list);
  });
}

onBeforeMount(() => {
  getMemu();
});

// 更新侧边栏的状态
router.beforeEach((to) => {
  state.selectedKeys = [to.name];
});
</script>

<template>
  <aside :class="{ 'inline-collapsed': state.collapsed }">
    <a-input v-model:value="keyword" placeholder="search" />

    <a-menu
      class="container"
      ref="menuRef"
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      :items="menu_list_filter"
      :inline-collapsed="state.collapsed"
      @click="handleClick"
      @openChange="handleOpenChange"
    />

    <a-button type="primary" @click="toggleCollapsed">
      <MenuUnfoldOutlined v-if="state.collapsed" />
      <MenuFoldOutlined v-else />
    </a-button>
  </aside>
</template>

<style scoped lang="scss">
aside {
  width: 256px;
  transition: width 0.2s;
  overflow: hidden;
  border-inline-end: 1px solid rgba(5, 5, 5, 0.06);

  &.inline-collapsed {
    width: 80px;
  }

  .ant-input {
    width: calc(100% - 12px);
    margin: 6px;
  }

  .ant-menu {
    height: calc(100% - 76px);
    border-inline-end: none;
  }

  .ant-btn {
    width: 100%;
    border-radius: 0%;
  }
}

// 滚动条样式
.container {
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
}
</style>
