const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);  // No token found

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);  // Invalid token
        req.user = user;
        next();
    });
};

exports.generateToken = (user) => {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '24h' });
};