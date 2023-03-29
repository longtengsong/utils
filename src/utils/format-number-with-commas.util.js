/**
 * 千分位展示
 */
export default function formatNumberWithCommas(num, decimalPlaces) {
  if (num == null || Number.isNaN(Number(num))) {
    return ''
  }
  const parts = Number(num).toFixed(decimalPlaces).toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}