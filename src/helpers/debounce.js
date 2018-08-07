export function debounce(fn, duration) {
  let debounceIntervalHandle = 0;

  return (...args) => {
    window.clearTimeout(debounceIntervalHandle);
    debounceIntervalHandle = window.setTimeout(fn, duration, ...args);
  };
}
