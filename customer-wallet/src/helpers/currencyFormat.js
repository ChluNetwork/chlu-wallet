export const formatCurrency = (value) => {
  return value ? `${value}`.replace(/(\d)(?=(\d{3})+\.)/g, '$1,') : ''
}

export const removeCommas = (value) => `${value}`.replace(/,/g, '')
