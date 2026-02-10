// Japanese weekday characters
const JAPANESE_WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土']

/**
 * Get Japanese weekday character for a given date
 */
export function getJapaneseWeekday(date: Date): string {
  return JAPANESE_WEEKDAYS[date.getDay()]
}

/**
 * Format date in Japanese style: YYYY年MM月DD日（曜日）
 */
export function formatJapaneseDate(date: Date): string {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekday = getJapaneseWeekday(date)

  return `${year}年${month}月${day}日（${weekday}）`
}

/**
 * Format a complete preference line
 * Format: 第N希望：　年　月　日（　）　hh:mm　〜　hh:mm
 */
export function formatPreferenceLine(
  index: number,
  date: Date | undefined,
  startTime: string,
  endTime: string
): string {
  if (!date) {
    return `第${index}希望：　年　月　日（　）　${startTime}　〜　${endTime}`
  }

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekday = getJapaneseWeekday(date)

  return `第${index}希望：　${year}年${month}月${day}日（${weekday}）　${startTime}　〜　${endTime}`
}

/**
 * Format all preferences into a complete text
 */
export function formatAllPreferences(
  slots: Array<{ date: Date | undefined; startTime: string; endTime: string }>
): string {
  return slots
    .map((slot, index) => formatPreferenceLine(index + 1, slot.date, slot.startTime, slot.endTime))
    .join('\n')
}
