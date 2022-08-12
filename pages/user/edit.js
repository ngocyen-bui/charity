import { Box, Container, InputAdornment, TextField, Typography } from "@mui/material";
import { Header } from "../../components/Header";
import * as yup from "yup";
import { useFormik } from "formik";
import { BootstrapButton, CssTextField, getCookie } from "../../utils";

import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { getDetailUser, updateDetailUser } from "../api/users/userAPI";
import { useEffect, useState } from "react";
import { Footer } from "../../components";

const validationSchema = yup.object({
    email: yup
    .string("Email là bắt buộc")
    .email('Vui lòng nhập email hợp lệ')
    .required("Email là bắt buộc"),
    address: yup
    .string("Địa chỉ là bắt buộc")
    .required("Địa chỉ là bắt buộc"),
    description: yup
    .string("Enter your password")
    .max(250, "Độ dài tối đa là 250 ký tự"),
    name: yup
    .string()
});

export default function EditUser() {
    const [listData,setListData] = useState({});
    const infoUserString =
    getCookie(typeof document !== "undefined" ? document.cookie : "", "auth") || "";
  const infoUser = infoUserString ? JSON.parse(infoUserString) : {};
  const { data: infoUsers } = useQuery(["user", infoUser?.id],() => getDetailUser(infoUser?.id), {
    enabled: Boolean(infoUser?.id),
  });
  useEffect(()=>{
    setListData(infoUsers?.data?.data);
  },[infoUsers])
  const mutation = useMutation(updateDetailUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
    },
  });

  const formik = useFormik({
    initialValues: {
      name: listData?.name || "",
      facebook: listData?.websites?.facebook || "",
      address: listData?.address || "",
      email: listData?.email || "",
      website: listData?.websites?.website || "",
      description: "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        ...values,
        websites: {
            facebook: values?.facebook,
            website: values?.website,
        },
        facebook: undefined,
        website: undefined,
      };
      mutation.mutate({ data: data });
    },
  });

  if(infoUser?.id && listData) return (
    <>
      <Header isShowSubBar={false} />
      <Container maxWidth="md">
        <Box sx={{ padding: "24px" }}>
          <Typography variant="h6">Cập nhật thông tin</Typography>
          <Box sx={{ marginTop: "24px" }}>
            <form onSubmit={formik.handleSubmit}>
            <CssTextField
                fullWidth
                id="name"
                name="name"
                label="Họ và tên *"
                variant="outlined"
                size="small"
                value={listData?.name}
                disabled
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <CssTextField
                fullWidth
                id="description"
                name="description"
                label="Tự giới thiệu (tối đa 250 ký tự)"
                size="small"
                multiline={true}
                rows={3}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
                InputProps={{ endAdornment: <InputAdornment position="end">{(formik.values.description.trim()).length}/250 ký tự</InputAdornment> }}
              />
              <CssTextField
                fullWidth
                id="phone"
                name="phone"
                label="Số điện thoại *"
                size="small"
                disabled
                value={listData?.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />

              <CssTextField
                fullWidth
                id="address"
                name="address"
                label="Địa chỉ *"
                type="address"
                placeholder="Nhập địa chỉ"
                size="small"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={
                  formik.touched.address && Boolean(formik.errors.address)
                }
                helperText={formik.touched.address && formik.errors.address}
              />

              <CssTextField
                fullWidth
                id="email"
                name="email"
                label="Email *"
                type="email"
                size="small" 
                value={formik.values.email|| listData?.email}
                onChange={formik.handleChange}
                error={
                  formik.touched.email && Boolean(formik.errors.email)
                }
                helperText={formik.touched.email && formik.errors.email}
              />

            <CssTextField
                fullWidth
                id="facebook"
                name="facebook"
                label="Đường dẫn (link) tài khoản Facebook"
                size="small"
                value={formik.values.facebook}
                onChange={formik.handleChange}
                error={formik.touched.facebook && Boolean(formik.errors.facebook)}
                helperText={formik.touched.facebook && formik.errors.facebook}
              />
              <CssTextField
                fullWidth
                id="website"
                name="website"
                label="Đường dẫn (link) Website"
                size="small"
                value={formik.values.website}
                onChange={formik.handleChange}
                error={formik.touched.website && Boolean(formik.errors.website)}
                helperText={formik.touched.website && formik.errors.website}
              />

              <BootstrapButton
                sx={{backgroundColor: '#f19e9e'}}
                variant="contained"
                fullWidth
                type="submit"
              >
                Hoàn thành
              </BootstrapButton>
            </form>
          </Box>
        </Box>
      </Container>
      <Footer/>
    </>
  ) 
    return <div>Loading...</div>
}
