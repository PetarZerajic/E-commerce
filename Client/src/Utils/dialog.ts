import { Dialog } from "@mui/material";
import { styled } from "@mui/material/styles";

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    minWidth: "500px",
    height: "300px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
