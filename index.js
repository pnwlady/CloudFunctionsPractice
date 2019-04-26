const functions = require('firebase-functions')
const app = require('./app')

exports.app = functions.https.onRequest(app)

'use strict';

const functions = require('firebase-functions');
const request = require('request-promise');
const random = require('random');
const nodemailer = require('nodemailer');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');


process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
	const agent = new WebhookClient({ request, response });
	console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
	console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

	function getQuoteNumber() {
		var quote = {};
		const randomQuoteNum = random.uniformInt(100001, 101000).call();
		const randomPremium = random.uniform(550, 1000).call().toFixed(2);
		console.log('Quote and Premium %s,%s', randomQuoteNum, randomPremium);
		quote = {
			quoteNumber: 'BPQ' + randomQuoteNum,
			premium: '$' + randomPremium
		};
		return quote;
	}

	function getQuoteHandler(agent) {
		var quote = getQuoteNumber();
		const email = agent.parameters.email;
		const businessName = agent.parameters.businessName;
		const businessAddress = agent.parameters.address;
		var phoneNumber = agent.parameters.phoneNumber;
		if (phoneNumber && !(phoneNumber.startsWith('1') || phoneNumber.startsWith('+1'))) {
			phoneNumber = '+1' + phoneNumber;
			agent.parameters.phoneNumber=phoneNumber;
		}

		const request = require('request-promise');
        var options = {
			method: 'POST',
			uri: 'https://21yt9i63l4.execute-api.us-east-1.amazonaws.com/dev/sendSMS',
			body: {
                message: 'Great news! You can resume and complete your policy purchase at https://hscommercial.page.link/tc4X',
				mobileNumber: phoneNumber,
				url: ''
			},
			headers: { 'x-api-key': '2Ra3Aiv6uK4Mp1K3bamAK4U70Xw8rhxE1zz6UjG9' },
			family: 4,
			json: true // Automatically stringifies the body to JSON
		};
		console.log('Sending Text');
		return request(options).then(
			function () {
				agent.add('Here you go!: '+ quote.quoteNumber+' with annual premium '+quote.premium+' . You\'ll also get a link to complete your purchase. Insuring your business has never been so easy.');
				console.log('Message sent');
				 //return Promise.resolve(agent);
			}
		).catch(
			function (err) {
				console.error(JSON.stringify(err));
				agent.add('Message Sending  failed!!');
				//return Promise.resolve(agent); 
			}
		).finally(function () {
          const context = {
                'name' : 'initiate-businessinformation-followup',
                'lifespan': 3,
				'parameters': {
					'quoteNumber': quote.quoteNumber,
					'premium': quote.premium
				}
			};
			agent.setContext(context);
			return Promise.resolve(agent);
		});
	}

	// Run the proper function handler based on the matched Dialogflow intent name
	let intentMap = new Map();
	intentMap.set('Initiate - Business Information', getQuoteHandler);
	agent.handleRequest(intentMap);
});

'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});