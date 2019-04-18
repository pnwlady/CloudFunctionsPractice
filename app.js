// const express = require('express')
// const { WebhookClient } = require('dialogflow-fulfillment')
// const app = express()

// app.get('/', (req, res) => res.send('online'))
// app.post('/dialogflow', express.json(), (req, res) => {
//   const agent = new WebhookClient({ request, response })
//   console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers))
//   console.log('Dialogflow Request body: ' + JSON.stringify(request.body))

//   function welcome (agent) {
//     agent.add('Welcome to my agent!')
//   }

//   function fallback(agent) {
//     agent.add(`Sorry, I didn't catch that.`);
//   }

//   function getQuoteHandler (agent) {
//     agent.add('Hello from quote handler')
//   }

//   let intentMap = new Map()
//   intentMap.set('Default Welcome Intent', welcome)
//   intentMap.set('Default Fallback Intent', fallback);
//   intentMap.set('Quote', getQuoteHandler);

//   agent.handleRequest(intentMap)
// })

// module.exports = app