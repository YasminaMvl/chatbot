const jwt = require('jsonwebtoken');
const { secret } = require('../../config/jwt');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token; // Récupérer le token stocké dans le cookie ou autre moyen approprié

        if (!token) {
            return res.redirect('/login');
        }

        const decoded = jwt.verify(token, secret);

        req.userId = decoded.userId;

        next();
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
};

module.exports = authMiddleware;
