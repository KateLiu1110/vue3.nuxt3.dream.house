
export interface BasicResponse<T = any> {
  Code: string
  Data: T
  Msg: string
  TimeElapsed: number
  Timestamp: number
}

export interface loginData {
  token: string
  name: string
  departmentNo: string
  department: string
  role: string
  userId: string
}

export enum EnumStatus {
  Input = 1, // 輸入件
  Pending = 2, // 待審件
  Reviewed = 3 // 已審件
}

export enum Action {
  ADD = 'ADD', // 新增
  UPDATE = 'UPDATE' // 修改
}

export interface ShareData<T> {
  from?: string
  action?: Action
  data?: T
  reloadData?: boolean
};

export interface BaseResponse {
  Code: string
  Msg: string
  Timestamp: number
  TimeElapsed: number
}

interface Data<T = any, U = any> {
  TotalRows: number
  Detail: T
  Detail2?: U
}

// export interface ReadResponse<T = any, U = any> extends BaseResponse {
//   Data: Data<T, U>[]
// }

export interface ReadResponse<T = any> extends BaseResponse {
  Data: T
}

export interface DataResponse<T = any> extends BaseResponse {
  Data: T
}

export interface ProjectSetting {
  CathaySecAuth: string
  ApiHost: string
  AppId: string
  UsePathBase: string
  env: string
}

export interface GetLogonResponse<T = any> extends BaseResponse {
  Data: Data<T>[]
}

export interface ShareData<T> {
  from?: string
  action?: Action
  data?: T
  reloadData?: boolean
};

export interface BaseResponse {
  Code: string
  Msg: string
  Timestamp: number
  TimeElapsed: number
}

interface Data<T = any, U = any> {
  TotalRows: number
  Detail: T
  Detail2?: U
}

export interface DataResponse<T = any> extends BaseResponse {
  Data: T
}

export interface ICostCenters {
  CostCenterID: string
  Title: string
}

export interface IVerify {
  Success: boolean
  Message: string
  Level: number
  Branches: IBranch[]
  CostCenters: ICostCenters[]
  Addable: boolean
  Editable: boolean
  Removable: boolean
  Viewable: boolean
  RptPrint: boolean
  RptSave: boolean
}
export interface IBranch {
  GroupID: string
  BranchID: string
  Title: string
}
interface IBaseInfo {
  appID: string
  menuID: string
}

export interface IPermittedMenus extends IBaseInfo {
  title: string
  parentID: string
  ordinal: number
  path: string
  released: string
  children?: IPermittedMenus[]
}

export interface PermittedMenusData {
  data: {
    path: string
    title: string
    parentId: string
    appID: string
    menuID: string
    ordinal: string
    released: string
  }[]
}

export interface IDoms extends IBaseInfo {
  DomID: string
  Title: string
}

export interface ISelect extends IBaseInfo {
  SelectID: string
}
export interface IOption extends ISelect {
  OptionName: string
  OptionValue: string
}

export interface ITables extends IBaseInfo {
  TableID: string
}

export interface IColumns extends ITables {
  ColumnID: string
  ColumnName: string
}

export interface IControlList extends IBaseInfo {
  ItemID: string
  ItemType: string
  SubItemName: string | null
  Authorized: boolean
}

export type MaybeNull<T> = T | null;

export interface AASignInResponse<T = any> {
  Data: T
  Success: boolean
  Message: string
  Level: number
  TotalExecutionTime: number
  DbExecutionTime: number
}

export interface AuthUser {
  IsAuthenticated: boolean
  ErrorCode: MaybeNull<ErrorCodes>
  BranchID: MaybeNull<string>
  CostCenterID: MaybeNull<string>
  UserID: MaybeNull<string>
  Name: MaybeNull<string>
  Job: MaybeNull<string>
  DepartmentNo: MaybeNull<string>
  Department: MaybeNull<string>
  Email: string
  IdNo: string
  MgrID: string
  MgrName: string
}

enum ErrorCodes {
  NotFound = '-666', // 使用者帳號不存在
  WrongPass = '-888' // 密碼錯誤
}

