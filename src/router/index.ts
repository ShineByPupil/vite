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
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
