import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export function generateToken(payload: any): string {

  const data =
    typeof payload === 'string'
      ? { value: payload }
      : payload

  return jwt.sign(data, SECRET_KEY, { expiresIn: '7d' })
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, SECRET_KEY)
  } catch (error) {
    return null
  }
}
