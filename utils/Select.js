import { Box, MenuItem, Typography } from "@mui/material";
import { CssTextField } from "./CustomInput";

const CustomSelect = ({ data, formik, type, label, ...rest }) => {    
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
          const value = typeof(e?.text) !== 'string'?`${e?.text?.vn } / ${e?.text?.en}`: e?.key;
          return (
            <MenuItem key={e?.key||i} value={value || e} sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}> 
              <Typography  variant="h6" fontSize={'medium'}>{e?.text?.vn || e?.text}</Typography>
              <Typography variant="body2" fontSize={'small'}>{e?.text?.en}</Typography>
            </MenuItem>
          );
        })}
      </CssTextField>
    )
    else return <></>
  };

  export {CustomSelect}