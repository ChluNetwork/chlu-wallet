'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var linksForCustomer = function linksForCustomer(userId) {
  return [{ label: 'Checkout', href: '/customer/' + userId + '/checkout' }, { label: 'Customer Wallet', href: '/customer/' + userId + '/wallet' }];
};

var linksForVendor = function linksForVendor(userId) {
  return [{ label: 'Vendor Profile', href: '/vendor/' + userId + '/profile' }, { label: 'Vendor Wallet', href: '/vendor/' + userId + '/wallet' }];
};

var linksForDemonstrator = function linksForDemonstrator(userId) {
  return [{ label: 'demo', href: '/demonstrator/' + userId + '/demo' }];
};

exports.linksForCustomer = linksForCustomer;
exports.linksForVendor = linksForVendor;
exports.linksForDemonstrator = linksForDemonstrator;