//basic cloud functions in NodeJS using google cloud translate api
const translate = require('@google-cloud/translate')();

exports.translate = function(request, response) {
    let language = request.body.language || 'es';
    translate.translate('Hello, world!', language, (err, translation) => {
        response.status(200).send(translation);
    });
}