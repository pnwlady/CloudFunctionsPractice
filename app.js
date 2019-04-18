const express = require('express')
const { WebhookClient } = require('dialogflow-fulfillment')
const app = express()

app.get('/', (req, res) => res.send('online'))
app.post('/dialogflow', express.json(), (req, res) => {
  const agent = new WebhookClient({ request: req, response: res })

  function welcome () {
    agent.add('Welcome to my agent!')
  }

  function getQuoteHandler () {
    agent.add('Hello from quote handler')
  }

  let intentMap = new Map()
  intentMap.set('Default Welcome Intent', welcome)
  intentMap.set('Initiate - Business Information', getQuoteHandler);

  agent.handleRequest(intentMap)
})

module.exports = app