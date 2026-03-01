// #region DTO 類型 ==========================================================================

export enum ErrorCodes {
  NotFound = '-666', // 使用者帳號不存在
  WrongPass = '-888' // 密碼錯誤
}

export enum StatusCode {
  default = '',
  Success = '000000' // 成功
}

export interface UserAuthResponse {
  ReturnCode: StatusCode
  ReturnMessage: string
}

export interface AuthResponse<T> {
  Data: T
  Success?: boolean
  Message?: string
  Level?: number
  TotalExecutionTime?: number
  DbExecutionTime?: number
}
export interface UserInfo {
  IsAuthenticated?: boolean
  ErrorCode?: ErrorCodes
  BranchID?: string
  CostCenterID?: string
  UserID?: string
  Name?: string
  Job?: string
  DepartmentNo?: string
  Department?: string
}

export interface AuthRequest {
  UserName: string
  AppId: string
  MenuId?: string
  DomId?: string
  SelectID?: string
}

// export interface Menu {
//   AppID: string
//   MenuID: string
//   Title: string
//   ParentID: string | null
//   Ordinal: number
//   Path: string
//   Released: string
//   active?: string
//   sub?: Menu[]
// }

export interface PermittedMenu {
  appID: string
  menuID: string
  title: string
  parentID?: string | null
  ordinal: number
  path: string
  released: string
  active?: string
  sub?: PermittedMenu[]
}

export interface VerifyMenu {
  Success: boolean
  Message: string
  Level: number
  Branches: Branch[]
  CostCenters: any[]
  Addable: boolean
  Editable: boolean
  Removable: boolean
  Viewable: boolean
  RptPrint: boolean
  RptSave: boolean
}

export interface Branch {
  GroupID: string
  BranchID: string
  Title: string
}

export interface Index {
  ItemType: string
  AppID: string
  MenuID: string
  ItemID: string
  SubItemName: any
  Authorized: boolean
}

export interface CtrolItem {
  ItemType: string
  AppID: string
  MenuID: string
  ItemID: string
  SubItemName: any
  Authorized: boolean
}

export interface AuthorizedOptions {
  AppID: string
  MenuID: string
  SelectID: string
  OptionName: string
  OptionValue: string
}

export interface Seller {
  ItemType: string
  AppID: string
  MenuID: string
  ItemID: string
  SubItemName: any
  Authorized: boolean
}

// #endregion

export interface AwaitReturn<T = any> {
  data: T | null
  error: Error | null
}
