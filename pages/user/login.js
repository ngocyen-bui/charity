import { TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import Link from "next/link";
import * as yup from "yup";
import { useFormik } from "formik";
import { useRouter } from 'next/router'
import { BootstrapButton } from "../../utils";
import { loginAccount } from "../../features/users/userAPI";
import { getCookies, setCookie } from "cookies-next";
import { Message } from "../../components/Message";
import { useState } from "react";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = yup.object({
  phone: yup
    .string("Số điện thoại là bắt buộc")
    .matches(phoneRegExp, {
      message: "Số điện thoại không đúng định dạng",
      excludeEmptyString: false,
    })
    .required("Số điện thoại là bắt buộc"),
  password: yup
    .string("Enter your password")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .required("Mật khẩu là bắt buộc"),
});
export default function Login() {
  const infoUserString = getCookies('auth');
  const router = useRouter();
  const [stateLogin, setStateLogin] = useState(false);
  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        loginAccount(values).then(res => {
          const data = res?.data?.data || {}
          const auth = {
            id: data?.id,
            images: data?.images,
            memberVerify: data?.memberVerify,
            name: data?.name,
            totalBeingFollowed: data?.totalBeingFollowed,
            type: data?.type
          }
          setCookie('token', data?.token);
          setCookie('auth', JSON.stringify(auth));
          router.push('/')
        }).catch(err => { setStateLogin(true)});
    },
  }); 
  const handleCloseMessage = ()=>{
    setStateLogin(false)
  }
  if (Object.values(infoUserString)?.length  > 0) {
    router.push('/')
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{ padding: "20px", height: "calc(100vh - 100px)" }}
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
          <Box sx={{ marginTop: "20px" }}>
            <img
              style={{ width: "100%" }}
              src="../../login.png"
              alt="imgLogin"
              className="img-login"
            ></img>
          </Box>
          <Typography
            align="center"
            sx={{
              fontSize: "14px",
              marginTop: "10px",
              fontWeight: 400,
              color: "red",
              display: "block",
            }}
            variant="string"
          >
            Hành trình của những điều bình thường trở thành phi thường
          </Typography>
          <Box sx={{ marginTop: "20px" }}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Số điện thoại"
                className="field-login"
                variant="filled"
                title="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
              <TextField
                fullWidth
                className="field-login"
                sx={{
                  marginTop: "20px",
                }}
                id="password"
                name="password"
                label="Mật khẩu"
                title="password"
                type="password"
                variant="filled"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <BootstrapButton
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Đăng nhập
              </BootstrapButton>
            </form>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
              marginTop: "2px",
            }}
          >
            <Link href="/user/register">
              <u style={{ cursor: "pointer" }}>Đăng ký tài khoản</u>
            </Link>
            <u style={{ cursor: "pointer" }}>Quên mật khẩu?</u>
          </Box>
        </Box>
      </Container>
      <Box
        sx={{
          height: "100px",
          alignItems: "center",
          display: "flex",
          alignItems: "end",
          paddingBottom: "10px",
        }}
      >
        <Typography sx={{ fontSize: "14px" }}>
          Kết nối yêu thương @2022
        </Typography>
      </Box>
        <Message state={stateLogin} handleCloseMessage={handleCloseMessage} message={'Số điện thoại hoặc mật khẩu không đúng!'} type={'error'} />
    </Box>
  );
}
