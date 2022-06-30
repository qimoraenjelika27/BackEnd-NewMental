const midtransClient = require('midtrans-client');

class PaymentController {
    static async Payment(req, res) {
        const {order_id, gross_amount, name, email, phone} = req.body

        let snap = new midtransClient.Snap({
            // Set to true if you want Production Environment (accept real transaction).
            isProduction : false,
            serverKey : 'SB-Mid-server-b33kqF96zuSbFXJnvw82P8en'
            });
          
        let parameter = {
            "transaction_details": {
                "order_id": order_id,
                "gross_amount": gross_amount
            },
            "credit_card":{
                "secure" : true
            },
            "customer_details": {
                "name": name,
                "email": email,
                "phone": phone
            }
          };
        
        snap.createTransaction(parameter)
        .then((transaction)=>{
            // transaction token
            let transactionToken = transaction.token;
            console.log('transactionToken:',transactionToken); 
            res.status(201).json({
                message : "payment success",
                transaction : transaction
            })
        })      
    }
}


module.exports = PaymentController