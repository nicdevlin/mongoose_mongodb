const { Enquiry } = require('./db')
const path = require("path");
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false}))

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'))
})

app.get('/enquiries', async (req, res) => {
    res.render('enquiries', {answer : await Enquiry.find()})
})

app.post('/contact', (req, res) => {
    const enq = new Enquiry({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message
    })
    enq.save().then(() => {
        // res.send('All good!')
        res.send("<script>alert('Submitted sucessfully!'); window.location='/contact'</script>")
    }).catch(err => {
        res.send(err)
    })
})

app.listen(8080, () => {
    console.log('Contact API listening on port 8080.')
})





