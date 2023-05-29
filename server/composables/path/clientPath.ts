import * as fg from "fast-glob";
import { kebabCase } from "lodash";

export function useClientRoutes() {
  const path = "src/modules/*/*.{tsx,vue}";
  const ROUTES = fg.sync([path])
    .filter(path => /^.+(\.vue|\.tsx)$/.test(path))
    .map((path) => {
      const name = path
        .match(/(.*)(\.vue|\.tsx)$/)[1]
        .match(/^.*?\/([^/]+)$/)[1];
      return kebabCase(name);
    });

  return [...ROUTES, "/"];
}
