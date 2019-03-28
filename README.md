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
from https://cloud.google.com/functions/docs/bestpractices/tips