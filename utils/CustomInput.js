import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
export {CssTextField}


const CssTextField = styled(TextField)({
    marginBottom: "10px",
    "& .MuiFormHelperText-contained ": {
      "&.Mui-error": {
        color: "red",
      },
    },
    "& label.Mui-focused": {
      color: "#FE9292",
    },
    "& label.Mui-error": {
      color: "rgba(0, 0, 0, 0.6)",
    },
    "& .MuiOutlinedInput-root:after": {
      borderBottomColor: "#FE9292",
    },
    "& .MuiOutlinedInput-root": {
      backgroundColor: "#fff",
      "&.Mui-focused": {
        borderColor: "#FE9292 !important",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#FE9292",
        },
      },
      "&.Mui-error": {
        borderColor: "green !important",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "rgba(0, 0, 0, 0.6)",
        },
      },
      "&:focus": {
        color: "#FE9292",
        backgroundColor: "#fff",
      }
    },
  });