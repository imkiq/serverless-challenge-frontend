import { Employee } from "../Employee";
export type CreateEmployeeDto = Omit<Employee, "id"> & {};
