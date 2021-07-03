const req = require('supertest');
const { expect } = require('chai');
const app = req('http://localhost:3000/');

let arr_response, user_posts;


describe('GET /users?username=Delphine', () => {
    it('search for user with username “Delphine', () => {
        return app.get('users?username=Delphine').then((res) => {
            arr_response = res.body;
            expect(arr_response).to.be.an('array')
            expect(res.ok).to.be.true;
            expect(arr_response[0].username).to.be.eq('Delphine');
        })
    });
});
describe('GET /posts?userId=9', () => {
    it('search for posts written by user with username “Delphine"', () => {
        const userId = arr_response[0].id
        return app.get(`posts?userId=${userId}`).then((res) => {
            user_posts = res.body;
            expect(user_posts).to.be.an('array')
            expect(res.ok).to.be.true;
        })
    });
});
