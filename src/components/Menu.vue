<script setup lang="ts">
import { reactive, ref, h, computed, VNode } from "vue";
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

// 关键词着色
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

Object.assign(window, { filter, keyword, items, items_filter, h });
</script>

<template>
  <div class="menu" :class="{ 'inline-collapsed': state.collapsed }">
    <a-input v-model:value="keyword" placeholder="search" />

    <a-menu
      class="container"
      ref="menuRef"
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      :items="items_filter"
      :inline-collapsed="state.collapsed"
      @click="handleClick"
      @openChange="handleOpenChange"
    />

    <a-button type="primary" @click="toggleCollapsed">
      <MenuUnfoldOutlined v-if="state.collapsed" />
      <MenuFoldOutlined v-else />
    </a-button>
  </div>
</template>

<style scoped lang="scss">
.menu {
  box-shadow: 3px 0px 5px #cfcfcf;
  width: 256px;
  transition: width 0.2s;

  &.inline-collapsed {
    width: 80px;
  }

  .ant-input {
    width: calc(100% - 12px);
    margin: 6px;
  }

  .ant-menu {
    height: calc(100% - 76px);
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
