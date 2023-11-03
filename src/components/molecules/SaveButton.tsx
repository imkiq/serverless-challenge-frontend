"use client";
import MUIButton from "@mui/material/Button";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

type SaveButtonProps = {
  form: string;
};

export default function SaveButton({ form }: SaveButtonProps) {
  return (
    <MUIButton
      color="secondary"
      form={form}
      variant="outlined"
      startIcon={<SaveOutlinedIcon />}
      type="submit"
    >
      Salvar
    </MUIButton>
  );
}
