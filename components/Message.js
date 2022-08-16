import { Alert, Snackbar } from "@mui/material"


export {Message}

const Message = (state, message, type='info',handleCloseMessage) =>{
    return  <Snackbar
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
    open={state}
    onClose={handleCloseMessage}
    autoHideDuration={2000}
    key={"Upload image"}
  >
    <Alert onClose={handleCloseMessage} severity={type}>
      {message}
    </Alert>
  </Snackbar>
}