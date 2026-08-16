import { Alert, Box, IconButton, Modal, Snackbar, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import RegistrationForm from "../../components/Register/Register";
import { useLocation } from "react-router-dom";
import LoginForm from "../../components/Login/Login";
import { useDispatch, useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  p: 4,
};

const Auth = ({ open, handleClose }) => {
  const location = useLocation();
  const { auth } = useSelector((store) => store);
  const [openSnackBar,setOpenSnackBar]=useState(false);

useEffect(()=>{
if(auth.success || auth.error)setOpenSnackBar(true)
},[auth.success, auth.error])

const handleCloseSnackBar=()=>{
  setOpenSnackBar(false)
}

  return (
    <>
      <Modal
        open={
          location.pathname === "/account/register" ||
          location.pathname === "/account/login"
        }
        onClose={handleClose}
      >
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>
          {location.pathname === "/account/register" ? (
            <RegistrationForm />
          ) : (
            <LoginForm />
          )}
          <div className="flex justify-center mt-5">
            <Snackbar
              sx={{ zIndex: 50 }}
              open={openSnackBar}
              autoHideDuration={3000}
              onClose={handleCloseSnackBar}
              // handleClose={handleCloseSnackBar}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert severity={auth.error?"error":"success"} sx={{ width: "100%" }}>
                {auth.success || auth.error}
              </Alert>
            </Snackbar>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Auth;
