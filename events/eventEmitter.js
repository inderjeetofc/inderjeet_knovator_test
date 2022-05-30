var events = require('events');
var eventEmitter = new events.EventEmitter();
let sendgrid = require('../services/sendrid.service')
eventEmitter.on('user_registered', async (user) => {
    console.log("Event emitter@user_registered")
    await sendgrid(user)
})
module.exports = eventEmitter