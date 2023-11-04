export interface IEmployeeTree{
  [key: string]: IEmployeeTree[]
}

export interface IEmployee{
  [key: string]: string | null;
}

export interface IPosition {
  x: number,
  y: number
}
export interface IUser {
  username: string
}