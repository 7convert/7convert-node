import SevenConvert from '../../lib/SevenConvert.js';
import {assert} from "chai";
import nock from "nock";
import * as fs from 'fs';


describe('WebhooksResouce', () => {

    beforeEach(() => {
        this.sevenConvert = new SevenConvert('test');
    });


    describe('verify()', () => {

        it('should verify the payload', async () => {


            const secret = 'secret';
            const signature = '576b653f726c85265a389532988f483b5c7d7d5f40cede5f5ddf9c3f02934f35';
            const payloadString = fs.readFileSync(__dirname + '/requests/webhook_job_finished_payload.json');

            assert.isFalse(this.sevenConvert.webhooks.verify(payloadString, 'invalid', secret));
            assert.isTrue(this.sevenConvert.webhooks.verify(payloadString, signature, secret));



        });

    });



});
