export function saveToLocalStorage<T>(key: string, data: T): void {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(data));
  }
}

export function loadFromLocalStorage<T>(key: string): T | undefined {
  if (typeof window !== "undefined") {
    const data = window.localStorage.getItem(key);
    if (data) {
      try {
        return JSON.parse(data) as T;
      } catch (e) {
        console.error(`Could not parse: ${data}`);
      }
    }
  }

  return undefined;
}
