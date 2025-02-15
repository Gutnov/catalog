export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  delay: number
): ((...args: Parameters<F>) => void) => {
  let timeoutId: number | null = null
  return (...args: Parameters<F>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }
    timeoutId = window.setTimeout(() => {
      func(...args)
    }, delay)
  }
}
