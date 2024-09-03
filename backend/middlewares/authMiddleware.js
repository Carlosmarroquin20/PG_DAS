const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        console.error("Error: Token de autenticación no proporcionado.");
        return res.status(401).json({ errors: "No se proporcionó un token de autenticación. Por favor, autentíquese." });
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user; // Aquí se espera que data.user contenga el userId
        console.log(`Token verificado con éxito. Usuario ID: ${req.user.id}`);
        next();
    } catch (error) {
        console.error("Error: Token inválido o expirado.");
        res.status(401).json({ errors: "Token inválido o expirado. Por favor, inicie sesión nuevamente." });
    }
};

module.exports = authMiddleware;
