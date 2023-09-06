export function handleProductClick (navigateHook, route, itemId) {
  navigateHook(`${route}/${itemId}`);
};