const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        // Redirect to login if there's no token
        // Assuming your Next app is accessible here, otherwise you might just send an HTTP status
        return res.status(401).redirect('/login');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // Redirect to login if token verification fails
            return res.status(403).redirect('/login');
        }
        req.user = user; // Store user info in request
        next(); // Proceed to next middleware or route handler
    });
};

module.exports = authenticateJWT;
