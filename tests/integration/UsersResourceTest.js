import SevenConvert from '../../lib/SevenConvert.js';
import apiKey from './ApiKey';
import {assert} from "chai";
import nock from "nock";


describe('UsersResouce', () => {

    beforeEach(() => {
        this.sevenConvert = new SevenConvert(apiKey, true);
    });


    describe('me()', () => {

        it('should fetch the current user', async () => {


            const data = await this.sevenConvert.users.me();

            console.log(data);

            assert.isObject(data);
            assert.containsAllKeys(data, ['id', 'username', 'email', 'credits']);



        });

    });



});
