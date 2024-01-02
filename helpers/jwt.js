const expressJwt = require('express-jwt');

function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/api\/v1\/category(.*)/ , methods: ['GET'] },
            {url: /\/public\/uploads(.*)/ , methods: ['GET'] },
            {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/orders(.)/,methods: ['GET', 'OPTIONS', 'POST']},
            `${api}/users/login`,
            `${api}/users/register`,
            // {url: /\/api\/v1/ , methods: ['GET','POST'] }, //this is for testing purpose only
            
        ]
    })
}

async function isRevoked(req, payload, done) {
    if(!payload.isAdmin) {
        done(null, true)
    }

    done();
}

module.exports = authJwt