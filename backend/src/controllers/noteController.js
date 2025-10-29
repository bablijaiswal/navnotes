import Note from '../models/Note.js'
import fs from 'fs'
import path from 'path'

// @desc    Upload a note (file or link)
// @route   POST /notes/upload
// @access  Private
export const uploadNote = async (req, res) => {
  try {
    const { subject, caption, noteType, linkUrl } = req.body

    if (!subject) {
      return res.status(400).json({ message: 'Subject is required' })
    }

    if (noteType === 'file') {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' })
      }

      const note = await Note.create({
        userId: req.user.id,
        subject,
        caption,
        noteType: 'file',
        filePath: req.file.path,
        originalName: req.file.originalname,
        fileSize: req.file.size,
        mimeType: req.file.mimetype
      })

      res.status(201).json(note)
    } else if (noteType === 'link') {
      if (!linkUrl) {
        return res.status(400).json({ message: 'Link URL is required' })
      }

      const note = await Note.create({
        userId: req.user.id,
        subject,
        caption,
        noteType: 'link',
        linkUrl
      })

      res.status(201).json(note)
    } else {
      return res.status(400).json({ message: 'Invalid note type' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get all public notes
// @route   GET /notes/public
// @access  Public
export const getAllPublicNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate('userId', 'name email').sort('-uploadedAt')
    res.status(200).json(notes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get user's notes
// @route   GET /notes
// @access  Private
export const getUserNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort('-uploadedAt')
    res.status(200).json(notes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Download a file
// @route   GET /notes/download/:id
// @access  Public
export const downloadNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)

    if (!note) {
      return res.status(404).json({ message: 'Note not found' })
    }

    if (note.noteType !== 'file') {
      return res.status(400).json({ message: 'This is not a file note' })
    }

    const filePath = path.resolve(note.filePath)

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found' })
    }

    res.download(filePath, note.originalName)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Delete a note
// @route   DELETE /notes/:id
// @access  Private
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id)

    if (!note) {
      return res.status(404).json({ message: 'Note not found' })
    }

    // Check if user is the owner
    if (note.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this note' })
    }

    // Delete file if it's a file note
    if (note.noteType === 'file' && note.filePath) {
      const filePath = path.resolve(note.filePath)
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath)
      }
    }

    await Note.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: 'Note deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
