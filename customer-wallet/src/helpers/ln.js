import lnService from 'ln-service'

export default class Lightning {

    constructor(host = 'localhost:10009') {
        this.lnd = lnService.lightningDaemon({
            host
        });
    }

    async getInfo() {
        return new Promise((resolve, reject) => {
            lnService.getWalletInfo({ lnd: this.lnd }, (error, result) => {
                if (error) reject(error); else resolve(result)
            });
        })
    }

    async generateInvoice(amount) {
        // should return invoice in string form or an ID to pass to customer
    }

    async payInvoice(invoice) {
        // should pay the invoice and return proof of payment
    }
}