const express   = require('express');
const axios     = require('axios').default;

const {
    SNSClient,
    PublishCommand
} = require('@aws-sdk/client-sns');

const env = require('./env');

// ...

const routes = express.Router();

const sns = new SNSClient({
    region: 'eu-north-1'
});

// ...
// TMS API.
routes.post('/content', async (req, res) => {
    const response 
        = await axios({
            method: 'POST',
            url: 'http://content/resources'
        }
    );

    const resource 
        = response.data;

    // ...

    await sns.send(new PublishCommand({
        Message: JSON.stringify(resource.id),
        TopicArn: env.requestsTopic
    }));

    res.send(resource.id);
});

// ...

module.exports = routes;