const linksForCustomer = userId => ([
  { label: 'Checkout', href: `/customer/${userId}/checkout` },
  { label: 'Customer Wallet', href: `/customer/${userId}/wallet` }
])

const linksForVendor = userId => ([
  { label: 'Vendor Profile', href: `/vendor/${userId}/profile` },
  { label: 'Vendor Wallet', href: `/vendor/${userId}/wallet` }
])

const linksForDemonstrator = userId => ([
  { label: 'demo', href: `/demonstrator/${userId}/demo` }
])

export { linksForCustomer, linksForVendor, linksForDemonstrator }
