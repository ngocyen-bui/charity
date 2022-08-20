import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
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
import { Message } from "./Message";
import moment from "moment";
import { createPost, getPost, putPost } from "../features/users/postAPI";
import { useRouter } from "next/router";

export { PostUser };

const required = <span style={{ color: "red" }}>*</span>;
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;


const PostUser = ({ data, dataPost }) => { 
  const router = useRouter() 
  const [isGetInfo, setIsGetInfo] = useState(false);
  const [hadTimeClose, setHadTimeClose] = useState(Boolean(dataPost));
  const [accommodation, setAccommodation] = useState(false);
  const [resultAccommodation, setResultAccommodation] = useState({});
  const [srcImage, setSrcImage] = useState(dataPost?.images?.image|| "")
  const [message, setMessage] = useState({ state: false, message: 'Đăng bài thành công', type: 'success', time: 2000 });
  const infoUser = getCookie("auth") ? JSON.parse(getCookie("auth")) : {};
  const handleCloseAccommodation = () => {
    setAccommodation(false)
  } 

  const handleHadTimeClosed = (val) => {
    setHadTimeClose(val?.target?.checked);
  };
  const handleFocusAccommodation = () => {
    setAccommodation(true)
  }
  const handleResultAccommodation = (listResult) => {
    let text = [];
    for (let x in listResult) {
      text.push(listResult[x]?.name || listResult[x])
    }
    setResultAccommodation(listResult)
    formik.setFieldValue("address", text.join(', '));
  }
  const initValidate = {
    title: yup
      .string()
      .max(256, "Tiêu đề quá giới hạn 256 ký tự")
      .required("Tiêu đề là bắt buôc."),
    content: yup
      .string()
      .required("Nội dung là bắt buôc."),
    phone: yup
    .string()
    .matches(phoneRegExp, {
      message: "Số điện thoại không đúng định dạng",
      excludeEmptyString: false,
    })
    .required("Số điện thoại là bắt buộc"),
    addressLocation: yup 
    .string()
    .required("Địa chỉ là bắt buộc."),
    name: yup
    .string()
    .required("Tên là bắt buộc."),
    email: yup
    .string()
    .email('Email không đúng định dạng')
  
  }
  const place = {
    placeType: yup
    .array()
    .min(1, 'Loại chỗ ở là bắt buộc.'),
    area: yup
    .number()
    .min(0, 'Diện tích không được âm').
    required('Diện tích là bắt buộc'),
    address: yup
      .string()
      .required("Khu vực chỗ ở là bắt buôc."),
  }
  const job = {
    jobType: yup 
    .array()
    .min(1, 'Loại công việc là bắt buộc'),
    career: yup
    .array()
    .min(1, 'Ngành nghề là bắt buộc'),
    payForm: yup
    .array()
    .min(1, 'Hình thức trả lương là bắt buộc')
  }
  const market ={
    categories: yup
    .array()
    .min(1, 'Danh mục hỗ trợ là bắt buộc')
  }
  const needSupport = {
    categories: yup
    .array()
    .min(1, 'Danh mục hỗ trợ là bắt buộc'),
  }
  const support = {
    categories: yup
    .array()
    .min(1, 'Danh mục hỗ trợ là bắt buộc'),
    formOfSupport: yup
    .array()
    .min(1, 'Hình thức hỗ trợ là bắt buộc'),
  }
  const transport = {
    categories: yup
    .array()
    .min(1, 'Loại hình vận chuyển là bắt buộc'),
    transportProductType:  yup
    .array()
    .min(1, 'Thông tin hàng hóa là bắt buộc'),
  }
  const resultValidate = { }
  if(data?.categoryId === 4 && data?.type === 4){
    resultValidate={
      ...initValidate,
      ...needSupport
    }
  }else if(data?.categoryId === 4 && data?.type === 3){
    resultValidate={
      ...initValidate,
      ...support
    }
  }else if(data?.categoryId === 12){
    resultValidate={
      ...initValidate,
      ...transport
    }
  }else if(data?.categoryId === 25){
    resultValidate={
      ...initValidate,
      ...job
    }
  }else if(data?.categoryId === 35){
    resultValidate={
      ...initValidate,
      ...place
    }
  }else if(data?.categoryId === 3){
    resultValidate={
      ...initValidate,
      ...market
    }
  }else{
    resultValidate={
      ...initValidate, 
    }
  }
  const validationSchema = yup.object(resultValidate);
  const formik = useFormik({
    initialValues: {
      title: dataPost?.title || "",
      content: dataPost?.content || "",
      typeOfTransportation: dataPost?.dataInfo?.transportProductType || [],
      transportProductType: dataPost?.dataInfo?.transportProductType || [],
      name: "",
      phone:"",
      email:  "",
      addressLocation:  "",
      gender:  dataPost?.dataInfo?.gender|| "",
      academicLevel: "",
      experience:  dataPost?.dataInfo?.experience|| "",
      career: dataPost?.dataInfo?.career || [],
      jobType: dataPost?.dataInfo?.jobType || [],
      payForm: dataPost?.dataInfo?.payForm || [],
      placeType: dataPost?.dataInfo?.placeType || [],
      categories:dataPost?.dataInfo?.categories || [],
      formOfSupport: dataPost?.dataInfo?.formOfSupport || [],
      quantityRecruit: dataPost?.dataInfo?.quantityRecruit || null,
      yearTo: dataPost?.dataInfo?.yearTo || null,
      yearFrom: dataPost?.dataInfo?.yearFrom || null,
      address:  dataPost?.dataInfo?.address?.city?.name || "",
      birthYear: '',
      formOfSupport: [],
      closedAt: dataPost?.dataInfo?.closedAt|| null

    },
    enableReinitialize: true,
    validateOnChange: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if(!srcImage){
        return setMessage({
          ...message,
          message: 'Hình ảnh là bắt buộc',
          state: true,
          type: 'error'
        })
      }
      try {
      let dataInfo ={...values, address:{
          cityId: resultAccommodation?.cityId?.id || null,
          districtId: resultAccommodation?.districtId?.id|| null,
          wardId: resultAccommodation?.wardId?.id|| null,
          detail: resultAccommodation?.detail||"",
        },
        academicLevel: [values.academicLevel],
        email: undefined,
        birthYear: undefined,phone: undefined,
        name: undefined,
        content: undefined,
        title: undefined,
        closedAt: undefined
      }
      
      let  result = {
        categoryId: data?.categoryId,
        type: data?.type,
        content: values?.content,
        title: values?.title,
        closedAt: values?.closedAt,
        contactInfo: {
          email: values?.email,
          name: values?.name,
          phone: values?.phone,
          informationCurrent: isGetInfo?1:-1
        },
        dataInfo: JSON.parse(JSON.stringify(dataInfo)),
      images: {
        image: srcImage,
        imageThumbnail: ''
      }
       }
       if (Boolean(dataPost)) {
           putPost({ id: dataPost?.id,data: result })
           .then((res) => {
             setMessage({ ...message, state: true }); 
             router.push(`/gift/${res?.data?.data?.id}`);
           })
           .catch(() =>
             setMessage({
               message: "Đăng bài thất bại. Vui lòng thử lại sau.",
               type: "error",
               state: true,
             })
           );
       } else {
         createPost({ data: result })
           .then((res) => {
             setMessage({ ...message, state: true }); 
             router.push(`/gift/${res?.data?.data?.id}`);
           })
           .catch(() =>
             setMessage({
               message: "Đăng bài thất bại. Vui lòng thử lại sau.",
               type: "error",
               state: true,
             })
           );
       }
     
      } catch (error) {
        console.log(error);
      }
    },
    
  }); 
  const handleCloseMessage = ()=>{
    setMessage({
      ...message,
      state: false,
    })
  }
  const handleCheckInfo = (val) => {
    setIsGetInfo(val?.target?.checked); 
    if(val?.target?.checked){ 
      getDetailUser(infoUser?.id).then((user) => {
        const listInfo = user?.data?.data;
        formik.setFieldValue('name',listInfo?.name|| '');
        formik.setFieldValue('phone',listInfo?.phone || '');
        formik.setFieldValue('email',listInfo?.email|| '');
        formik.setFieldValue('addressLocation',listInfo?.addressLocation|| '');
      }); 
    } else{
      formik.setFieldValue('name','');
      formik.setFieldValue('phone','');
      formik.setFieldValue('email','');
      formik.setFieldValue('addressLocation','');
    }
  };
  const handleChangeInfoDefault=(value)=>{
    formik.handleChange(value);
    setIsGetInfo(false);
  }
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
          {data?.fieldExtra?.map((e, i) => {
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
              onClick={handleFocusAccommodation}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
            <CssTextField
              fullWidth
              id="area"
              name="area"
              label="Diện tích *"
              type="number"
              size="small"
              value={formik.values.area}
              onChange={formik.handleChange}
              error={formik.touched.area && Boolean(formik.errors.area)}
              helperText={formik.touched.area && formik.errors.area}
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
          {data?.categoryId === 35 && <>
            <Box>
              <Typography
                variant="h6"
                fontSize="large"
                sx={{ padding: "10px 0" }}
              >
                Thông tin thêm
              </Typography>
              <CssTextField
                fullWidth
                id="statusFurniture"
                name="statusFurniture"
                label="Tình trạng nội thất"
                type="statusFurniture"
                size="small"
                value={formik.values.statusFurniture}
                onChange={formik.handleChange}
                error={formik.touched.statusFurniture && Boolean(formik.errors.statusFurniture)}
                helperText={formik.touched.statusFurniture && formik.errors.statusFurniture}
              />
              <CssTextField
                fullWidth
                id="request"
                name="request"
                label="Yêu cầu khác"
                type="request"
                size="small"
                value={formik.values.request}
                onChange={formik.handleChange}
                error={formik.touched.request && Boolean(formik.errors.request)}
                helperText={formik.touched.request && formik.errors.request}
              />
            </Box>
          </>}
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
                          formik.setFieldValue("yearFrom", new Date(value).getFullYear());
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
                        minDate={new Date(formik.values.yearFrom)|| undefined}
                        views={['year']}
                        error={
                          formik.touched.yearTo && Boolean(formik.errors.yearTo)
                        }
                        helperText={formik.touched.yearTo && formik.errors.yearTo}
                        inputFormat="yyyy"
                        onChange={(value) => { 
                          formik.setFieldValue("yearTo",  new Date(value).getFullYear());
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
                    maxDate={new Date()}
                    value={formik.values.birthYear}
                    error={
                      formik.touched.birthYear && Boolean(formik.errors.birthYear)
                    }
                    helperText={formik.touched.birthYear && formik.errors.birthYear}
                    inputFormat="yyyy"
                    onChange={(value) => {
                      formik.setFieldValue("birthYear",  new Date(value).getFullYear());
                    }}
                    renderInput={(params) => {
                      return <CssTextField fullWidth size="small" {...params} />;
                    }}
                  />
                </LocalizationProvider>
                }
                {data?.moreInfomation?.map((e, i) => (
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
          <UploadImage src={srcImage}  setSrc={setSrcImage}/>
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
            control={<Checkbox checked={isGetInfo}/>}
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
            onChange={handleChangeInfoDefault}
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
            onChange={handleChangeInfoDefault}
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
            onChange={handleChangeInfoDefault}
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
            onChange={handleChangeInfoDefault}
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
          {data?.categoryId === 1 && <Box
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
             name='requestSupport'
              control={<Checkbox />}
              sx={{ width: "fit-content" }}
              label="Yêu cầu hỗ trợ"
            />
          </Box>}
          <FormControlLabel
            control={<Checkbox checked={hadTimeClose} />}
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
                minDate={new Date()}
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
          {dataPost?'Cập nhật tin':'Đăng tin'}
        </BootstrapButton>
      </form>
      <Message {...message} handleCloseMessage={handleCloseMessage}/>
      <Accommodation open={accommodation} handleClose={handleCloseAccommodation} formik={formik} result={handleResultAccommodation} />
    </Box>
  );
};
