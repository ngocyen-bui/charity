import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
export {BootstrapButton}

const BootstrapButton = styled(Button)({
    backgroundColor: '#64B5EC', 
    marginTop: '10px',
    padding: '8px 15px',
    marginTop: '20px',
    borderRadius: '10px',
    marginBottom: '5px',
    width: '100%', 
    '&:hover': {
    webkitTextDecoration: 'none',
    textDecoration: 'none',
    backgroundColor: '#f17171',
    outline: 'none',
    boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
    
    },
    '&:active': {
      boxShadow: '0px 4px 4px #000',
      backgroundColor: '#f17171',
      outline: 'none',
      borderColor: '#005cbf',
    },
    '&:focus': {
        outline: 'none',
        boxShadow: "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
    },
  });