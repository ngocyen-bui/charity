import { Alert, Box, CardContent, DialogTitle, Grid, IconButton, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { linkImage, upload } from "../features/Image";
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from "next/image";

import CloseIcon from '@mui/icons-material/Close';

import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
export { UploadImage };
const UploadImage = ({src,setSrc}) => {

  const [openModal,setOpenModal] = useState(false)
  const [actionImage, setActionImage] = useState(false);
  const [state, setState] = React.useState({
    open: false,
    text: 'Upload success',
    type: 'success'
  });
  const handleCloseModal = ()=>{
    setOpenModal(false)
  }
  const handleUploadClick = (event) => {
    var file = event.target.files[0];

    // upload
    upload(file).then(res => {
      if (res) setState({ ...state, open: true });
      setSrc(res?.id)
    }).catch(err => setState({ ...state, open: false, text: 'Upload failed', type: 'error' }))
  };

  const handleClose = () => {
    setState({...state, open: false});
  };
  const showActionImage = ()=>{
    if(src) setActionImage(!actionImage)
  }
  const handleRemoveImage =()=>{
    if(src) setSrc()
    setActionImage(false)
  }
  const handleOpenModalImage = ()=>{
    if(src) setOpenModal(true)
  }
  return (
    <>
      <CardContent sx={{ padding: "0 !important", position: "relative" }}>
        {src ? (
          <img src={linkImage(src)} style={{ width: "100px", height: "100px", objectFit: 'cover', backgroundColor: 'white', border: '1px solid #ddd' }} onClick={showActionImage}></img>
        ) : (
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ textAlign: "center" }} 
          >
            <input
              accept="image/*"
              id="contained-button-file"
              style={{ display: "none" }}
              multiple
              type="file"
              onChange={handleUploadClick}
            />
            <label htmlFor="contained-button-file" >
              <Typography
                style={{
                  borderRadius: "4px",
                  fontSize: "24px",
                  background: "#fff",
                  width: "100px",
                  color: "rgb(253, 135, 135)",
                  lineHeight: "100px",
                  boxShadow: "3px 3px 3px #ddd",
                  border: "1px solid #ddd",
                  cursor: "pointer",
                }}
              >
                +
              </Typography>
            </label>
          </Grid>
        )}
        {actionImage && <Box
          sx={{
            height: "20px",
            width: "100px",
            alignItems: "center",
            position: "absolute",
            bottom: "0px",
            display: "flex",
            justifyContent: "center",
            gap: "6px",
            background: "#ddd",
          }}
        >
          <VisibilityIcon sx={{ cursor: "pointer", width: "18px" }} onClick={handleOpenModalImage} />
          <label style={{ height: "24px" }} htmlFor="upload-image-post">
            <input id="upload-image-post" hidden accept="image/*" type="file" onChange={handleUploadClick} />
            <CloudUploadIcon sx={{ cursor: "pointer", width: "18px" }} />
          </label>
          <DeleteIcon sx={{ cursor: "pointer", width: "18px" }} onClick={handleRemoveImage} />
        </Box>}
        
      </CardContent>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={state.open}
        autoHideDuration={2000}
        onClose={handleClose}
        key={"Upload image"}
      >
        <Alert onClose={handleClose} severity={state.type || "info"}>
          {state.text}
        </Alert>
      </Snackbar>

      <BootstrapDialog
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseModal}>
          -
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Image 
            src={src}
            width={450}
            height={450}
            style={{border: '2px solid #ddd'}}
            alt="image"
            > 
            </Image>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};