const router = require('express').Router();
const Details = require("../models/user")
const Transcations = require("../models/transcation")
const bodyParser = require('body-parser')

// Your routing code goes here
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', async (req, res) => {
    try {
        let details = await Details.find().sort({ _id: -1 })
        res.json(details)
    } catch (e) {
        res.sendStatus(404).json(e.message)
    }
})


router.get('/details', async (req, res) => {
    try {
        let history = await Transcations.find().sort({ _id: -1 })
        res.json(history)
    } catch (e) {
        res.sendStatus(404).json(e.message)
    }
})


router.post('/transfers', async (req, res) => {
    try {  

        let send_ac = await Details.find({ account: req.body.sender })      
        let receive_ac = await Details.find({ account: req.body.receiver }) 

        let num1 = send_ac[0].balance
        let num2 = receive_ac[0].balance
        num1 = parseFloat(num1)
        num2 = parseFloat(num2)
        let amount = parseFloat(req.body.amount)

        if(send_ac[0].account === receive_ac[0].account){
            num1 = num1 + amount
            let x = await Details.updateOne({ account: req.body.sender }, { $set: { balance: num1 } })
             
            return res.json(send_ac[0])
        }

        if(amount<0 || amount > num1) return res.json(0)
        
        
        if(send_ac.length!=0 && receive_ac.length != 0){
        if (amount > 0 && num1 > 0 && (amount < num1 || amount == num1 )) {
            
            num1 = num1 - amount
            num2 = num2 + amount

            let x = await Details.updateOne({ account: req.body.sender }, { $set: { balance: num1 } })
            let y = await Details.updateOne({ account: req.body.receiver }, { $set: { balance: num2 } })
           return res.json(send_ac[0])
        }
        }

    } catch (e) {
        res.sendStatus(404).json(e.message)
    }
})


module.exports = router;
