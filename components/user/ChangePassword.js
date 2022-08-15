
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import * as yup from "yup";
import { Alert, Box, Dialog, DialogContent, IconButton, InputAdornment, Snackbar, Typography } from '@mui/material';
import { BootstrapButton, CssTextField } from '../../utils';
import { useState } from 'react';
import { useFormik } from 'formik';



export {RenderFormChangePassword}
const RenderFormChangePassword = ({ isOpen, handleClose }) => {
    const required = <span style={{ color: "red" }}>*</span>;
    const validationSchema = yup.object({
      oldPassword: yup
      .string("Mật khẩu cũ là bắt buộc")
      .required("Mật khẩu cũ là bắt buộc")
      .min(8, 'Mật khẩu tối thiểu 8 ký tự'),
      newPassword: yup
      .string("Mật khẩu là bắt buộc")
      .required("Mật khẩu là bắt buộc")
      .min(8, 'Mật khẩu tối thiểu 8 ký tự'),
      confirmPassword: yup
      .string("Xác nhận mật khẩu là bắt buộc")
      .required("Xác nhận mật khẩu là bắt buộc")
      .oneOf([yup.ref('newPassword'), null], 'Mật khẩu xác nhận không trùng khớp')
      .min(8, 'Mật khẩu tối thiểu 8 ký tự'),
    });
    const [isShow, setIsShow] = useState({
      showOldPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
    }); 
    const [state, setState] = useState({
      open: false,
      text: '',
      type: 'success'
    });
    const handleCloseMessage = ()=>{
      setState({
        ...state,
        open: false
      })
    }
    const handleClickShowPassword = (type) => { 
      setIsShow({
        ...isShow,
        [type]: !isShow[type],
      });
      console.log(isShow)
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  
    const formik = useFormik({
      initialValues: {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        updateNewPassword({
          data: { oldPassword: values.oldPassword, password: values.newPassword },
        })
        .then((res) => {
          setState({
            open: true,
            text: 'Cập nhật mật khẩu thành công',
            type: 'success'
          })
        })
        .catch((err) => {
          setState({
            open: true,
            text: 'Cập nhật mật khẩu thất bại',
            type: 'error'
          })
          });
      },
    });
    return (
      <Dialog open={isOpen} onClose={handleClose}>
        <form  onSubmit={formik.handleSubmit}>
          <DialogContent
            sx={{
              width: "350px",
              display: "flex",
              flexDirection: "column", 
            }}
          >
            <Box>
              <Typography variant="body2" >Mật khẩu hiện tại {required}</Typography>
                <CssTextField
                  margin="dense"
                  id="oldPassword"
                  placeholder="Mật khẩu hiện tại "
                  size="small"
                  type={isShow.showOldPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment:  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle newPassword visibility"
                      onClick={()=>handleClickShowPassword('showOldPassword')}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {!isShow.showOldPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                  }}
                  value={formik.values.oldPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                  helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                />
            </Box>
            <Box>
              <Typography variant="body2" >Mật khẩu mới {required}</Typography>
                <CssTextField
                  margin="dense"
                  id={"newPassword"}
                  placeholder="Mật khẩu mới"
                  type={isShow.showNewPassword ? 'text' : 'password'}
                  size="small"
                  InputProps={{
                    endAdornment:  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle newPassword visibility"
                      onClick={()=>handleClickShowPassword('showNewPassword')}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {!isShow.showNewPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                  }}
                 
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                  helperText={formik.touched.newPassword && formik.errors.newPassword}
                />
            </Box>
            <Box>
              <Typography variant="body2" >Xác nhận mật khẩu mới {required}</Typography>
                <CssTextField  
                  margin="dense"
                  id={"confirmPassword"}
                  placeholder="Xác nhận mật khẩu mới *"
                  type={isShow.showConfirmPassword ? 'text' : 'password'}
                  size="small"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  InputProps={{
                    endAdornment:  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle newPassword visibility"
                      onClick={()=>handleClickShowPassword('showConfirmPassword')}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {!isShow.showConfirmPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                  }}
                />
            </Box>
            <BootstrapButton 
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Đổi mật khẩu
            </BootstrapButton>
          </DialogContent>
        </form>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={state.open}
          autoHideDuration={2000}
          onClose={handleCloseMessage}
          key={'Upload image'}
        >
          <Alert onClose={handleCloseMessage} severity={state.type} >
            {state.text}
          </Alert>
        </Snackbar>
      </Dialog>
    );
  };
  