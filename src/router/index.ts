import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

export const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // 在这里添加更多路由
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/Login.vue"),
  },
  {
    path: "/student",
    name: "student",
    component: () => import("../views/student/Student.vue"),
    children: [
      {
        path: "promise",
        name: "promise",
        component: () => import("../views/student/promise/Promise.vue"),
        children: [
          {
            path: "promiseChildren",
            name: "promiseChildren",
            component: () =>
              import("../views/student/promise/PromiseChildren.vue"),
          },
        ],
      },
      {
        path: "proxy",
        name: "proxy",
        component: () => import("@/views/student/proxy/Proxy.vue"),
      },
      {
        path: "bigint",
        name: "bigint",
        component: () => import("@/views/student/bigInt/BigInt.vue"),
      },
      {
        path: "vueJsx",
        name: "vueJsx",
        children: [
          {
            path: "demo1",
            name: "demo1",
            component: () => import("@/views/student/vueJsx/demo1.vue"),
          },
          {
            path: "demo2",
            name: "demo2",
            component: () => import("@/views/student/vueJsx/demo2.vue"),
          },
          {
            path: "demo3",
            name: "demo3",
            component: () => import("@/views/student/vueJsx/demo3.vue"),
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;