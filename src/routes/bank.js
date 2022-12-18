const router = require('express').Router();
const Details = require("../models/user")
const bodyParser = require('body-parser')

// Your routing code goes here
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', async (req, res) => {
    try {
        let details = await Details.find().sort({ _id: -1 })
        res.json(details)
    } catch (e) {
        res.sendStatus(404).json(e.message)
    }
})


router.post('/users', async (req, res) => {
    try {
        let details = await Details.create({
            name: req.body.name,
            email: req.body.email,
            account: req.body.account,
            balance: req.body.balance
        })
        res.json(details)
    } catch (e) {
        res.sendStatus(404).json(e.message)
    }
})


router.post('/transfers', async (req, res) => {
    try {
        let { sender, receiver, amount } = req.body;
        amount = parseFloat(amount)
        
        return res.json("ok")

        let send_ac = await Details.find({ account: sender })
        let receive_ac = await Details.find({ account: receiver })

        
        if(send_ac[0].account === receive_ac[0].account){
            return res.json("ok")
        }
        
        let num1 = send_ac[0].balance
        let num2 = receive_ac[0].balance
        num1 = parseFloat(num1)
        num2 = parseFloat(num2)
        
        if(send_ac.length!=0 && receive_ac.length != 0){
        if (amount > 0 && num1 > 0) {
            num1 = num1 - amount
            num2 = num2 + amount

            let x = await Details.updateOne({ account: sender }, { $set: { balance: num1 } })
            let y = await Details.updateOne({ account: receiver }, { $set: { balance: num2 } })
            res.json("ok")
        }
        }

    } catch (e) {
        res.sendStatus(404).json(e.message)
    }
})


module.exports = router;
