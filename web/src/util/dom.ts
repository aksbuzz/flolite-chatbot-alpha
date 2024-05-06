export function isInViewport<T extends HTMLElement>(element: T) {
  const rect = element.getBoundingClientRect()

  return (
    rect.top >=0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}