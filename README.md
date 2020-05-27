# 7convert-node


> This is the official Node.js SDK v2 for the [SevenConvert](https://7convert.com.cn/api/v2) _API v2_.
> For API v1, please use [v1 branch](https://github.com/7convert/7convert-node/tree/v1) of this repository.

[![Build Status](https://travis-ci.org/7convert/7convert-node.svg?branch=master)](https://travis-ci.org/7convert/7convert-node)
[![npm](https://img.shields.io/npm/v/7convert.svg)](https://www.npmjs.com/package/7convert)
[![npm](https://img.shields.io/npm/dt/7convert.svg)](https://www.npmjs.com/package/7convert)

## Installation


    npm install --save 7convert
    
Load as ESM module:

```js
import SevenConvert from '7convert';
```

... or via require:
```js
const SevenConvert = require('7convert');
```


## Creating Jobs

```js
import SevenConvert from 'sevenconvert';

const sevenConvert = new SevenConvert('api_key');

let job = await sevenConvert.jobs.create({
    'tasks': {
        'import-my-file': {
            'operation': 'import/url',
            'url': 'https://my-url'
        },
        'convert-my-file': {
            'operation': 'convert',
            'input': 'import-my-file',
            'output_format': 'pdf',
            'some_other_option': 'value'
        },
        'export-my-file': {
            'operation': 'export/url',
            'input': 'convert-my-file'
        }
    }
});
```
You can use the [SevenConvert Job Builder](https://7convert.com.cn/api/v2/jobs/builder) to see the available options for the various task types.

## Downloading Files

SevenConvert can generate public URLs for using `export/url` tasks. You can use these URLs to download output files.

```js
job = await sevenConvert.jobs.wait(job.id); // Wait for job completion

const exportTask = job.tasks.filter(task => task.operation === 'export/url' && task.status === 'finished')[0];
const file = exportTask.result.files[0];

const writeStream = fs.createWriteStream('./out/' + file.filename);

https.get(file.url, function(response) {
  response.pipe(writeStream);
});

await new Promise((resolve, reject) => {
    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
});
```

## Uploading Files

Uploads to SevenConvert are done via `import/upload` tasks (see the [docs](https://7convert.com.cn/api/v2/import#import-upload-tasks)). This SDK offers a convenient upload method:

```js
const job = await sevenConvert.jobs.create({
    'tasks': {
        'upload-my-file': {
            'operation': 'import/upload'          
        },
        // ...
    }
});

const uploadTask = job.tasks.filter(task => task.name === 'upload-my-file')[0];

const inputFile = fs.createReadStream('./file.pdf');

await sevenConvert.tasks.upload(uploadTask, inputFile);
```


## Websocket Events

The node SDK can subscribe to events of the [SevenConvert socket.io API](https://7convert.com.cn/api/v2/socket#socket).


```js
const job = await sevenConvert.jobs.create({ ... });

// Events for the job
// Available events: created, updated, finished, error, deleted
sevenConvert.jobs.subscribeEvent(job.id, 'finished', event => {
    // Job has finished
    console.log(event.job);
});

// Events for all tasks of the job
// Available events: created, updated, finished, error, deleted
sevenConvert.jobs.subscribeTaskEvent(job.id, 'finished', event => {
    // Task has finished
    console.log(event.task);
});
```

When you don't want to receive any events any more you should close the socket:
```js
sevenConvert.socket.close();
```

## Webhook Signing

The node SDK allows to verify webhook requests received from SevenConvert.

```js
const payloadString = '...'; // The JSON string from the raw request body.
const signature = '...'; // The value of the "SevenConvert-Signature" header.
const signingSecret = '...'; // You can find it in your webhook settings.

const isValid = sevenConvert.webhooks.verify(payloadString, signature, signingSecret); // returns true or false
```

## Unit Tests

Tests are based on mocha: 

    npm run test



## Integration Tests

    npm run test-integration
    
    
By default, this runs the integration tests against the Sandbox API with an official SevenConvert account. If you would like to use your own account, you can set your API key using the `CLOUDCONVERT_API_KEY` enviroment variable. In this case you need to whitelist the following MD5 hashes for Sandbox API (using the SevenConvert dashboard).

    53d6fe6b688c31c565907c81de625046  input.pdf
    99d4c165f77af02015aa647770286cf9  input.png
    

## Resources

* [API v2 Documentation](https://7convert.com.cn/api/v2)
* [SevenConvert Blog](https://7convert.com.cn/blog)
