<script setup lang="ts">
import { reactive, ref, h, computed } from "vue";
import cloneDeep from "lodash/cloneDeep";
import { useRouter } from "vue-router";
import { routes } from "@/router/index";
import {
  BarsOutlined,
  FileOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons-vue";
import type { MenuProps, ItemType } from "ant-design-vue";

const router = useRouter();
const state = reactive({
  collapsed: false, // inline 时菜单是否收起状态
  selectedKeys: ["/"], // 当前选中的菜单项 key 数组
  openKeys: [] as string[], // 当前展开的 SubMenu 菜单项 key 数组
});
const menuRef = ref<any>();
const items = getItem(routes);
const keyword = ref("");
const items_filter = computed(() => {
  return keyword.value ? filter(cloneDeep(items), keyword.value) : items;
});

function getItem(list: any[]): ItemType[] {
  return list.map((n) => {
    return {
      label: n.name,
      key: n.path,
      icon: () => h(n.children ? BarsOutlined : FileOutlined),
      children: n.children ? getItem(n.children) : undefined,
    };
  });
}

function filter(items, keyword) {
  return items.filter((item) => {
    // 检查路由名称是否匹配关键词
    const isMatched = item.label.toLowerCase().includes(keyword.toLowerCase());

    if (isMatched) {
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
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed;
};

const handleClick: MenuProps["onClick"] = (e) => {
  console.log("click", e);
  router.push({ path: e.keyPath!.join("/") });
};

const handleOpenChange = (openKeys: string[]) => {
  console.log("handleOpenChange:", openKeys);
};

// 更新侧边栏的状态
router.beforeEach((to) => {
  if ((to.path.match(/\//g) || []).length > 1) {
    state.selectedKeys[0] = /[^/]*$/.exec(to.path)![0];
    // let _openKeys = to.path.split("/").filter(Boolean);
    // _openKeys[0] = "/" + _openKeys[0];
    // state.openKeys = _openKeys;
  } else {
    state.selectedKeys[0] = to.path;
    // state.openKeys = to.path.match(/\/[^/]*/g) || ["/"];
  }
});

Object.assign(window, { filter, keyword, items, items_filter });
</script>

<template>
  <div class="menu">
    <a-button type="primary" @click="toggleCollapsed">
      <MenuUnfoldOutlined v-if="state.collapsed" />
      <MenuFoldOutlined v-else />
    </a-button>

    <a-input v-model:value="keyword" placeholder="input search text" />

    <a-menu
      ref="menuRef"
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      :items="items_filter"
      :inline-collapsed="state.collapsed"
      @click="handleClick"
      @openChange="handleOpenChange"
    />
  </div>
</template>

<style scoped lang="scss">
.menu {
  box-shadow: 3px 0px 5px #cfcfcf;

  .ant-menu {
    &:not(.ant-menu-inline-collapsed) {
      width: 256px;
    }
  }
}
</style>
