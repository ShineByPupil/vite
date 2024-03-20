<script setup lang="ts">
import { reactive, watch, h, getCurrentInstance, onMounted, ref } from "vue";
(window as any).v = getCurrentInstance();
import { useRouter } from "vue-router";
import { routes } from "@/router/index";
import {
  MailOutlined,
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
(window as any).state = state;
(window as any).router = router;

function getItem(list: any[]): ItemType[] {
  return list.map((n) => {
    return {
      label: n.name,
      key: n.path,
      icon: () => h(MailOutlined),
      children: n.children ? getItem(n.children) : undefined,
    };
  });
}

const menuRef = ref<any>();
(window as any).menu = menuRef;

const items = getItem(routes);

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
router.beforeEach((to, from) => {
  state.selectedKeys[0] =
    (to.path.match(/\//g) || []).length > 1
      ? /[^/]*$/.exec(to.path)![0]
      : to.path;
  state.openKeys = to.path.match(/\/[^/]*/g) || [];
  console.log("beforeEach", to, from);
});
</script>

<template>
  <a-button type="primary" @click="toggleCollapsed">
    <MenuUnfoldOutlined v-if="state.collapsed" />
    <MenuFoldOutlined v-else />
  </a-button>

  <a-menu
    ref="menuRef"
    v-model:openKeys="state.openKeys"
    v-model:selectedKeys="state.selectedKeys"
    style="max-width: 256px"
    mode="inline"
    :items="items"
    :inline-collapsed="state.collapsed"
    @click="handleClick"
    @openChange="handleOpenChange"
  ></a-menu>

  <router-view></router-view>
</template>

<style>
#app {
  display: flex;
}
</style>
<style scoped>
.ant-menu {
  box-shadow: 3px 0px 5px #cfcfcf;
}
</style>
