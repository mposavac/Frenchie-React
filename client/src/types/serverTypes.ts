export interface ICreateUserResponse {
  user: { uid: string };
  credential: string | null;
  additionalUserInfo: Object;
  operationType: string;
}
