import { Badge, Box, Button, Container, Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import { Header } from "../components"; 
import { BootstrapButton, CssTextField } from "../utils";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import styled from "@emotion/styled";
import LocationOnIcon from '@mui/icons-material/LocationOn';
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    border: `2px solid #red`,
    padding: '0 4px',
    backgroundColor: 'rgb(254, 146, 146)',
    color: 'white'
  },
}));

export default function Home() {
 
  const handleMouseDown =(event)=>{
    event.preventDefault();
  }
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Box sx={{ padding: "24px" }}>
          <Grid container spacing={2}>
          <Grid item xs={10}>
          <CssTextField
              fullWidth
              sx={{height: '30px', paddingRight: 0}}
              size="small"
              placeholder="Tên tổ chức / Mạnh thường quân"
              InputProps={{
                endAdornment: (
                  <InputAdornment 
                  position="start" ><IconButton sx={{background: '#fff'}}><SearchIcon onMouseDown={handleMouseDown}  /></IconButton> </InputAdornment>
                ),
              }}
            />
          </Grid>
            <Grid item xs={2}>
            <BootstrapButton variant="contained" sx={{background: 'white', minWidth: 0, width: '50px', marginTop: 0}}>
                <StyledBadge badgeContent={20} color="success">
                        <FilterAltIcon sx={{color: 'black'}} />
                      </StyledBadge>
              </BootstrapButton>
              <BootstrapButton variant="contained" sx={{background: 'white', minWidth: 0, width: '50px', marginLeft: '10px', marginTop: 0}}>
                <StyledBadge badgeContent={20} color="success">
                        <LocationOnIcon sx={{color: 'black'}} />
                      </StyledBadge>
              </BootstrapButton>
            </Grid>
          
          </Grid>
          <Box sx={{display: 'flex', gap: '10px'}}>
          <BootstrapButton variant="contained" sx={{ margin: "0", width: 'fit-content', lineHeight: '16px', background: 'white', color: 'black' }} size="small">1</BootstrapButton>
          <BootstrapButton variant="contained" sx={{ margin: "0", width: 'fit-content', lineHeight: '16px', background: 'white', color: 'black' }} size="small">2</BootstrapButton>
        </Box>  
        </Box>
   
      </Container>
    </>
  );
}
