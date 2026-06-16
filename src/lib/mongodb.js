import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI?.startsWith('mongodb') ? process.env.MONGODB_URI : "mongodb+srv://wetaworkinc_db_user:edL6Ph6E5n4ppiJE@cluster0.xp05ath.mongodb.net/wetawork?retryWrites=true&w=majority";

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
