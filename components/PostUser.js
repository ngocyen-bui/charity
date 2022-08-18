import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup"; 
import { getDetailUser } from "../features/users/userAPI";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { BootstrapButton, CssTextField, CustomSelect } from "../utils";
import { UploadImage } from "./UploadImage";
import { Accommodation } from "./Accommondation";

export { PostUser };

const required = <span style={{ color: "red" }}>*</span>;

const validationSchema = yup.object({
  title: yup
    .string()
    .max(256, "Tiêu đề  quá giới hạn 256 ký tự")
    .required("Tiêu đề là bắt buôc."),
  content: yup.string().required("Nội dung là bắt buôc."),
  address: yup 
   .string()
});

const PostUser = ({ data }) => { 
  const [isGetInfo, setIsGetInfo] = useState(false);
  const [hadTimeClose, setHadTimeClose] = useState(false);
  const [accommodation, setAccommodation] = useState(false)
  const infoUser = getCookie("auth") ? JSON.parse(getCookie("auth")) : {};
  const { data: infoUsers } = useQuery(
    ["user", infoUser?.id],
    () => getDetailUser(infoUser?.id),
    {
      enabled: isGetInfo,
    }
  );
  const handleCloseAccommodation = ()=>{
    setAccommodation(false)
  }
  const listInfo = infoUsers?.data?.data;
  const handleCheckInfo = (val) => {
    setIsGetInfo(val?.target?.checked);
  };
  const handleHadTimeClosed = (val) => {
    setHadTimeClose(val?.target?.checked);
  };
  const handleFocusAccommodation = ()=>{
    setAccommodation(true)
  }
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      typeOfTransportation: [],
      transportProductType: [],
      name: (isGetInfo && listInfo?.name) || "",
      phone: (isGetInfo && listInfo?.phone) || "",
      email: (isGetInfo && listInfo?.email) || "",
      addressLocation: (isGetInfo && listInfo?.addressLocation) || "",
      gender: "",
      academicLevel: '',
      experience: '',
      career: [],
      jobType: [],
      payForm: [],
      placeType: [],
      categories:[],
      formOfSupport: [],
      quantityRecruit: undefined,
      yearTo: '',
      yearFrom: '',
      address: undefined

    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      try {
        console.log(values);
      } catch (error) {
        console.log(error);
      }
    },
  });
 
  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant="h6" fontSize="large" sx={{ padding: "10px 0" }}>
          Nội dung {required}
        </Typography>
        <Box>
          <CssTextField
            fullWidth
            id="title"
            name="title"
            label="Tiêu đề *"
            size="small"
            multiline
            rows={2}
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          {/* Nếu type là tuyển dụng (id = 7) thì show field số lượng tuyển dụng */}
          {data?.id === 7 && 
            <CssTextField
              fullWidth
              id="quantityRecruit"
              name="quantityRecruit"
              label="Số lượng tuyển dụng"
              size="small"
              type="number"
              value={formik.values.quantityRecruit}
              onChange={formik.handleChange}
              error={formik.touched.quantityRecruit && Boolean(formik.errors.quantityRecruit)}
              helperText={formik.touched.quantityRecruit && formik.errors.quantityRecruit}
            />}
          {data?.fieldExtra?.map((e,i) => {
            return (
              <CustomSelect
                id={e?.type}
                key={i}
                name={e?.type}
                type={e?.type}
                label={e?.text}
                formik={formik}
                data={e?.children}
              />
            );
          })}
          {data?.categoryId === 35 && <Box>
            <CssTextField
            fullWidth
            id="address"
            name="address"
            label="Khu vực chỗ ở *"
            type="address"
            size="small"
            value={formik.values.address}
            onChange={formik.handleChange}
            onClick={handleFocusAccommodation}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
            <CssTextField
            fullWidth
            id="content"
            name="content"
            label="Diện tích *"
            type="content"
            size="small"
            value={formik.values.content}
            onChange={formik.handleChange}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          />
            </Box>}
          <CssTextField
            fullWidth
            id="content"
            name="content"
            label="Nội dung chi tiết *"
            type="content"
            size="small"
            multiline
            rows={6}
            value={formik.values.content}
            onChange={formik.handleChange}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          />
          {/* Nếu type là công việc (25) thì hiển thị */}
          {data?.categoryId === 25 && (
            <>

            <Box>
              <Typography
                variant="h6"
                fontSize="large"
                sx={{ padding: "10px 0" }}
              >
                Thông tin thêm
              </Typography>
            {/* Nếu type là tuyển dụng (id = 7) thì show field số lượng tuyển dụng */}
            {data?.id === 7 && <Grid container spacing={2}>
              <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                fullWidth
                id="yearFrom"
                name="yearFrom"
                label="Năm sinh từ"
                views={['year']}
                maxDate={new Date()}
                value={formik.values.yearFrom}
                error={
                  formik.touched.yearFrom && Boolean(formik.errors.yearFrom)
                }
                helperText={formik.touched.yearFrom && formik.errors.yearFrom}
                inputFormat="yyyy"
                onChange={(value) => {
                  formik.setFieldValue("yearFrom", Date.parse(value));
                }}
                renderInput={(params) => {
                  return <CssTextField fullWidth size="small" {...params} />;
                }}
              />
            </LocalizationProvider>
              </Grid> 
              <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                fullWidth
                id="yearTo"
                name="yearTo"
                label="Năm sinh đến"
                value={formik.values.yearTo}
                minDate={new Date()}
                views={['year']}
                error={
                  formik.touched.yearTo && Boolean(formik.errors.yearTo)
                }
                helperText={formik.touched.yearTo && formik.errors.yearTo}
                inputFormat="yyyy"
                onChange={(value) => {
                  formik.setFieldValue("yearTo", Date.parse(value));
                }}
                renderInput={(params) => {
                  return <CssTextField fullWidth size="small" {...params} />;
                }}
              />
            </LocalizationProvider>
              </Grid> 
            </Grid>}
            {data?.id === 11 && <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                fullWidth
                id="birthYear"
                name="birthYear"
                label="Năm sinh"
                views={['year']}
                value={formik.values.birthYear}
                error={
                  formik.touched.birthYear && Boolean(formik.errors.birthYear)
                }
                helperText={formik.touched.birthYear && formik.errors.birthYear}
                inputFormat="yyyy"
                onChange={(value) => {
                  formik.setFieldValue("birthYear", Date.parse(value));
                }}
                renderInput={(params) => {
                  return <CssTextField fullWidth size="small" {...params} />;
                }}
              />
            </LocalizationProvider>
            }
              {data?.moreInfomation?.map((e,i) => (
                <CustomSelect
                  key={i}
                  id={e?.type}
                  name={e?.type}
                  type={e?.type}
                  label={e?.text}
                  formik={formik}
                  data={e?.children} 
                  SelectProps={{ 
                    multiple: false
                  }}
                />
              ))}
            </Box>
            </>
          )}

          <Typography
            variant="body1"
            fontSize="medium"
            sx={{ padding: "10px 0", fontSize: "15px" }}
          >
            Tải ảnh lên (Tối đa một ảnh) {required}
          </Typography>
          <UploadImage name="" />
        </Box>
        <Box>
          <Typography variant="h6" fontSize="large" sx={{ padding: "10px 0" }}>
            Thông tin liên hệ {required}
          </Typography>
          <Typography
            variant="body2"
            fontSize="medium"
            sx={{ padding: "4px 0", fontSize: "15px" }}
          >
            Để hoạt động từ thiện được minh bạch, chúng tôi sẽ công khai thông
            tin liên hệ của bạn.
          </Typography>
          <Typography
            variant="body2"
            fontSize="medium"
            sx={{ padding: "4px 0", fontSize: "15px" }}
          >
            Nếu bạn muốn dùng thông tin cá nhân để đăng ký, vui lòng nhấn chọn{" "}
            <b>Thông tin đã đăng ký.</b>
          </Typography>
          <FormControlLabel
            onChange={handleCheckInfo}
            sx={{ fontSize: "18px" }}
            control={<Checkbox />}
            label="Dùng thông tin đã đăng ký"
          />
          <CssTextField
            fullWidth
            id="name"
            name="name"
            label="Tên người liên hệ *"
            type="name"
            size="small"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <CssTextField
            fullWidth
            id="addressLocation"
            name="addressLocation"
            label="Địa chỉ *"
            type="addressLocation"
            size="small"
            value={formik.values.addressLocation}
            onChange={formik.handleChange}
            error={formik.touched.addressLocation && Boolean(formik.errors.addressLocation)}
            helperText={formik.touched.addressLocation && formik.errors.addressLocation}
          />
          <CssTextField
            fullWidth
            id="phone"
            name="phone"
            label="Điện thoại liên hệ *"
            type="phone"
            size="small"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <CssTextField
            fullWidth
            id="email"
            name="email"
            label="Email liên hệ"
            type="email"
            size="small"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          {data?.type === 3 && (
            <>
              {/* <Typography variant="body2" fontSize="medium" sx={{ padding: "4px 0", fontSize: '15px' }}>
            Chúng tôi cho phép bạn giới hạn thời gian hiển thị tin. Tin quá thời hạn (tối đa 30 ngày) sẽ được tự động gỡ bỏ trên thông tin cộng đồng.
          </Typography> */}
            </>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
            }}
          >
            <Typography variant="body2" fontSize="medium">
              Nếu bạn muốn tìm tình nguyện viên hoặc mạnh thường quân giúp đỡ,
              vui lòng chọn <b>Yêu cầu hỗ trợ</b>
            </Typography>
            <FormControlLabel
              control={<Checkbox />}
              sx={{ width: "fit-content" }}
              label="Yêu cầu hỗ trợ"
            />
          </Box>
          <FormControlLabel
            control={<Checkbox />}
            onClick={handleHadTimeClosed}
            sx={{ width: "fit-content" }}
            label="Chọn thời hạn hiển thị tin"
          />
          <Typography
            variant="body2"
            fontSize="small"
            sx={{ marginBottom: "16px" }}
          >
            (Bỏ qua nếu bạn muốn hiển thị tin vĩnh viễn)
          </Typography>

          {hadTimeClose && (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                fullWidth
                id="closedAt"
                name="closedAt"
                label="Ngày ngưng hiển thị tin"
                value={formik.values.closedAt}
                error={
                  formik.touched.closedAt && Boolean(formik.errors.closedAt)
                }
                helperText={formik.touched.closedAt && formik.errors.closedAt}
                inputFormat="dd/MM/yyyy"
                onChange={(value) => {
                  formik.setFieldValue("closedAt", Date.parse(value));
                }}
                renderInput={(params) => {
                  return <CssTextField fullWidth size="small" {...params} />;
                }}
              />
            </LocalizationProvider>
          )}
        </Box>
        <BootstrapButton
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Đăng tin
        </BootstrapButton>
      </form>
      <Accommodation open={accommodation} handleClose={handleCloseAccommodation} formik={formik}/>
    </Box>
  );
};
