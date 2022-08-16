import { Alert, Snackbar } from "@mui/material"


export {Message}

const Message = ({state=false, message="", type='info', time=2000, handleCloseMessage}) =>{
    
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