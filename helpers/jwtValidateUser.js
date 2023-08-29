const jwt = require('jsonwebtoken');

function validateUserToken(authorizationHeader) {
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        const token = authorizationHeader.substring(7);
        try {
            const decodedToken = jwt.verify(token, process.env.secret);
            const userId = decodedToken.userId; // Assuming "sub" represents user ID in the token
            const isAdmin = decodedToken.isAdmin; // Assuming "role" represents user role in the token

            if (isAdmin){
                userRole = 'admin';
            }
            else{
                userRole = 'user';
            }
            return { userId, userRole };
        } catch (error) {
            return null; // Invalid token
        }
    } else {
        return null; // Missing or invalid authorization header
    }
}

module.exports = validateUserToken;
