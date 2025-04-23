import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET) {
    throw new Error('Missing JWT_SECRET_KEY in environment');
}
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // Authorization: Bearer <token>
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Missing authentication token' });
    }
    try {
        // jwt.verify returns either string or object; we know we encoded an object
        const payload = jwt.verify(token, JWT_SECRET);
        // Attach only our JwtPayload fields
        req.user = { username: payload.username };
        return next();
    }
    catch (err) {
        console.error('Token verification failed:', err);
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};
