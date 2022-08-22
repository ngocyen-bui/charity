import * as yup from "yup";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { BootstrapButton } from "./../utils";
import { useState } from "react";
import { useFormik } from "formik";
import { useQuery } from "@tanstack/react-query";
import { CustomSelectAccommondation } from "./Accommondation";
import { getLocation } from "../features/location";
import CloseIcon from "@mui/icons-material/Close";

const sorted = [
  { id: 1, key: "1", name: "Tin mới nhất" },
  { id: 2, key: "2", name: "Tin cũ nhất" },
];

export { RenderModalFilterPost, sorted };
const RenderModalFilterPost = ({ isOpen, handleClose, handleSearch, filter, setFilter,clearFilter }) => { 
  const [listDistrict, setListDistrict] = useState([]);
  const [listResult, setListResult] = useState({});
  const [initFilter, setInitFilter] = useState({
    type: 3,
    allPage: true, 
  });
  const filterFormat = (filter) => {
    return (
      "?" + new URLSearchParams(JSON.parse(JSON.stringify(filter))).toString()
    );
  }; 
  
  const { data: location } = useQuery(["locationFilter"], () =>
    getLocation({ filter: filterFormat(initFilter) })
  );
  const listProvince = location?.data?.data;

  const handleChangeProvince = (val, record) => {
    formik.handleChange(val);
    setListResult({
      cityId: record?.props?.data,
    });
    getLocation({
      filter: filterFormat({
        ...initFilter,
        type: 2,
        parentId: val.target.value,
      }),
    }).then((res) => {
      setListDistrict(res?.data?.data);
    });
  };
  const handleChangeDistrict = (val, record) => {
    formik.handleChange(val);
    setListResult({
      ...listResult,
      districtId: record?.props?.data,
    });
  };
  const formik = useFormik({
    initialValues: {
      cityId: filter?.cityId || undefined,
      districtId: filter?.districtId ||undefined,
      sortedBy: filter?.sortedBy || undefined,
    },
    enableReinitialize: true, 
    onSubmit: (values) => {
      handleSearch(values) 
      handleClose();
    },
  });
  const handleCloseModal = () => { 
    setFilter(filter)
    handleClose(); 
  };
  const handleResetModal = ()=>{ 
    setListDistrict([]);
    setFilter({})
    clearFilter()
    handleSearch({}) 
    formik.resetForm();
    handleClose();  
  }
  return (
    <Dialog open={isOpen} onClose={handleCloseModal}>
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseModal}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent
          sx={{
            width: "350px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CustomSelectAccommondation
            id="cityId"
            name="cityId"
            type="cityId"
            title="cityId"
            label={"Tỉnh/Thành"}
            formik={formik}
            data={listProvince || []}
            onChange={handleChangeProvince}
          />
          <CustomSelectAccommondation
            id="districtId"
            name="districtId"
            type="districtId"
            label={"Quận/Huyện"}
            title="districtId"
            formik={formik}
            data={listDistrict || []}
            onChange={handleChangeDistrict}
          />
          <CustomSelectAccommondation
            id="sortedBy"
            name="sortedBy"
            type="sortedBy"
            label={"Săp xếp theo"}
            title="sortedBy"
            formik={formik}
            data={sorted}
            onChange={handleChangeDistrict}
          />
          <Box sx={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <BootstrapButton
              variant="outlined" 
              onClick={handleResetModal}
              sx={{
                backgroundColor: "white",
                border: "1px solid rgb(254, 146, 146)",
                color: "rgb(254, 146, 146)",
                "&:hover": {
                  border: "1px solid rgb(254, 146, 146)",
                  backgroundColor: "white",
                },
              }}
            >
              Xóa bộ lọc
            </BootstrapButton>
            <BootstrapButton variant="contained" type="submit">
              Tìm kiếm
            </BootstrapButton>
          </Box>
        </DialogContent>
      </form>
    </Dialog>
  );
};
