// this file not used in this project because this method outdated
const expressJwt = require('express-jwt');
const api = process.env.API_URL;

function authJwt() {
    const SECRET = process.env.SECRET;
    return expressJwt({
        secret: SECRET,
        algorithms: ['HS256'],
        isRevoked: isRevoked,
    }).unless({
        path: [
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/category(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/users\/login(.*)/, methods: ['POST', 'OPTIONS'] },
            `${api}/users/login`,
            `${api}/users/register`,
        ],
    });
}

async function isRevoked(req, payload, done) {
    if (!payload.isAdmin) {
        done(null, true);
    }
    done();
}

// authJwt(api, jwt({ secret: secret, algorithms: ["HS256"] }));
module.exports = authJwt;