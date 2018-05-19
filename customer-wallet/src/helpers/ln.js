import path from 'path'
import axios from 'axios'

export default class Lightning {

    constructor(host) {
        this.lnd = axios.create({
            baseURL: path.join(host, 'v0')
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
        return this.lnd.post('/invoices', {
            description: 'Chlu Payment',
            tokens: amount // amount in SATOSHI
        })
    }

    async payInvoice(invoice) {
        // should pay the invoice and return proof of payment
        return this.lnd.post('/payments', invoice)
    }
}