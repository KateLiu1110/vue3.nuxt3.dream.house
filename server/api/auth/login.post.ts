/* eslint-disable unused-imports/no-unused-vars */
import process from 'node:process';
import fs from 'node:fs';
import path from 'node:path';
import jwt from 'jsonwebtoken';
import { ErrorCodes } from '~/server/dto/interface.dto';
import type {
  AuthResponse,
  AwaitReturn,
  UserAuthResponse,
  UserInfo
} from '~/server/dto/interface.dto';
import type { BaseResponse } from '~/types/interfaces.dto';

// 本地開發用的認證函數
async function LocalAuthenticationSignIn(Username: string, Password: string): Promise<AwaitReturn<AuthResponse<UserInfo>>> {
  try {
    const usersPath = path.resolve(process.cwd(), 'server/data/users.json');
    const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
    
    const user = usersData.find((u: any) => u.username === Username && u.password === Password);
    
    if (user) {
      // 構造符合 UserInfo 格式的返回數據
      const userInfo: UserInfo = {
        UserID: user.id,
        Name: user.name,
        BranchID: 'B001',
        DepartmentNo: 'D001',
        Department: '開發部',
        IsAuthenticated: true,
        ErrorCode: '',
        Message: '登入成功'
      };
      
      return {
        data: {
          Success: true,
          Data: userInfo,
          Message: '登入成功'
        },
        error: null
      };
    } else {
      // 账号或密码错误时，应该返回 Success: true，但 IsAuthenticated: false
      return {
        data: {
          Success: true,
          Data: {
            IsAuthenticated: false,
            ErrorCode: ErrorCodes.WrongPass,
            Message: '帳號或密碼錯誤'
          } as UserInfo,
          Message: '帳號或密碼錯誤'
        },
        error: null
      };
    }
  } catch (error) {
    return { data: null, error };
  }
}

// 權限授權管理API服務
async function AuthenticationSignIn(Username: string, Password: string): Promise<AwaitReturn<AuthResponse<UserInfo>>> {
  const { CathaySecAuth } = useRuntimeConfig();
  
  // 如果沒有配置外部認證服務，使用本地認證
  if (!CathaySecAuth || CathaySecAuth.trim() === '') {
    return await LocalAuthenticationSignIn(Username, Password);
  }
  
  return await $fetch<AuthResponse<UserInfo>>(`${CathaySecAuth}/Authentication/SignIn`, {
    method: 'POST',
    body: { Username, Password }
  }).then(data => ({ data, error: null })).catch(error => ({ data: null, error }));
}

// 新增登入資料
async function SignInInfo(userInfo: UserInfo): Promise<AwaitReturn<BaseResponse>> {
  const { UserID, Name, BranchID, DepartmentNo, Department } = userInfo;
  // console.warn({ UserID, Name, BranchID, DepartmentNo, Department });
  const _body = {
    UserID,
    Name,
    BranchID,
    DepartmentCode: DepartmentNo,
    DepartmentName: Department
  };
  // console.warn(_body);
  return await $fetch<BaseResponse>(`/api/com-edims-imsshare-rs/Logon/AddLogon`, {
    method: 'POST',
    headers: {
      UserId: UserID as string
    },
    body: _body
  }).then((data) => {
    return ({ data, error: null });
  }).catch((error) => {
    console.error(error);
    return ({ data: null, error });
  });
}

export default eventHandler(async (event) => {
  const body = await readBody(event);
  // 支持大小写字段名
  const Username = body.Username || body.username;
  const Password = body.Password || body.password;
  
  const headers = getRequestHeaders(event);
  const { data, error } = await AuthenticationSignIn(Username, Password);

  let errMsg = '';

  if (error) {
    errMsg = '登入失敗';
    throw createError({
      status: 403,
      message: errMsg,
      data: {
        ReturnCode: '',
        ReturnMessage: errMsg
      } as UserAuthResponse
    });
  }

  // 判斷是否登入成功
  if (data?.Success !== true) {
    errMsg = '登入失敗..';
    throw createError({
      status: 403,
      message: errMsg,
      data: {
        ReturnCode: '',
        ReturnMessage: errMsg
      } as UserAuthResponse
    });
  }

  // 判斷是否有授權
  if (data?.Data?.IsAuthenticated !== true) {
    errMsg = '登入失敗...';

    if (data?.Data.ErrorCode === ErrorCodes.NotFound) { errMsg = '使用者帳號不存在'; }
    if (data?.Data.ErrorCode === ErrorCodes.WrongPass) { errMsg = '密碼錯誤'; }

    throw createError({
      status: 403,
      message: errMsg,
      data: {
        ReturnCode: '',
        ReturnMessage: errMsg
      } as UserAuthResponse
    });
  }
  const { BranchID, UserID, DepartmentNo } = data.Data as UserInfo;

  const ClientIP = headers['x-forwarded-for'];
  
  // 设置用户角色和权限（这里简化处理，实际应从数据库获取）
  const userRole = Username === 'admin' ? 'admin' : 'user';
  const userPermissions = userRole === 'admin'
    ? ['read', 'write', 'delete', 'admin']
    : ['read', 'write'];
  
  const res = {
    success: true,
    token: '',
    refreshToken: '',
    user: {
      id: UserID,
      username: Username,
      email: `${UserID}@example.com`,
      name: (data.Data as UserInfo).Name || Username,
      avatar: '',
      role: userRole,
      permissions: userPermissions
    },
    ClientIP
  };
  if (errMsg === '') {
    const { tokenSecret } = useRuntimeConfig(event);
    const expiresIn = 60 * 60 * 8; // 8 hours
    const refreshExpiresIn = 60 * 60 * 24 * 7; // 7 days
    const user = { BranchID, UserID, DepartmentNo, role: userRole, permissions: userPermissions };
    res.token = jwt.sign(user, tokenSecret, { expiresIn });
    res.refreshToken = jwt.sign({ UserID, type: 'refresh' }, tokenSecret, { expiresIn: refreshExpiresIn });
  }

  // 新增登入資料 (僅在配置了 ApiHost 時執行)
  const { ApiHost } = useRuntimeConfig();
  if (ApiHost && ApiHost.trim() !== '') {
    const { data: SignInInfoData, error: SignInInfoError } = await SignInInfo(data.Data);
    if (SignInInfoError) {
      errMsg = '新增登入資料失敗';
      throw createError({
        status: 403,
        message: errMsg,
        data: {
          ReturnCode: '',
          ReturnMessage: errMsg
        } as UserAuthResponse
      });
    } else if (SignInInfoData && SignInInfoData.Code !== '000000') {
      console.error('新增登入資料:', SignInInfoData!.Msg);
      throw createError({
        status: 403,
        message: `新增登入資料: ${SignInInfoData!.Msg}`,
        data: {
          ReturnCode: SignInInfoData!.Code,
          ReturnMessage: `新增登入資料: ${SignInInfoData!.Msg}`
        } as UserAuthResponse
      });
    }
  }

  return res;
});

async function delay(sec: number = 1) {
  return new Promise((resolve) => {
    const _id = setTimeout(() => {
      resolve('');
      clearTimeout(_id);
    }, sec * 1000);
  });
}
