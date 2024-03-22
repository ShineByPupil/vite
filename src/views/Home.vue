<script setup lang="tsx">
import { ref } from "vue";

const Anchor = () => {
  const targetOffset = ref<number | undefined>(undefined);

  const items = [
    {
      key: "1",
      href: "#components-anchor-demo-basic",
      title: "Basic demo",
    },
    {
      key: "2",
      href: "#components-anchor-demo-static",
      title: "Static demo",
    },
    {
      key: "3",
      href: "#api",
      title: "API",
      children: [
        {
          key: "4",
          href: "#anchor-props",
          title: "Anchor Props",
        },
        {
          key: "5",
          href: "#link-props",
          title: "Link Props",
        },
      ],
    },
  ];

  return <a-anchor target-offset={targetOffset} items={items}></a-anchor>;
};

const App = () => {
  return <div>Home</div>;
  Anchor();
};
</script>

<template>
  <App />
</template>

<style scoped></style>
