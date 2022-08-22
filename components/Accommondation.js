import { DialogTitle, MenuItem } from "@mui/material";
import * as React from 'react';
import * as yup from "yup";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { BootstrapButton, CssTextField, CustomSelect } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { getLocation } from "../features/location";
import { useFormik } from "formik";
import { useState, useEffect } from "react";


export { Accommodation }

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  maxWidth: '360px',
  margin: '0 auto',
  '& .MuiDialogContent-root': {
    padding: '10px 20px !important',
    overflowY: 'none'
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
    </DialogTitle>
  );
};
BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


const validationSchema = yup.object({
  cityId: yup
    .string()
    .required(" Tỉnh thành là bắt buôc."),
});

const Accommodation = ({ open, handleClose, formik, result }) => {

  const [listDistrict, setListDistrict] = useState([])
  const [listWards, setListWards] = useState([])
  const [listResult, setListResult] = useState({})
  const [initFilter, setInitFilter] = useState({
    type: 3,
    allPage: true,
    sortedBy: `[{"key":"DISPLAY_ORDER","reverse":false},{"key":"NAME","reverse":false}]`
  })
  const filterFormat = (filter) => {
    return "?" + new URLSearchParams(JSON.parse(JSON.stringify(filter))).toString();
  }

  const { data: location } = useQuery(['location'], () => getLocation({ filter: filterFormat(initFilter) }));
  const listProvince = location?.data?.data;

  const formikAccommodation = useFormik({
    initialValues: {
      cityId: '',
      districtId: '',
      wardId: '',
      detail: ''
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: () => { 
      result(listResult) 
      handleClose();
      formikAccommodation.resetForm()
    },
  });

  const handleSubmitAccommondation = () => {
    result(listResult);
    formikAccommodation.resetForm()
    handleClose()
  }
  const handleChangeProvince = (val, record) => {
    formikAccommodation.handleChange(val)
    setListResult({
      cityId: record?.props?.data
    })
    getLocation({
      filter: filterFormat({
        ...initFilter,
        type: 2,
        parentId: val.target.value
      })
    }).then(res => {
      setListDistrict(res?.data?.data);
      setListWards([])
    })
  }
  const handleChangeDistrict = (val, record) => {
    formikAccommodation.handleChange(val)
    setListResult({
      ...listResult,
      districtId: record?.props?.data
    })
    getLocation({
      filter: filterFormat({
        ...initFilter,
        type: 1,
        parentId: val.target.value
      })
    }).then(res => {
      setListWards(res?.data?.data)
    })
  }
  const handleChangeWard = (val, record) => {
    formikAccommodation.handleChange(val);
    setListResult({
      ...listResult,
      wardId: record?.props?.data
    })
  }
  const handleChangeDetail = (val) => {
    formikAccommodation.handleChange(val);
    setListResult({
      ...listResult,
      detail: val.target.value
    })
  }
  return (
    <>
      <BootstrapDialog
        onClose={handleSubmitAccommondation}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleSubmitAccommondation}
        >
          Khu vực chỗ ở
        </BootstrapDialogTitle>
        <DialogContent>
          <form onSubmit={formikAccommodation.handleSubmit}>
            <CustomSelectAccommondation
              id="cityId"
              name="cityId"
              type="cityId"
              title="cityId"
              label={"Tỉnh thành *"}
              formik={formikAccommodation}
              data={listProvince || []}
              onChange={handleChangeProvince}
              helperText={
                !formikAccommodation.values.cityId && <span style={{ color: "red" }}>Tỉnh/Thành là bắt buộc</span>
              }
            />
            <CustomSelectAccommondation
              id="districtId"
              name="districtId"
              type="districtId"
              label={"Quận huyện *"}
              title="districtId"
              formik={formikAccommodation}
              data={listDistrict || []}
              onChange={handleChangeDistrict}
            />
            <CustomSelectAccommondation
              id="wardId"
              name="wardId"
              type="wardId"
              title="wardId"
              label={"Phường xã *"}
              onChange={handleChangeWard}
              formik={formikAccommodation}
              data={listWards || []}
            />
            <CssTextField
              fullWidth
              id="detail"
              name="detail"
              title="detail"
              label="Tên tòa nhà/ Khu dân cư/ Dự án *"
              type="detail"
              size="small"
              onChange={handleChangeDetail}
            />
            <BootstrapButton
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
            >
              Hoàn tất
            </BootstrapButton>
          </form>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

const CustomSelectAccommondation = ({ data, formik, type, label, ...rest }) => {
  return (
    <CssTextField
      fullWidth
      select
      multiple={true}
      size="small"
      value={formik.values[type] || ''}
      onChange={formik.handleChange}
      error={formik.touched[type] && Boolean(formik.errors[type])}
      helperText={formik.touched[type] && formik.errors[type]}
      label={label}
      {...rest}
    >
      <MenuItem disabled >
        <Typography variant="h6" fontSize={'medium'}>{label}</Typography>
      </MenuItem>
      {data?.map((e, i) => {
        return (
          <MenuItem key={i} value={e?.id} data={e}>
            <Typography variant="h6" fontSize={'medium'}>{e?.name}</Typography>
          </MenuItem>
        );
      })}
    </CssTextField>
  )
};

export { CustomSelect,CustomSelectAccommondation }