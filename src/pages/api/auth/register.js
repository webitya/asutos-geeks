import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import Professional from '../../../models/Professional';
import Otp from '../../../models/Otp';

import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { name, email, phone, password, role, ...proData } = req.body;
  await dbConnect();

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      isVerified: false,
    });

    // If role is pro, we'll create a professional profile after verification
    // For now, we just send OTP. We can store the proData in a session or just handle it after verification.
    // To keep it simple, we'll store pro intent in the User model or a temporary place.
    // Let's just create the Professional record as unverified if role is pro.
    if (role === 'pro') {
      await Professional.create({
        userId: user._id,
        name: user.name,
        skill: proData.skill,
        location: proData.location || '',
        address: proData.address || '',
        city: proData.city || '',
        state: proData.state || '',
        country: proData.country || '',
        resume: proData.resume || '',
        image: 'https://via.placeholder.com/150', // Default image until they upload one in dashboard
      });
    }


    // Send OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await Otp.create({ email, otp });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Asutos Geeks - Verify your account',
      text: `Your OTP for registration is: ${otp}. It expires in 10 minutes.`,
    });

    res.status(201).json({ success: true, message: 'OTP sent to email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
}
