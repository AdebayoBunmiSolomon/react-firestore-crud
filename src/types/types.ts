export type formData = {
  firstName: string;
  lastName: string;
  email: string;
  salary: string;
  date: string;
  imageUpload: string;
};

export interface IAddProps {
  employees: any[];
  setEmployees: any;
  setIsAdding: any;
}

export type loginForm = {
  email: string;
  password: string;
};
