# CloudFunctionsPractice
Learning Cloud Functions in NodeJS

## 1. To deploy the translate cloud function
    gloud functions deploy translate \
    --trigger-http --stage-bucket mybucket

from https://www.youtube.com/watch?v=CoKJiGCVzAg

## 2. Excape Html example 
    Dir helloworld/index.js
from https://cloud.google.com/functions/docs/bestpractices/tips

## 3. Example of performance best practices: using global variable to cache object for future invocations
    Dir tips/index.js
from https://cloud.google.com/functions/docs/bestpractices/tips

## 4. Lazy initialization of global variables
    Dir tips/lazy.js
from https://cloud.google.com/functions/docs/bestpractices/tip

## 5. Sendgrid Node app with Google Cloud CLI - practicing gcloud cli
    server.js, Dir views
from https://cloud.google.com/community/tutorials/send-email-with-sendgrid-and-nodejs-on-google-app-engine
And https://cloud.google.com/functions/docs/quickstart

## 6 Promises examples in Typescript
    functions/index.ts
    (Only capturing the code, not set up to compile)
1.  Promises with HTTP Triggers in the cloud
    Calling to a firestore app to get weather data, handling the response, sending it to the client in json, error handling
    * .send()
    * https://www.youtube.com/watch?v=7IkUgCLr5oA
2. Promises with a Firestore Trigger in Cloud Functions
    Fuction to respond to updates to firebase document and send message with Firebase Cloud Messaging
    * .onUpdate() - firestore trigger with 2 properties (before and after)
    * after capture/track changes to data after update
    * https://www.youtube.com/watch?v=652XeeKNHSk
3.  Promises for sequential and parallel work in Cloud Functions
    Handling multiple get requests and their promises, then doing something with results
    * Promise.all()
    * https://www.youtube.com/watch?v=d9GrysWH1Lc

## 7 Dialogflow Webhooks - develop and deploy locally 
    * simpleServer.js file
    * using ngrok, express, actions-on-google, dialogflow-fulfillment, gcloud CLI
    * run node simpleServer.js in one terminal window server locally    
    * run npm run tunnel in another terminal window to generate a public web server
    * add ngrok's generated url + /dialogflow to the web hook URL line, save and test
    * https://medium.com/@antonyharfield/dialogflow-web-hooks-how-to-develop-locally-and-deploy-to-cloud-functions-48839919e998