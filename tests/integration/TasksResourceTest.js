import SevenConvert from '../../lib/SevenConvert.js';
import {assert} from "chai";
import * as fs from 'fs';
import apiKey from './ApiKey';


describe('TasksResouce', () => {


    beforeEach(() => {
        this.sevenConvert = new SevenConvert(apiKey, true);
    });


    describe('upload()', () => {

        it('uploads input.png', async () => {

            let task = await this.sevenConvert.tasks.create('import/upload', {
                'name': 'upload-test'
            });

            const stream = fs.createReadStream(__dirname + '/../integration/files/input.png');

            await this.sevenConvert.tasks.upload(task, stream);

            task = await this.sevenConvert.tasks.wait(task.id);

            assert.equal(task.status, 'finished');
            assert.equal(task.result.files[0].filename, 'input.png');

        }).timeout(30000);

    });


});
