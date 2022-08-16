import { Alert, Snackbar } from "@mui/material"
import { useState } from "react"


export {Message}

const Message = ({state=false, message="",handleCloseMessage, type='info', time=2000}) =>{
     
    return (
        <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={state}
        onClose={handleCloseMessage}
        autoHideDuration={time}
        key={message}
      >
        <Alert onClose={handleCloseMessage} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    )
}