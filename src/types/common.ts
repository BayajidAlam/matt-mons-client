export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export interface UserInfo {
  id: string;
  role: string;
  email: string;
  shopCount: number;
  sellerId: string;
  shopId: string;
  fullName: string;
  profileImage: string;
  iat: number;
  exp: number;
}
