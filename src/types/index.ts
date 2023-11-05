export interface IEmployeeTree{
  [key: string]: IEmployeeTree[]
}

export interface IEmployee{
  [key: string]: string | null;
}

export interface ISupervisedEmployee {
  name: string,
  supervisor?: ISupervisedEmployee
}

export interface IPosition {
  x: number,
  y: number
}
export interface IUser {
  username: string
}

export interface FormProps {
  open: boolean,
  handleClose: () => void,
  handleToggle: () => void,
  closeThis: () => void,
}