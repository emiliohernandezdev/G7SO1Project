const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

const Stomp = require('stomp-client');
const stompClient = new Stomp("172.20.0.6", 61616);
const uuid = require('uuid');

app.use(bodyParser.json())


app.listen(port, () => console.log('Running'))


app.get('', () => {
    console.log('hola')
})


app.post('/add', (req, res) => {
    stompClient.connect(function (){
        console.log("producer connected");

        const person = {
            uuid: new uuid.v4(),
            name: req.body.name,
            email: req.body.email,
            coins: req.body.coins
        };
        stompClient.publish("/queue/proyecto", JSON.stringify(person))
        return res.status(200).send({
            message: 'Person added!',
            result: person,
            success: true
        })

        stompClient.disconnect();
    })
})

module.exports = app;