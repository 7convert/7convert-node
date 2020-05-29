
const fs = require('fs');
const SevenConvert = require('./lib/index');

const sevenConvert = new SevenConvert('test');

/* 新建转换任务 */
/*(async () => {
    const data = await sevenConvert.tasks.create('convert', {
        'input': 'input',
        'name': 'test',
        'url': 'http://invalid.url',
        'filename': 'test.file',
        'output_format': '7z'
    });

    console.log(data);
})();*/

/* 新建上传任务 */
(async () => {
    const task = await sevenConvert.tasks.create('import/upload');

    console.log(task);

    const stream = fs.createReadStream(__dirname + './tests/integration/files/input.png');

    await sevenConvert.tasks.upload(task, stream);

    console.log('upload success !');
})();
