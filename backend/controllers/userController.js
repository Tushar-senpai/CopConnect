import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  try {
    const { name, phone, badgeNumber, adminId, password, role } = req.body;

    if (role === 'anonymous') {
      return res.status(400).json({ message: 'Anonymous users do not need to register.' });
    }

    let newUser;

    if (role === 'police') {
      if (!name || !badgeNumber) {
        return res.status(400).json({ message: 'Police must provide name and badge number.' });
      }
      newUser = new User({ name, badgeNumber, role });
    } 
    
    else if (role === 'citizen') {
      if (!phone || !name) {
        return res.status(400).json({ message: 'Citizen must provide name and phone number.' });
      }
      newUser = new User({ name, phone, role });
    } 
    
    else if (role === 'admin') {
      if (!adminId || !password) {
        return res.status(400).json({ message: 'Admin must provide admin ID and password.' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      newUser = new User({ adminId, password: hashedPassword, role });
    }

    await newUser.save();
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return token along with success message
    res.status(201).json({ message: 'User registered successfully', token });

  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
    console.error(error);

  }
};

export const loginUser = async (req, res) => {
    try {
      const { role } = req.body;
  
      if (role === 'anonymous') {
        return res.status(403).json({ message: 'Anonymous users do not need login.' });
      }
  
      let user;
  
      if (role === 'police') {
        const { name, badgeNumber } = req.body;
        if (!name || !badgeNumber) return res.status(400).json({ message: 'Name and badge number are required' });
  
        user = await User.findOne({ name, badgeNumber });
      } 
      
      else if (role === 'citizen') {
        const { name, phone } = req.body;
        if (!name || !phone) return res.status(400).json({ message: 'Name and phone are required' });
  
        user = await User.findOne({ name, phone });
      } 
      
      else if (role === 'admin') {
        const { adminId, password } = req.body;
        if (!adminId || !password) return res.status(400).json({ message: 'Admin ID and password are required' });
  
        user = await User.findOne({ adminId });
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
      }
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate Token
      const token = jwt.sign(
        {
          id: user._id,
          role: user.role,
          name: user.name,
          badgeNumber: user.badgeNumber
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      
      
      console.log("generated token is : ", token);

      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ message: 'Login failed' });
    }
  };
  
