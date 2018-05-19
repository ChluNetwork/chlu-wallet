import path from 'path'
import axios from 'axios'

class Lightning {

    constructor(host) {
        this.lnd = axios.create({
            baseURL: host + '/v0'
        })
    }

    async getInvoices() {
        return this.lnd.get('/invoices')
    }

    async getInvoice(id) {
        return this.lnd.get(`/invoices/${id}`)
    }

    async generateInvoice(amount) {
        // should return invoice in string form or an ID to pass to customer
        const response = await this.lnd.post('/invoices', {
            description: 'Chlu Payment',
            tokens: amount // amount in SATOSHI
        })
        console.log('generateInvoice', response)
        return response.data.invoice
    }

    async payInvoice(invoice) {
        // should pay the invoice and return proof of payment
        return this.lnd.post('/payments', { invoice })
    }
}

Lightning.nodes = {
    Enrico: 'http://ec2-34-207-91-77.compute-1.amazonaws.com:10553',
    Andronikos: 'http://ec2-34-207-71-131.compute-1.amazonaws.com:10553',
    Brian: 'http://ec2-54-91-109-169.compute-1.amazonaws.com:10553'
}

export default Lightning