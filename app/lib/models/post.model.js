import mongoose from 'mongoose';

/**
 * Post Schema for MongoDB
 * Stores blog post information with author reference
 */
const PostSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  slug: { 
    type: String, 
    required: [true, 'Slug is required'], 
    unique: true,
    lowercase: true,
    trim: true
  },
  content: { 
    type: String, 
    required: [true, 'Content is required']
  },
  imageUrl: { 
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Technology', 'Design', 'Business', 'Lifestyle', 'Health', 'Travel', 'Food', 'Fashion', 'Sports', 'Entertainment'],
    default: 'Technology'
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: [true, 'Author is required']
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

// Create index for better query performance
// Note: slug index is automatically created due to unique: true
PostSchema.index({ author: 1 });
PostSchema.index({ createdAt: -1 });

// Prevent re-compilation during development
export default mongoose.models.Post || mongoose.model('Post', PostSchema);