import {
    Alert,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Snackbar,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import { BootstrapButton, CssTextField, KindOfAccount } from "../../utils";
import { useFormik } from "formik";
import * as yup from "yup";
import { registerAccount } from "../../features/users/userAPI";
import { useRouter } from "next/router";

const listType = [
  {
    id: 1,
    key: "1",
    text: "Cá nhân",
    color: "rgb(118, 221, 120)",
  },
  {
    id: 2,
    key: "2",
    text: "Tổ chức",
    color: "rgb(92, 180, 233)",
  },
  {
    id: 3,
    key: "3",
    text: "Mạnh thường quân",
    color: "orange",
  },
];
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;



export default function Register() {
  const router = useRouter()
  const [type, setType] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [isActiveDrawer, setIsActiveDrawer] = useState({
    account: false,
    rule: false,
    policy: false,
  });
  const handleClickType = (e) => {
    setType(e.target.value * 1);
  };
  const handleClickRule = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsActiveDrawer({ ...isActiveDrawer, [anchor]: open });
  }; 
  const handleSnackbar = ()=>{
    setOpenSnackbar(false)
  }
  let listValidation = {
    email: yup
      .string("Email is required")
      .email("Email không đúng định dạng")
      .required("Email là bắt buộc"),
  
    password: yup
      .string("Password is required")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .max(12, "Mật khẩu có độ dài tối đa 12 ký tự")
      .required("Mật khẩu là bắt buộc"),
  
    confirm_password: yup
      .string("Confirm Password is required")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .max(12, "Mật khẩu có độ dài tối đa 12 ký tự")
      .required("Xác nhận mật khẩu là bắt buộc")
      .oneOf([yup.ref("password")], "Mật khẩu không trùng nhau"),
  
    name: yup
      .string("Full name is required")
      .required("Họ và tên là bắt buộc"), 
  
    phone: yup
      .string("")
      .matches(phoneRegExp, {
        message: "Số điện thoại không đúng định dạng",
        excludeEmptyString: false,
      })
      .required("Số điện thoại là bắt buộc"),
  }
  if(type === 2){
    listValidation = {
        ...listValidation, 
        organization: yup
        .string("Organization name is required")
        .required("Tên tổ chức là bắt buộc"),
    
        representName: yup
        .string("Authorized person is required")
        .required("Người đại diện là bắt buộc"),
    }
  }

  const validationSchema = yup.object(listValidation);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
      name: "",
      representName: "",
      organization: "",
      phone: "",
      checkbox: false,
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      console.log(values)
        if(values.checkbox === false){
            setOpenSnackbar(true)
            return;
        }else{
          delete values.checkbox;
          delete values.confirm_password;
          registerAccount({...values,type: type}).then(res => {
            router.push('/');
          });
        }

    },
  });
  return (
    <Box>
      <Container
        maxWidth="sm"
        sx={{ padding: "20px", height: "calc(100vh - 120px)" }}
      >
        <Box>
          <Link href="/">
            <Typography
              sx={{
                textDecoration: "underline",
                fontSize: "15px",
                display: "block",
                cursor: "pointer",
              }}
              variant="string"
            >
              Trang chủ
            </Typography>
          </Link>
          <Typography sx={{ fontSize: "20px", marginTop: "10px" }}>
            Bạn là
          </Typography>
          <Box sx={{ marginBottom: "10px" }}>
            {listType.map((e) => {
              return (
                <Button
                  key={e.key}
                  value={e.id}
                  size="small"
                  onClick={handleClickType}
                  className={"register-button"}
                  style={
                    type === e.id
                      ? {
                          backgroundColor: e.color,
                          color: "white",
                          boxShadow:
                            "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
                        }
                      : {}
                  }
                >
                  {e.text}
                </Button>
              );
            })}
          </Box>
          <React.Fragment key={"account"}>
            <Typography
              className="register-link"
              onClick={handleClickRule("account", true)}
            >
              Tìm hiểu các loại tài khoản đăng ký
            </Typography>
            <KindOfAccount
              type={"account"}
              isActiveDrawer={isActiveDrawer}
              handleClickRule={handleClickRule}
            />
          </React.Fragment>

          <Box sx={{ marginTop: "20px" }} className="register-form">
            <form onSubmit={formik.handleSubmit}>
              <CssTextField
                fullWidth
                id="phone"
                label="Số điện thoại đăng nhập *"
                size="small"
                name="phone"
                variant="outlined"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                title=''
                autofill-information=''
                autofill-prediction=''
              />
              <CssTextField
                fullWidth
                id="password"
                size="small"
                name="password"
                label="Mật khẩu *"
                type="password"
                variant="outlined"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <CssTextField
                fullWidth
                id="confirm_password"
                label="Xác nhận mật khẩu *"
                size="small"
                name="confirm_password"
                type="password"
                variant="outlined"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirm_password &&
                  Boolean(formik.errors.confirm_password)
                }
                helperText={
                  formik.touched.confirm_password &&
                  formik.errors.confirm_password
                }
              />
              {type !== 2 ? (
                <CssTextField
                  fullWidth
                  label="Họ và tên *"
                  id="name"
                  size="small"
                  name="name"
                  variant="outlined"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.name && Boolean(formik.errors.name)
                  }
                  helperText={formik.touched.name && formik.errors.name}
                />
              ) : (
                <>
                  <CssTextField
                    fullWidth
                    id='organization'
                    label="Tên tổ chức *"
                    size="small"
                    name="organization"
                    variant="outlined"
                    value={formik.values.organization}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.organization &&
                      Boolean(formik.errors.organization)
                    }
                    helperText={
                      formik.touched.organization &&
                      formik.errors.organization
                    }
                  />
                  <CssTextField
                    fullWidth
                    label="Người đại diện *"
                    id='representName'
                    size="small"
                    name="representName"
                    variant="outlined"
                    value={formik.values.representName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.representName &&
                      Boolean(formik.errors.representName)
                    }
                    helperText={
                      formik.touched.representName &&
                      formik.errors.representName
                    }
                  />
                </>
              )}
              <CssTextField
                fullWidth
                id="email"
                name="email"
                size="small"
                label="Email *"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <FormControlLabel
                id="checkbox"
                name="checkbox" 
                control={<Checkbox value={formik.values.checkbox}/>}
                onChange={formik.handleChange}
                label={
                  <Typography>
                    Tôi đồng ý với{" "}
                    <span className="register-link">
                      Điều khoản chương trình
                    </span>
                    {" & "}
                    <span className="register-link">
                      Chính sách dữ liệu
                    </span>{" "}
                    của hệ thống.
                  </Typography>
                }
              />

              <BootstrapButton
                color="primary"
                sx={{
                  marginTop: "20px",
                  textTransform: "none",
                }}
                variant="contained"
                fullWidth
                type="submit"
              >
                Xác nhận thông tin
              </BootstrapButton>
            </form>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleSnackbar} 
                key={'top' + 'center'}
            >
                <Alert severity="warning">Bạn cần đồng ý với Điều khoản chương trình và Chính sách dữ liệu để tạo tài khoản</Alert>
            </Snackbar>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
