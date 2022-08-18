import { Box, DialogTitle, MenuItem } from "@mui/material";
import * as React from 'react';
import PropTypes from 'prop-types'; 
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions'; 
import Typography from '@mui/material/Typography'; 
import { BootstrapButton, CssTextField, CustomSelect } from "../utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLocation } from "../features/location";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";


export {Accommodation}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    maxWidth: '360px',
    margin: '0 auto',
    '& .MuiDialogContent-root': {
        padding: '10px 20px !important',
        overflowY: 'none'
      },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
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

const Accommodation = ({ open, handleClose, formik }) => {
    const [provinceId, setProvinceId] = useState()
    const [districtId, setDistrictId] = useState()
    // const queryClient = useQueryClient()
    let initFilter = {
        type: 3,
        allPage: true,
        sortedBy: `[{"key":"DISPLAY_ORDER","reverse":false},{"key":"NAME","reverse":false}]`
    }
    if(provinceId){
        initFilter={
            ...initFilter,
            type: 2,
            parentId: provinceId
        }
    }
    if(districtId){
        initFilter={
            ...initFilter,
            type: 1,
            parentId: districtId
        }
    }
    const filter =
    "?" +
    new URLSearchParams(JSON.parse(JSON.stringify(initFilter))).toString();

    const {data: location} = useQuery(['location'], ()=> getLocation({filter}));
    const {data: district} = useQuery(['district'], ()=> getLocation({filter}), {enabled: Boolean(provinceId)});
    const {data: wards} = useQuery(['wards'], ()=> getLocation({filter}), {enabled: Boolean(districtId)});
    const listProvince = location?.data?.data;
    const listDistrict = district?.data?.data; 
    const listWards = wards?.data?.data; 

    const formikAccommodation = useFormik({
        initialValues: { 
            cityId: undefined,
            district: undefined,
            wards: undefined
        },
        enableReinitialize: true,
        // validationSchema: validationSchema,
        onSubmit: (values) => { 
          console.log(values)
            // formik.setFieldValue("address", values.cityId);
            handleClose();
        },
      });
      const handleSubmitAccommondation = ()=>{
        // formik.setFieldValue("address", formikAccommodation.values.cityId); 
        handleClose()
      }
      const handleChangeProvince = (val)=>{
        // formikAccommodation.setFieldValue("cityId", val?.target?.value?.name); 
        setProvinceId(val?.target?.value)
        // setDistrictId()
      }
      const handleChangeDistrict = (val)=>{ 
        // formikAccommodation.setFieldValue("district", val?.target?.value?.name); 
        setDistrictId( val?.target?.value)
      }
  return (
    <>
      <form onSubmit={formikAccommodation.handleSubmit}>
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
            <CustomSelectAccommondation
              id="cityId"
              name="cityId"
              type="cityId"
              label={"Tỉnh thành *"}
              formik={formikAccommodation}
              data={listProvince}
              onChange={handleChangeProvince}
              SelectProps={{
                multiple: false,
              }}
              helperText={
                !formikAccommodation.values.cityId && <span style={{ color: "red" }}>Tỉnh/Thành là bắt buộc</span>
              }
            />
            <CustomSelectAccommondation
              id="district"
              name="district"
              type="district"
              label={"Quận huyện *"}
              formik={formikAccommodation}
              data={listDistrict|| []}
              onChange={handleChangeDistrict}
              SelectProps={{
                multiple: false,
              }}
            />
            <CustomSelectAccommondation
              id="wards"
              name="wards"
              type="wards"
              label={"Phường xã *"}
              formik={formikAccommodation}
              data={listWards||[]}
              SelectProps={{
                multiple: false,
              }}
            />
            <CssTextField
              fullWidth
              id="content"
              name="content"
              label="Tên tòa nhà/ Khu dân cư/ Dự án *"
              type="content"
              size="small"
            />
          </DialogContent>
          <DialogActions>
            <BootstrapButton
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
               onClick={handleSubmitAccommondation}
            >
              Hoàn tất
            </BootstrapButton>
          </DialogActions>
        </BootstrapDialog>
      </form>
    </>
  );
};

const CustomSelectAccommondation = ({ data, formik, type, label, ...rest }) => {    
  console.log(formik.values)
   if(formik?.values[type] || !rest?.SelectProps?.multiple) return (
      <CssTextField
        fullWidth
        select
        multiple={true}
        size="small"
        value={formik?.values[type]}
        SelectProps={{ 
          multiple: true,
          renderValue: (selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.join(', ')}
          </Box>
          )
        }}
        onChange={formik?.handleChange}
        error={
          formik?.touched[type] &&
          Boolean(formik?.errors[type])
        }
        helperText={
          formik?.touched[type] &&
          formik?.errors[type]
        } 
        label={label}
        {...rest}
      >
         <MenuItem disabled > 
              <Typography  variant="h6" fontSize={'medium'}>{label}</Typography>
          </MenuItem>
        {data?.map((e,i) => {  
          return (
            <MenuItem key={e?.id||i} value={e?.id} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}> 
              <Typography  variant="h6" fontSize={'medium'}>{e?.name}</Typography>
            </MenuItem>
          );
        })}
      </CssTextField>
    )
    else return <></>
  };

  export {CustomSelect}