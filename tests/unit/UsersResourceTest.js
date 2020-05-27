import SevenConvert from '../../lib/SevenConvert.js';
import {assert} from "chai";
import nock from "nock";


describe('UsersResouce', () => {

    beforeEach(() => {
        this.sevenConvert = new SevenConvert('test');
    });


    describe('me()', () => {

        it('should fetch the current user', async () => {


            nock('https://api.7convert.com.cn')
                .get('/v2/users/me')
                .replyWithFile(200, __dirname + '/responses/user.json',
                    {'Content-Type': 'application/json'});

            const data = await this.sevenConvert.users.me();

            assert.isObject(data);
            assert.equal(data.id, 1);
            assert.equal(data.credits, 4434);




        });

    });



});
