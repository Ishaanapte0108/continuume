import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import sendVerificationEmail from '../utils/sendVerificationEmail.js';
import sendForgotPasswordEmail from '../utils/sendForgotPasswordEmail.js';



export const signup = async (req, res, next) => {
  
  if (Object.keys(req.body).length < 4) {
    return next(errorHandler(400, 'Incomplete fields'))
  }
  
  const {fullname, username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({fullname, username, email, password: hashedPassword });
  try {
    
    await newUser.save();
    //generate verification token
    const verificationToken = jwt.sign({ id: newUser._id, email: newUser.email }, 
      process.env.JWT_SECRET, { expiresIn: '1h' });
    const verificationLink = `${process.env.FRONTEND_URL}/verify?token=${verificationToken}`;
    await sendVerificationEmail(newUser.email, verificationLink);
    res.status(201).json('User created successfully!');
  } catch (error) {
    if (error.errorResponse.code == 11000){
      next(errorHandler(500, 'Username or email already exists'));  
    }
    next(errorHandler(500, 'Internal server error'));
  }
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found!' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    
    await sendForgotPasswordEmail(resetLink, email)

    res.status(200).json({ success: true, message: 'Email sent successfully!' });

  } catch (error) {
    next(errorHandler(500, 'Internal server error'));
  }
};

export const resetPassword = async (req, res, next) => {
  const { token, password } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = bcryptjs.hashSync(password, 10);

    await User.findByIdAndUpdate(decoded.id, { password: hashedPassword });
    res.status(200).json({ success: true, message: 'Password reset successfully!' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid or expired token.' });
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));
    if (validUser.isVerified === 'NO') return next(errorHandler(401, 'Access denied, please verify email address'))
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
    const token = jwt.sign({ id: validUser._id, role: validUser.role}, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    const expiresIn = 24 * 60 * 60 * 1000;
    try {
      res
        .cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + expiresIn) })
        .status(200)
        .json(rest);
    } catch (cookieError) {
      next(errorHandler(500, 'Error setting authentication cookie.'));
    }
  } catch (error) {
    next(errorHandler(500, 'Internal server error'));
  }
};


export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      const expiresIn = 24 * 60 * 60 * 1000;
      res
      .cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + expiresIn) })
      .status(200)
      .json(rest);
        
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({ fullname: req.body.name, username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4) , email: req.body.email, password: hashedPassword, avatar: req.body.photo });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      const expiresIn = 12 * 60 * 60 * 1000;
      res
      .cookie('access_token', token, { httpOnly: true, expires: new Date(Date.now() + expiresIn) })
      .status(200)
      .json(rest);
      
    }
  } catch (error) {
    next(errorHandler(500, 'Internal server error'));
  }
}

export const signout = (req, res, next) =>{
  try {
    res.clearCookie('access_token')
    res.status(200).json('User has been logged out!')
  } catch (error) {
    next(errorHandler(500, 'Internal server error'));
  }
}

export const getAllUsers = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return next(errorHandler(403, 'Access denied.'));
    }
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    next(errorHandler(500, 'Internal server error'));
  }
};

// src/controllers/auth.controller.js

export const verify = async (req, res, next) => {
  const token = req.query.token;

  if (!token) {
    return next(errorHandler(400, 'Verification token is missing'))
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findById(userId);
    if (!user) {
      return next(errorHandler(404, 'User not found'))
    }

    if (user.isVerified === 'YES') {
      return next(errorHandler(400, 'User already verified!'))
    }

    user.isVerified = 'YES';
    await user.save();

    res.status(200).json({ message: 'Email successfully verified!' });
  } catch (error) {
    next(errorHandler(500, 'Internal server error'));
  }
};

