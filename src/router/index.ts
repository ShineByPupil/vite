import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

export const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/Login.vue"),
  },
  {
    path: "/report",
    name: "report",
    component: () => import("../views/report/Report.vue"),
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
            name: "vueJsx_demo1",
            component: () => import("@/views/student/vueJsx/demo1.vue"),
          },
          {
            path: "demo2",
            name: "vueJsx_demo2",
            component: () => import("@/views/student/vueJsx/demo2.vue"),
          },
          {
            path: "demo3",
            name: "vueJsx_demo3",
            component: () => import("@/views/student/vueJsx/demo3.vue"),
          },
          {
            path: "demo4",
            name: "vueJsx_demo4",
            component: () => import("@/views/student/vueJsx/demo4.vue"),
          },
        ],
      },
      {
        path: "websoket",
        name: "websoket",
        component: () => import("../views/student/websoket/Websoket.vue"),
      },
      {
        path: "optionsApi",
        name: "optionsApi",
        component: () => import("../views/student/optionsAPI/OptionsAPI.vue"),
      },
      {
        path: "refAndReactive",
        name: "refAndReactive",
        component: () =>
          import("../views/student/refAndReactive/RefAndReactive.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
