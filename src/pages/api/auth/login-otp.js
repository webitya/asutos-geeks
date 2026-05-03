import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import Otp from '../../../models/Otp';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { email, password } = req.body;
  await dbConnect();

  try {
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
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
      subject: 'Asutos Geeks - Login OTP',
      text: `Your OTP for login is: ${otp}. It expires in 10 minutes.`,
    });

    res.status(200).json({ success: true, message: 'OTP sent' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
}
