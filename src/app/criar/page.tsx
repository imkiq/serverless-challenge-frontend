"use client";
import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SaveButton from "@/components/molecules/SaveButton";
import employeeService from "@/services/employee/employee.service";
import { CreateEmployeeDto } from "@/models/dto/create-employee.dto";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MUIButton from "@mui/material/Button";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

export default function CreatePage() {
  const router = useRouter();
  const { control, handleSubmit } = useForm<CreateEmployeeDto>();

  const onSubmit: SubmitHandler<CreateEmployeeDto> = async (data) => {
    try {
      await employeeService.create(data);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <Stack
        alignItems="center"
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        sx={{ marginBottom: "1rem" }}
      >
        <Typography variant="h5">Cadastro de Funcionários</Typography>

        <MUIButton
          variant="text"
          startIcon={<ArrowBackOutlinedIcon />}
          LinkComponent={Link}
          href="/"
          size="large"
        >
          Voltar
        </MUIButton>
      </Stack>

      <Stack
        spacing={3}
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
      >
        <form id="employee-form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} direction={{ xs: "column", md: "row" }}>
            <Controller
              defaultValue=""
              name="name"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <TextField
                    label="Nome completo"
                    variant="outlined"
                    onChange={onChange}
                    value={value}
                  />
                );
              }}
            />

            <Controller
              defaultValue=""
              name="cpf"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <TextField
                    label="CPF"
                    variant="outlined"
                    onChange={onChange}
                    value={value}
                  />
                );
              }}
            />

            <Controller
              defaultValue=""
              name="age"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <TextField
                    label="Idade"
                    variant="outlined"
                    onChange={onChange}
                    value={value}
                  />
                );
              }}
            />

            <Controller
              defaultValue=""
              name="position"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <TextField
                    label="Cargo"
                    variant="outlined"
                    onChange={onChange}
                    value={value}
                  />
                );
              }}
            />
          </Stack>
        </form>
        <SaveButton form="employee-form" />
      </Stack>
    </Fragment>
  );
}
