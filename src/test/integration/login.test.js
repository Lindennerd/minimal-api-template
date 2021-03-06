import config from '../../../config/index.js';
import service from '../../service.js';
import supertest from 'supertest';
import assert from 'assert';
import userModel from '../../database/models/user.model.js';
import mongoose from 'mongoose';

describe('Integration - Login', () => {

    let userId = null;

    before(async () => {
        const testUser = new userModel({
            email: 'luiz@gmail.com',
            password: '123456'
        });

        await testUser.save();
        userId = testUser._id;
    });

    after(async () => {
        await userModel.deleteOne({ id: userId });
        mongoose.connection.close();
    })

    describe('# POST Login should', () => {
        it('be able to get an token when valid credentials are provided', async () => {
            const response = await supertest(service(config))
                .post('/api/security/login')
                .send({
                    'email': 'luiz@gmail.com',
                    'password': '123456'
                });

            assert.equal(response.status, 200, 'response status is 200');
            assert.equal(response.body.success, true, 'response body indicates success');
            assert.notEqual(response.body.token, null, 'response body contains a token');
            assert.notEqual(response.body.user, null, 'response body user definition');
        });

        it('not exposes user password', async () => {
            const response = await supertest(service(config))
                .post('/api/security/login')
                .send({
                    'email': 'luiz@gmail.com',
                    'password': '123456'
                });

            assert.equal(response.body.user.password, null, 'response body does not exposes user password');
        })

        it('refuse auth when invalid credential is provided', async () => {
            const response = await supertest(service(config))
                .post('/api/security/login')
                .send({
                    'email': 'luiz@gmail.com',
                    'password': '789964'
                });

            assert.equal(response.status, 400, 'response status is 400');
            assert.equal(response.body.success, false, 'response body indicates success');
            assert.equal(response.body.token, null, 'response body contains a token');
            assert.equal(response.body.user, null, 'response body user definition');
        })

    })
})