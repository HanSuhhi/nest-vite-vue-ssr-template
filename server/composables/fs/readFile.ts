import { readFileSync } from "node:fs";

export function readFileSyncUTF8(path: string) {
  return readFileSync(path, "utf-8");
}
