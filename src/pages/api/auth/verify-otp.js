import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import Otp from '../../../models/Otp';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { email, otp } = req.body;
  await dbConnect();

  try {
    const validOtp = await Otp.findOne({ email, otp });
    if (!validOtp) return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });

    await User.findOneAndUpdate({ email }, { isVerified: true });
    await Otp.deleteMany({ email });

    res.status(200).json({ success: true, message: 'Account verified successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Verification failed' });
  }
}
