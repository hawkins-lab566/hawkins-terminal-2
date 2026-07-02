export function decodeSignal(payload) {
  return new Promise((resolve) => {
    const reversed = payload.split("").reverse().join("");
    const decoded = atob(reversed);

    window.setTimeout(() => {
      resolve(decoded);
    }, 400);
  });
}
