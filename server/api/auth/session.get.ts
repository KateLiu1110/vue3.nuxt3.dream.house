import type { H3Event } from 'h3';
import jwt from 'jsonwebtoken';
// import { SECRET } from './login.post';

const TOKEN_TYPE = 'Bearer';

function extractToken(authHeaderValue: string) {
  const [, token] = authHeaderValue.split(`${TOKEN_TYPE} `);
  return token;
}

function ensureAuth(event: H3Event) {
  const { tokenSecret } = useRuntimeConfig(event);

  const authHeaderValue = getRequestHeader(event, 'authorization');
  if (typeof authHeaderValue === 'undefined') {
    throw createError({ statusCode: 403, statusMessage: 'no authorization' });
  }

  const extractedToken = extractToken(authHeaderValue);

  if (extractedToken === '') {
    throw createError({ statusCode: 403, statusMessage: 'Token is empty' });
  }

  try {
    return jwt.verify(extractedToken, tokenSecret);
  } catch (error) {
    console.error('Login failed. Here\'s the raw error:', error);
    throw createError({ statusCode: 403, statusMessage: 'Token Verify Fail' });
  }
}

export default eventHandler((event) => {
  const user = ensureAuth(event);

  // 返回用户会话信息
  return {
    success: true,
    user: {
      id: user.UserID || user.id,
      username: user.username || user.UserID,
      name: user.name || user.UserID,
      role: user.role || 'user',
      permissions: user.permissions || ['read', 'write'],
      email: `${user.UserID || user.id}@example.com`,
    }
  };
});
