import mongoose from 'mongoose';

/**
 * User Schema for MongoDB
 * Stores user authentication and profile information
 */
const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  }, // This will store the hashed password
  avatar: {
    type: String,
    default: 'user-circle',
    enum: ['user-circle', 'user-check', 'user-plus', 'user-x', 'user-minus', 'crown', 'star', 'heart', 'smile', 'coffee']
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

// Prevent re-compilation during development
export default mongoose.models.User || mongoose.model('User', UserSchema);