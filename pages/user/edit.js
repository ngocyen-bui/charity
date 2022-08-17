import { Box, Container, Grid, InputAdornment, Typography } from "@mui/material";
import { Header } from "../../components/Header";
import * as yup from "yup";
import { useFormik } from "formik";
import { BootstrapButton, CssTextField, CustomSelect } from "../../utils";

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from "react";
import { BackText, Footer } from "../../components";
import { getDetailUser, updateDetailUser } from "../../features/users/userAPI";
import { getCookie } from "cookies-next";
import { gender, listTypeAccount, organization, persional, sponsor } from "../../common/user";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Message } from "../../components/Message";


const urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
export default function EditUser() {
  const [listData,setListData] = useState({});
  const infoUser = getCookie('auth')? JSON.parse(getCookie('auth')): {};
  const { data: infoUsers } = useQuery(["user", infoUser?.id],() => getDetailUser(infoUser?.id), {
    enabled: Boolean(infoUser?.id),
  });
  const typeAccount = listTypeAccount?.find(e => e.type === infoUser?.type);

  const isOrganization = typeAccount?.type === organization?.type;
  const isSponsor = typeAccount?.type === sponsor?.type;
  const isPersional = typeAccount?.type === persional?.type;

  
  const [message, setMessage] = useState({
    message: 'Cập nhật thông tin thành công! ',
    type: 'success',
    time: 2000,
    state: false
  })
  useEffect(()=>{
    setListData(infoUsers?.data?.data);
  },[infoUsers])
  const mutation = useMutation(updateDetailUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('user');
    },
  });
  const handleCloseMessage = ()=>{
    setMessage({...message,state: false})
  }
  let initField = {
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
    .string(),
    facebook: yup
    .string('Link facebook')
    .matches(urlRegex, {
      message: "Link không đúng định dạng",
      excludeEmptyString: false,
    }),
    website: yup
    .string('Link website')
    .matches(urlRegex, {
      message: "Link không đúng định dạng",
      excludeEmptyString: false,
    })
}
  const fieldOrganiztion = {
    representName: yup
    .string()
    .required("Tên người đại diện là bắt buộc"),
    totalMembers: yup.number()
    .min(0,'Số lượng thành viên phải lớn hơn 0')
    .required("Số lượng thành viên là bắt buộc")
  }
  if(isOrganization){
    initField = {...initField, ...fieldOrganiztion}
  }
  const validationSchema = yup.object({...initField});

   
  const formik = useFormik({
    initialValues: {
      name: listData?.name || "",
      facebook: listData?.websites?.facebook || "",
      address: listData?.address || "",
      email: listData?.email || "",
      website: listData?.websites?.website || "",
      description: listData?.description||"",
      birthday: listData?.birthday|| "",
      gender: listData?.gender || '',
      representName: listData?.representName || undefined,
      totalMembers: listData?.totalMembers || undefined
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
      mutation.mutate({ data: JSON.parse(JSON.stringify(data)) });
      setMessage({...message,state: true})
    },
    
  });

  if(infoUser?.id && listData) return (
    <>
      <Header isShowSubBar={false} />
      <Container maxWidth="md">
        <Box sx={{ padding: "24px" }}>
          <BackText />
          <Typography variant="h6">Cập nhật thông tin</Typography>
          <Box sx={{ marginTop: "24px" }}>
            <form onSubmit={formik.handleSubmit}>
              {(isPersional || isSponsor) && 
              <CssTextField
                fullWidth
                id="name"
                name="name"
                label="Họ và tên *"
                variant="outlined"
                size="small"
                value={formik.values.name}
                disabled
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />}
              {isOrganization && <>
                <CssTextField
                fullWidth
                id="name"
                name="name"
                label="Tên tô chức *"
                variant="outlined"
                size="small"
                value={formik.values.name}
                disabled
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <CssTextField
                fullWidth
                id="representName"
                name="representName"
                label="Người đại diện *"
                variant="outlined"
                size="small"
                value={formik.values.representName}
                onChange={formik.handleChange}
                error={formik.touched.representName && Boolean(formik.errors.representName)}
                helperText={formik.touched.representName && formik.errors.representName}
              />
              <CssTextField
                fullWidth
                id="totalMembers"
                name="totalMembers"
                label="Số lượng thành viên *"
                variant="outlined"
                size="small"
                type="number"
                value={formik.values.totalMembers}
                onChange={formik.handleChange}
                error={formik.touched.totalMembers && Boolean(formik.errors.totalMembers)}
                helperText={formik.touched.totalMembers && formik.errors.totalMembers}
              />
              </>}
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
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {formik.values.description.trim().length}/250 ký tự
                    </InputAdornment>
                  ),
                }}
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
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />

              <CssTextField
                fullWidth
                id="email"
                name="email"
                label="Email *"
                type="email"
                size="small"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
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
                error={
                  formik.touched.facebook && Boolean(formik.errors.facebook)
                }
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
              {(isPersional || isSponsor) && 
              <Grid container spacing={2}>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    id="birthday"
                    name="birthday"
                    label="Ngày sinh"
                    inputFormat="MM/dd/yyyy"
                    value={formik.values.birthday}
                    onChange={(value) => {
                      formik.setFieldValue("birthday", Date.parse(value));
                    }}
                    renderInput={(params) => {
                      return (
                        <CssTextField fullWidth  size="small" {...params} />
                      )
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <CustomSelect
                  id="gender"
                  name="gender"
                  label="Giới tính"
                  type='gender'
                  formik={formik}
                  data={gender}
                  SelectProps={{ multiple: false }}
                />
              </Grid>
            </Grid>}
              <BootstrapButton
                sx={{ backgroundColor: "#f19e9e" }}
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
      <Message {...message  } handleCloseMessage={handleCloseMessage}></Message>
      <Footer />
    </>
  ); 
    return <div>Loading...</div>
}
