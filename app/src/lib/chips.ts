const CHIP_CHARS = 18

export function fitOnOneLine<T>(items: T[], label: (item: T) => string): T[] {
  const shown: T[] = []
  let used = 0
  for (const item of items) {
    const length = label(item).length
    if (shown.length && used + length > CHIP_CHARS) break
    shown.push(item)
    used += length
  }
  return shown
}
