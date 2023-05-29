import { kebabCase, map } from "lodash";
import type { Component } from "vue";
import type { RouteRecordRaw } from "vue-router";
import { createMemoryHistory, createRouter, createWebHistory } from "vue-router";

const pages = import.meta.glob<Record<"default", Component>>("./modules/*/*.{tsx,vue}");

export function useRouteConfig() {
  const routes: RouteRecordRaw[] = map(pages, (_, path) => {
    const paths = path.split("/");
    const name = kebabCase(paths[paths.length - 2]);
    return {
      path: `/${name}`,
      component: pages[path],
      name
    };
  });

  routes.unshift({
    path: "/",
    redirect: "greeting"
  });


  const router = createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  });

  return { router };
}

export const releaseRoutes = ["setting"];
