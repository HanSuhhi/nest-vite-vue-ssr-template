export function ifIsTrue(bool: boolean) {
  return async (fn: Function) => bool && await fn();
}

export function ifIsFalse(bool: boolean) {
  return async (fn: Function) => !bool && await fn();
}

export function useIf(bool: boolean) {
  return [ifIsTrue(bool), ifIsFalse(bool)];
}
