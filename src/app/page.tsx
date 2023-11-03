"use client";
import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import Stack from "@mui/material/Stack";
import MUIButton from "@mui/material/Button";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import Link from "next/link";
import DeleteButton from "@/components/molecules/DeleteButton";
import { Employee } from "@/models/Employee";
import employeeService from "@/services/employee/employee.service";
import CircularProgress from "@mui/material/CircularProgress";

export default function HomePage() {
  const [employees, setEmployees] = React.useState<Employee[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const getData = async () => {
      const data: Employee[] = await employeeService.findAll();
      // if (data.length > 0) {
      //   setEmployees(data);
      // }
      setLoading(false);
    };

    getData().catch(console.error);
  }, [employees]);

  return (
    <Fragment>
      <Stack
        alignItems="center"
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        sx={{ marginBottom: "1rem" }}
      >
        <Typography variant="h5">Cadastro de Funcionários</Typography>
        {employees && employees.length > 0 && (
          <Typography variant="body1">
            Número de Registros: {employees.length}
          </Typography>
        )}

        <MUIButton
          variant="text"
          startIcon={<AddBoxOutlinedIcon />}
          size="large"
          LinkComponent={Link}
          href="criar"
        >
          Novo
        </MUIButton>
      </Stack>

      {loading ? (
        <CircularProgress />
      ) : employees && employees.length === 0 ? (
        <Typography variant="body1">Nenhum registro encontrado.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell>Idade</TableCell>
                <TableCell>Cargo</TableCell>
                <TableCell align="right">Opções</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.cpf}</TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.position}</TableCell>
                  <TableCell align="right">
                    <Stack
                      spacing={1}
                      direction={{ xs: "column", md: "row" }}
                      justifyContent="flex-end"
                    >
                      <MUIButton
                        color="secondary"
                        variant="outlined"
                        startIcon={<EditNoteOutlinedIcon />}
                        LinkComponent={Link}
                        href={`editar/${row.id}`}
                      >
                        Editar
                      </MUIButton>
                      <DeleteButton employeeId={row.id} />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Fragment>
  );
}
