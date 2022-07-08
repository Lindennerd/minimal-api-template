import { validate, validatePassword } from '../../services/user.service';
import assert from 'assert';

describe('Unit - User validation', () => {
    it('name, email and password are required', () => {
        const user = {
            name: '',
            email: '',
            password: ''
        };

        assert.equal(validate(user.name, user.email, user.password), true);
    });

    it('password and password confirmation must match', () => { 
        assert.equal(validatePassword('123456', '123456'), true);
    });
 })
