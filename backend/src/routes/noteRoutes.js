import express from 'express'
import {
  uploadNote,
  getAllPublicNotes,
  getUserNotes,
  downloadNote,
  deleteNote
} from '../controllers/noteController.js'
import { authenticate } from '../middleware/auth.js'
import { upload } from '../middleware/upload.js'

const router = express.Router()

// Public routes
router.get('/public', getAllPublicNotes)
router.get('/download/:id', downloadNote)

// Protected routes
router.post('/upload', authenticate, upload.single('file'), uploadNote)
router.get('/', authenticate, getUserNotes)
router.delete('/:id', authenticate, deleteNote)

export default router
