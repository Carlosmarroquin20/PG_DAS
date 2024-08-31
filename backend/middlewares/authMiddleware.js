const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "Por favor autenticar usando un token valido" });
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ errors: "Token inválido" });
    }
};

module.exports = authMiddleware;
