import { CreateEmployeeDto } from "@/models/dto/create-employee.dto";
import api from "./config";
import { UpdateEmployeeDto } from "@/models/dto/update-employee.dto";

class EmployeeService {
  async getAll() {
    const { data } = await api.get("/");
    return data;
  }

  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      const { data } = await api.post("/", createEmployeeDto);
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  async findAll() {
    try {
      const { data } = await api.get("/");
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  async findOne(id: string) {
    try {
      const { data } = await api.get(`/${id}`);
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const { data } = await api.patch(`/${id}`, updateEmployeeDto);
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  async remove(id: string) {
    try {
      const { data } = await api.delete(`/${id}`);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
}

const employeeService = new EmployeeService();
export default employeeService;
