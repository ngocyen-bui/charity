import { Box, Button, Container, Typography } from "@mui/material";
import { Header } from "../../components";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useRouter } from "next/router";




export default function FollowerUser() {
    const router = useRouter()
    const handleBackRouter = () => {
        router.back()
    }
    return <>
        <Header isShowSubBar={false} />
        <Container maxWidth="md">
            <Box sx={{ padding: "24px" }}>
                <Typography
                    sx={{
                        fontSize: "12px",
                        textDecoration: "underline",
                        cursor: "pointer",
                    }}
                    variant="body2"
                    onClick={
                        handleBackRouter
                    }
                >
                    Trở về
                </Typography>
            </Box>

        </Container>
    </>
}