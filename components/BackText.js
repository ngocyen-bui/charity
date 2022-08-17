import { Typography } from "@mui/material"
import { useRouter } from "next/router"

export {BackText}

const BackText = ()=>{
    const router = useRouter()
    const handleBackRouter = ()=>{
        router.back()
    }
    return <Typography
    sx={{
      fontSize: "12px",
      textDecoration: "underline",
      cursor: "pointer",
    }}
    variant="body2"
    onClick={handleBackRouter}
  >
    Trở về
  </Typography>
}