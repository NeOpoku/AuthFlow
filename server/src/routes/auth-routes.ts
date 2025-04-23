import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required' });
  }

  try {
    // 1) Find the user by username
    const user = User.findOne({ where: { username } }) as unknown as User;
    if (user === null) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 2) Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3) Create a JWT payload
    const payload = {
      userId: user.id,
      username: user.username,
    };

    // 4) Sign the token
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '1h' }
    );

    // 5) Return the token
    return res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

const router = Router();

// POST /auth/login - Login a user
router.post('/login', login);

export default router;
