import { Avatar, Box, Button, Chip, Grid, IconButton, Paper, Slide, Stack, Typography } from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export {RenderTabPanel}
const RenderTabPanel = ({ typePost }) => {
 
    return (
      <TabPanel value={typePost} index={typePost}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center", 
          }}
        >
          {typePost===1 ? ( 
              <Grid container spacing={1}>
                <Grid item xs={6}> 
                  <Paper className="animate__animated animate__backInUp"  variant="outlined" sx={{padding: '24px'}}>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                      <Box  sx={{display: 'flex', gap: '10px'}}>
                      <Avatar alt="Avatar" sx={{ width: 56, height: 56 }}>
                        H
                      </Avatar>
                      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                        <Typography variant="body2" sx={{textTransform: 'uppercase'}} >Name</Typography>
                        <Stack direction="row" spacing={1}>
                          <Chip size="small" label="primary" color="primary" />
                          <Chip size="small" label="success" color="success" />
                        </Stack>
                      </Box>
                      </Box>
                      <IconButton sx={{color: 'rgb(254, 146, 146)'}} component="label">
                            <MoreHorizIcon />
                      </IconButton>
                      
                    </Box>
                  </Paper> 
                  
                </Grid>
                 
              </Grid> 
          ) : (
            <Typography variant="h6" component='p' >
              Rất tiếc, chúng tôi không tìm thấy kết quả nào phù hợp {typePost}
            </Typography>
          )}

          <Button
            sx={{
              width: "100%",
              maxWidth: "300px",
              textTransform: "initial",
              marginTop: "12px",
            }}
            variant="contained"
            size="small"
            disabled
          >
            Bạn đã xem đến cuối danh sách
          </Button>
        </Box>
      </TabPanel>
    );
  };


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`post-tabpanel-${index}`}
        aria-labelledby={`post-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  