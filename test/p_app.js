const req = require('supertest');
const { expect } = require('chai');
const app = req('http://localhost:3000/');

let arr_response;


describe('GET /users?username=Delphine', () => {
    it('search for user with username “Delphine"', () => {
        return app.get('users?username=Delphine').then((res) => {
            arr_response = res.body;
            expect(res.body).to.be.an('array')
            expect(res.ok).to.be.true;
            expect(res.body[0].username).to.be.eq('Delphine');
        })
    });
});
