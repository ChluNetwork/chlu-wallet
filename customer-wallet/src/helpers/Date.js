const month = ['Jan','Feb','Mar','Apr','May','Jun', 'Jul','Aug','Sep','Oct','Nov','Dec']

Date.prototype.getMonthName = function() { return month[this.getMonth()] } // eslint-disable-line

export default Date
