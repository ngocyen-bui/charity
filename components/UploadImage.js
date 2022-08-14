import { Alert, CardContent, Grid, Snackbar, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { upload } from "../features/Image";

export { UploadImage };
const UploadImage = () => {

  const [src, setSrc] = useState()

  const [state, setState] = React.useState({
    open: false,
    text: 'Upload success',
    type: 'success'
  });

  const handleUploadClick = (event) => {
    var file = event.target.files[0];
    setSrc(URL.createObjectURL(file))

    // upload
    upload(file).then(res => {
      if (res) setState({ ...state, open: true });
    }).catch(err => setState({ ...state, open: false, text: 'Upload failed', type: 'error' }))
  };

  const handleClose = () => {
    setState(false);
  };
  return (
    <React.Fragment>
      <CardContent sx={{ padding: '0 !important' }}>
        {src ? <img src={src} style={{ width: '100px', height: '100px' }}></img> :
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
            <label htmlFor="contained-button-file">
              <Typography
                style={{
                  borderRadius: '4px',
                  fontSize: "24px",
                  background: "#fff",
                  width: "100px",
                  color: "rgb(253, 135, 135)",
                  lineHeight: "100px",
                  boxShadow: "3px 3px 3px #ddd",
                  border: '1px solid #ddd',
                  cursor: 'pointer'
                }}
              >
                +
              </Typography>
            </label>
          </Grid>}
      </CardContent>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={state.open}
        onClose={handleClose}
        key={'Upload image'}
      >
        <Alert onClose={handleClose} severity={state.type} >
          {state.text}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};
