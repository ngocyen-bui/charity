import { Box, Checkbox, FormControlLabel, Grid, MenuItem, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { getDetailUser } from "../features/users/userAPI";
import { BootstrapButton, CssTextField, getCookie } from "../utils";
import { UploadImage } from "./UploadImage";

export { PostUser };
const CustomSelectPostUser = ({ data, formik, type, ...rest }) => {
  return (
    <CssTextField
      fullWidth
      {...rest}
      select
      multiple={true}
      size="small"
      value={formik.values[type]}
      SelectProps={{ multiple: true }}
      onChange={formik.handleChange}
      error={
        formik.touched[type] &&
        Boolean(formik.errors[type])
      }
      helperText={
        formik.touched[type] &&
        formik.errors[type]
      }
    >
      {data?.map((e) => {
        return (
          <MenuItem key="2" value={e?.id}>
            {e?.text}
          </MenuItem>
        );
      })}
    </CssTextField>
  );
};
const required = <span style={{ color: "red" }}>*</span>;
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
});

const PostUser = ({ data }) => {

  const [dataUser, setDataUser] = useState({});
  const [isGetInfo, setIsGetInfo] = useState(false)
  const infoUserString =
    getCookie(typeof document !== "undefined" ? document.cookie : "", "auth") ||
    "";
  const infoUser = infoUserString ? JSON.parse(infoUserString) : {};
  const { data: infoUsers } = useQuery(
    ["user", infoUser?.id],
    () => getDetailUser(( infoUser?.id)),
    {
      enabled: isGetInfo,
    }
  );
  console.log(JSON.stringify(infoUsers))
  
  const listInfo = infoUsers?.data?.data;

  const handleCheckInfo = (val) => {
    setIsGetInfo(val?.target?.checked);
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      typeOfTransportation: [],
      transportProductType: [],
      name: dataUser?.name
    },
    enableReinitialize: true,
    // validationSchema: validationSchema,
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
        <Typography variant="h6" fontSize="medium" sx={{ padding: "10px 0" }}>
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
          <CustomSelectPostUser
            id="transportProductType"
            name="transportProductType"
            type="transportProductType"
            label="Loại hình vận chuyển * (Có thể chọn nhiều)"
            formik={formik}
            data={[
              { id: 1, text: "123" },
              { id: 2, text: "345" },
            ]}
          />

          <CustomSelectPostUser
            id="typeOfTransportation"
            name="typeOfTransportation"
            type="typeOfTransportation"
            label="Thông tin hàng hóa * (Có thể chọn nhiều)"
            formik={formik}
            data={[
              { id: 1, text: "123" },
              { id: 2, text: "345" },
            ]}
          />
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
          <Typography variant="body1" fontSize="medium" sx={{ padding: "10px 0", fontSize: '15px' }}>
          Tải ảnh lên (Tối đa một ảnh) {required}
        </Typography>
         <UploadImage/>
        </Box>
        <Box>
        <Typography variant="h6" fontSize="medium" sx={{ padding: "10px 0" }}>
          Thông tin liên hệ {required}
        </Typography>
        <Typography variant="body2" fontSize="medium" sx={{ padding: "4px 0", fontSize: '15px' }}>
          Để hoạt động từ thiện được minh bạch, chúng tôi sẽ công khai thông tin liên hệ của bạn.
        </Typography>
        <Typography variant="body2" fontSize="medium" sx={{ padding: "4px 0", fontSize: '15px' }}>
          Nếu bạn muốn dùng thông tin cá nhân để đăng ký, vui lòng nhấn chọn <b>Thông tin đã đăng ký.</b>
        </Typography>
        <FormControlLabel onChange={handleCheckInfo} sx={{  fontSize: '18px' } } control={<Checkbox />} label="Dùng thông tin đã đăng ký" />
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
            id="content"
            name="content"
            label="Địa chỉ *"
            type="content"
            size="small"
            value={formik.values.content}
            onChange={formik.handleChange}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          />
        <CssTextField
            fullWidth
            id="content"
            name="content"
            label="Điện thoại liên hệ *"
            type="content"
            size="small"
            value={formik.values.content}
            onChange={formik.handleChange}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          />
          <CssTextField
            fullWidth
            id="content"
            name="content"
            label="Email liên hệ"
            type="content"
            size="small"
            value={formik.values.content}
            onChange={formik.handleChange}
            error={formik.touched.content && Boolean(formik.errors.content)}
            helperText={formik.touched.content && formik.errors.content}
          />
          {data?.hadTimeStop &&
            <Typography variant="body2" fontSize="medium" sx={{ padding: "4px 0", fontSize: '15px' }}>
          Chúng tôi cho phép bạn giới hạn thời gian hiển thị tin. Tin quá thời hạn (tối đa 30 ngày) sẽ được tự động gỡ bỏ trên thông tin cộng đồng.
        </Typography>}
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
    </Box>
  );
};
