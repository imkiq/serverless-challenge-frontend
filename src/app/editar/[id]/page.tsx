"use client";
import React, { Fragment } from "react";
import { Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveButton from "@/components/molecules/SaveButton";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { CreateEmployeeDto } from "@/models/dto/create-employee.dto";
import Link from "next/link";
import MUIButton from "@mui/material/Button";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import employeeService from "@/services/employee/employee.service";
import { useRouter } from "next/navigation";
import { Employee } from "@/models/Employee";
import CircularProgress from "@mui/material/CircularProgress";
import { UpdateEmployeeDto } from "@/models/dto/update-employee.dto";

export default function EditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateEmployeeDto>();

  const onSubmit: SubmitHandler<UpdateEmployeeDto> = async (data) => {
    try {
      await employeeService.update(params.id, data);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };

  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const getData = async () => {
      const data: Employee = await employeeService.findOne(params.id);

      setValue("name", data.name);
      setValue("cpf", data.cpf);
      setValue("age", data.age);
      setValue("position", data.position);

      setLoading(false);
    };

    getData().catch(console.error);
  }, [setValue, params.id]);

  return (
    <Fragment>
      <Stack
        alignItems="center"
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        sx={{ marginBottom: "1rem" }}
      >
        <Typography variant="h5">Editar Funcionário</Typography>

        <Typography variant="body1">{params.id}</Typography>

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

      {loading ? (
        <CircularProgress />
      ) : (
        <Stack spacing={3} direction={{ xs: "column", md: "row" }}>
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
      )}
    </Fragment>
  );
}
