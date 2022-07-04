const config = require('../../config');
const service = require('../service')(config);
const request = require('supertest');

describe('# Login', () => {
    describe('# POST Login should', () => {
        it('be able to get an token when valid credentials are provided', async () => {
            const response = await request(service)
                .post('/api/security/login')
                .send({
                    'email': 'luiz@gmail.com',
                    'password': '123456'
                });
            
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.token).toBeDefined();
            expect(response.body.user).toBeDefined();
        })
    })
})