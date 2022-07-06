const config = require('../../config');
const service = require('../service')(config);
const request = require('supertest');
const assert = require('assert');

describe('# Login', () => {

    let userId = null;

    beforeEach(async () => {
        const userModel = require('../database/models/user');

        const testUser = new userModel({
            email: 'luiz@gmail.com',
            password: '123456'
        });

        await testUser.save();
        userId = testUser._id;
    });

    afterEach(async () => {
        const userModel = require('../database/models/user');
        const mongoose = require('mongoose');
        await userModel.deleteOne({ id: userId });

        mongoose.connection.close();

    })

    describe('# POST Login should', () => {
        it('be able to get an token when valid credentials are provided', async () => {
            const response = await request(service)
                .post('/api/security/login')
                .send({
                    'email': 'luiz@gmail.com',
                    'password': '123456'
                });
            
            assert.equal(response.status, 200, 'response status is 200');
            assert.equal(respomse.body.success, true, 'response body indicates success');
            assert.notEqual(response.body.token, null, 'response body contains a token');
            assert.notEqual(response.body.user, null, 'response body user definition');
            assert.equal(response.body.user.password, null, 'response body does not exposes user password');
        })
    })
})