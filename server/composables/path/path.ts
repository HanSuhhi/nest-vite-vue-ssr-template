import { resolve } from "node:path";

export const UPPER_DIRECTORY = "..";

/**
 * Parse the absolute path of the dist directory
 * @param  {...string[]} paths A sequence of paths or path segments.
 * @returns  {string} dist path
 */
export function resolveDistPath(...paths: string[]) {
  return resolve(__dirname,
    UPPER_DIRECTORY,
    UPPER_DIRECTORY,
    UPPER_DIRECTORY, ...paths);
}

/**
 * Parse the absolute path of the root directory
 * @param  {...string[]} paths A sequence of paths or path segments.
 * @returns  {string} root path
 */
export function resolveRootPath(...paths: string[]) {
  return resolveDistPath(UPPER_DIRECTORY, ...paths);
}

/**
 * Parse the absolute path of the client directory
 * @param  {...string[]} path
 * @param  {...string[]} paths A sequence of paths or path segments.
 * @returns  {string} src path
 */
export function resolveClientPath(...paths: string[]) {
  return resolveRootPath("src", ...paths);
}
