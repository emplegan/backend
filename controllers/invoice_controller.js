const db = require ('../db/connection-postgres');
var uuid = require('uuid-random');

module.exports = {
    findAllInvoices: function (req, res, next){
        db.any('select * from invoice')
            .then((data) => {
                res.status(200)
                    .json({
                        status: 'success',
                        data: data
                    })
            })
            .catch((err) =>{
                res.status(500)
                    .json({
                        status: 'error'
                    })
            })
            .finally(() => {db.$pool.end});
    },

    insertInvoices: function(req, res, next){
        let invoice = req.body;
        let invoiceItems = req.body.invoice_items;
        let invoiceId = uuid();
        db.tx(trans => {
            const queries = [
                trans.one('INSERT INTO invoice (id, invoice_date, invoice_number, customer) VALUES($1,$2,$3,$4) RETURNING id', 
                [invoiceId, new Date(), invoice.invoice_no, invoice.customer])
            ];
            let invItemLen = invoiceItems.length;
            for(let i=0;i<invItemLen;i++){
                let invoiceItem = invoiceItems[i];
                let invoiceItemId = uuid();
                queries.push(
                    trans.none('INSERT INTO invoice_item (id, product_id, invoice_id, price, qty) VALUES($1,$2,$3,$4,$5)', 
                    [invoiceItemId, invoiceItem.product_id, invoiceId, invoiceItem.price, invoiceItem.qty])
                );
            }
            return trans.batch(queries);
        })
        .then((data) => {
            res.status(200)
                .json({
                    status: 'success',
                    data: data.id
                });
        })
        .catch((err) =>{
            console.log(err);
            res.status(500)
                .json({
                    status: 'error'
                })
        })
        .finally(() => {db.$pool.end});
    }
}