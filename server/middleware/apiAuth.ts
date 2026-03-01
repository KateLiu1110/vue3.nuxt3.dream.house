/** 未支援的程式: 待刪除? */
import type { H3Event } from 'h3';
import jwt from 'jsonwebtoken';
import type { VerifyErrors } from 'jsonwebtoken';

function extractToken(authHeaderValue: string) {
  const [, token] = authHeaderValue.split('Bearer ');
  return token;
}

function checkJwtValid(event: H3Event): Promise<string> {
  return new Promise((resolve) => {
    const { tokenSecret } = useRuntimeConfig(event);

    const authHeaderValue = getRequestHeader(event, 'authorization') as string;

    if (typeof authHeaderValue === 'undefined') {
      resolve('E1');
    }

    const extractedToken = extractToken(authHeaderValue);

    if (extractedToken === '') { resolve('E2'); }

    jwt.verify(extractedToken, tokenSecret, (error: VerifyErrors | null) => {
      if (error) {
        resolve('E3');
      } else {
        resolve('');
      }
    });
  });
}

export default eventHandler(async (event) => {
  // 需要驗證的路徑
  const beAuthPaths = [
    // '/api/test',
    '/api/sys'
  ];

  const hasProtectUrl = beAuthPaths.some((checkUrl) => {
    return event.path.startsWith(checkUrl);
  });

  if (!hasProtectUrl) { return; }

  const result = await checkJwtValid(event);

  const cases: { [key: string]: () => void } = {
    E1: () => { throw createError({ status: 403, message: '缺少 authorization' }); },
    E2: () => { throw createError({ status: 403, message: '無 token' }); },
    E3: () => { throw createError({ status: 403, message: 'token 失效' }); }
  };

  if (result !== '') { cases[result](); }
});
