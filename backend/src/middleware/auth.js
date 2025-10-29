import jwt from 'jsonwebtoken'

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Not authorized to access this route' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { id: decoded.id }

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized to access this route' })
  }
}
