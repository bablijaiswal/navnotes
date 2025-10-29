import mongoose from 'mongoose'

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Note must belong to a user']
    },
    subject: {
      type: String,
      required: [true, 'Please provide a subject'],
      trim: true
    },
    caption: {
      type: String,
      trim: true
    },
    noteType: {
      type: String,
      enum: ['file', 'link'],
      required: [true, 'Please specify note type']
    },
    // For file uploads
    filePath: String,
    originalName: String,
    fileSize: Number,
    mimeType: String,
    
    // For link sharing
    linkUrl: String,
    
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
)

export default mongoose.model('Note', noteSchema)
