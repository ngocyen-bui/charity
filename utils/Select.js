import { MenuItem } from "@mui/material";
import { CssTextField } from "./CustomInput";

const CustomSelect = ({ data, formik, type, ...rest }) => {
    return (
      <CssTextField
        fullWidth
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
        {...rest}
      >
        {data?.map((e,i) => {
          return (
            <MenuItem key={e?.key||i} value={e?.id}>
              {e?.text || e?.vnText}
            </MenuItem>
          );
        })}
      </CssTextField>
    );
  };

  export {CustomSelect}