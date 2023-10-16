import axios from "axios";
import React, { ChangeEvent, useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { toast } from "react-toastify";
import { BootstrapDialog } from "../../Utils/dialog";
import CloseIcon from "@mui/icons-material/Close";
import "./avatarProfile.scss";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Button,
} from "@mui/material";

interface Iprops {
  userId: number;
  token: string;
  username: string;
  setIsUserUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AvatarProfile = ({
  userId,
  token,
  username,
  setIsUserUpdated,
}: Iprops) => {
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files![0];
    if (files) {
      setFile(files);
    }
  };
  const upateUserAvatarId = async (avatarId: number, avatarUrl: string) => {
    const urlImg = `${process.env.REACT_APP_URL}/users/${userId}`;
    try {
      await axios.put(
        urlImg,
        { avatarId, avatarUrl },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      setIsUserUpdated(true);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("File is required*", {
        hideProgressBar: true,
      });
      return;
    }
    const urlImg = `${process.env.REACT_APP_URL}/upload`;
    try {
      const formData = new FormData();
      formData.append("files", file);
      formData.append("name", `${username} avatar`);

      const response = await axios.post(urlImg, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      });
      const {
        data: [{ id, url }],
      } = response;

      upateUserAvatarId(id, url);
      setFile(null);
      handleClose();
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="wrapper">
      <label htmlFor="file">
        <DriveFolderUploadOutlinedIcon />
      </label>
      <input id="file" style={{ display: "none" }} onClick={handleClickOpen} />

      <BootstrapDialog open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }}>Upload Your Image</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <FormControl>
            <input type="file" onChange={handleFileChange} />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ border: "1px solid grey" }}
            onClick={handleSubmit}
            disabled={!file}
          >
            Submit
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};
