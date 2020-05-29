const SevenConvert = require('./lib/index');

const sevenConvert = new SevenConvert('test');

(async () => {
    const data = await sevenConvert.tasks.create('convert', {
        'name': 'test',
        'url': 'http://invalid.url',
        'filename': 'test.file'
    });

    console.log(data);
})();
