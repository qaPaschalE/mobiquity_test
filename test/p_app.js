const req = require('supertest');
const { expect } = require('chai');
const app = req('http://localhost:3000/');
const validateEmail = require('../src/email_helper');

let arr_response, user_posts;

describe('GET /users?username=Delphine', () => {
    it('search for user with username “Delphine', () => {
        return app.get('users?username=Delphine').then((res) => {
            arr_response = res.body;
            expect(res.ok).to.be.true;
            expect(arr_response).to.be.an('array')
            expect(arr_response[0].username).to.be.eq('Delphine');
        })
    });
});

describe('GET /posts?userId=userId', () => {
    it('search for posts written by user with username “Delphine"', () => {
        const userId = arr_response[0].id
        return app.get(`posts?userId=${userId}`).then((res) => {
            user_posts = res.body;
            expect(res.ok).to.be.true;
            expect(user_posts).to.be.an('array')
        })
    });
});

describe('GET /comments?postId=postId', () => {
    it('fetch comment for each posts and validates email', () => {
        for (let i = 0; i < user_posts.length; i++) {
            const postId = user_posts[i].id
            app.get(`comments?postId=${postId}`).then((res) => {
                expect(res.body).to.be.an('array')
                expect(res.ok).to.be.true;
                const comments = res.body;
                for (let j = 0; j < comments.length; j++) {
                    expect(validateEmail(comments[j].email)).to.be.true
                }

            })
        }

    });
});
