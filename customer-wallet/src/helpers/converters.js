import round from 'lodash/round'

export function convertToBits (value, from, roundValue = 1) {
  const ratio = Math.pow(10, 6)
  const numValue = Number(value)

  return round(from ? numValue * ratio : numValue / ratio, roundValue)
}
