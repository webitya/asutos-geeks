import cloudinary from '../../lib/cloudinary';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'POST') {
    try {
      const { image } = req.body;
      const uploadedResponse = await cloudinary.uploader.upload(image, {
        upload_preset: 'asutos_geeks', // User should create this preset or I'll just use default
      });
      res.status(200).json({ success: true, url: uploadedResponse.secure_url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Upload failed' });
    }
  } else {
    res.status(400).json({ success: false });
  }
}
