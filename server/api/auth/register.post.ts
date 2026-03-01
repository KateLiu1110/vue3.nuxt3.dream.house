import users from '../../data/users.json'
import { generateToken } from '../../utils/jwt'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password, email, name } = body

  // 检查用户是否已存在
  const existingUser = users.find(u => u.username === username || u.email === email)

  if (existingUser) {
    return {
      success: false,
      message: '用户名或邮箱已存在',
    }
  }

  // 创建新用户
  const newUser = {
    id: `u${Date.now()}`,
    username,
    password, // 实际项目中应该加密
    email,
    name,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
    role: 'user', // 新注册用户默认为普通用户
    permissions: ['read', 'write'], // 默认权限
  }

  // 在实际项目中，这里应该写入数据库
  // 这里仅作演示，不实际写入文件
  
  // 生成 token
  const token = generateToken(newUser.id)
  
  // 生成 refresh token
  const { tokenSecret } = useRuntimeConfig(event)
  const refreshToken = jwt.sign(
    { UserID: newUser.id, type: 'refresh' }, 
    tokenSecret, 
    { expiresIn: 60 * 60 * 24 * 7 } // 7 days
  )

  // 返回用户信息（不包含密码）
  const { password: _, ...userWithoutPassword } = newUser

  return {
    success: true,
    user: userWithoutPassword,
    token,
    refreshToken,
  }
})
