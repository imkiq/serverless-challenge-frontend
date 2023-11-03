"use client";
import MUIButton from "@mui/material/Button";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import employeeService from "@/services/employee/employee.service";

type DeleteButtonProps = {
  employeeId: string;
};

export default function DeleteButton({ employeeId }: DeleteButtonProps) {
  return (
    <MUIButton
      color="error"
      variant="outlined"
      startIcon={<DeleteOutlinedIcon />}
      onClick={async () => {
        await employeeService.remove(employeeId);
      }}
    >
      Excluir
    </MUIButton>
  );
}
