const jwt = require('jsonwebtoken');

// function to return userid from authorixation header

function getUserFromToken(authorizationHeader) {
    const token = authorizationHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.secret);
    if (!decoded) {
        return null;
    }
    console.log(decoded);
    return decoded.id;
}