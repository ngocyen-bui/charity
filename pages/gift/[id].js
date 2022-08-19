import { Box, Container } from "@mui/system";
import { Header } from "../../components/Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRouter } from "next/router";
import {  useQuery } from "@tanstack/react-query";
import { 
  Avatar,
  Chip,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import {
  defaultAvatarImage,
  defaultImage,
  listTypeAccount,
} from "../../common/user";
import { linkImage } from "../../features/Image"; 
import { getPost } from "../../features/users/postAPI";
import moment from "moment";
import { listExtraPost, listTypePost } from "../../common/post";


export default function GiftPost() {
  const router = useRouter(); 
  const { id } = router.query;  
  const {data:  listInfo} = useQuery(['gift', id], ()=> getPost({id}), {enabled: Boolean(id)})
  const listData = listInfo?.data?.data
  const result = listExtraPost?.find(e=> e.categoryId === listData?.categoryId); 
  const extra = listTypePost?.find(e => e.id === result?.categoryId)
  const typeAccount = listTypeAccount.find(
    (t) => t.type * 1 === listData?.creator?.type * 1
  );
  return (
    <>
      <Header isShowSubBar={false} />
      <Container maxWidth="md">
        <div className="div-cover ">
          <Box sx={{ position: "absolute", top: "10px", left: "10px" }}>
            <Box
              sx={{
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                padding: "5px",
                cursor: "pointer",
                backgroundColor: "rgba(0,0,0,0.5)",
              }}
              onClick={() => router.back()}
            >
              <ArrowBackIcon sx={{ fontSize: "20px", color: "white" }} />
            </Box>
          </Box>
          <img
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
            src={
              listData?.images?.image
                ? linkImage(listData?.images?.image)
                : linkImage(defaultImage)
            }
            alt="cover user"
          ></img>
        </div>
        <Box sx={{ padding: "10px 0 " }}>
          <Typography variant="h6">{listData?.title}</Typography>
          <Typography variant="body1" fontSize="small">
            {moment(listData?.createdAt).format("HH:mm - DD/MM/yyyy")}
          </Typography>
          <Typography
            sx={{ marginTop: "20px", color: "#3a3a3a" }}
            variant="body1"
            fontSize="medium"
          >
            {listData?.content}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="h6"
            fontSize="medium"
            sx={{ paddingBottom: "8px" }}
          >
            Thông tin
          </Typography>
          <Box>
            <Typography
              variant="h6"
              fontSize="small"
              sx={{
                paddingBottom: "8px",
                width: "170px",
                display: "inline-block",
              }}
            >
              Danh mục
            </Typography>
            <Typography
              variant="h6"
              fontSize="small"
              sx={{ paddingBottom: "8px", display: "inline-block" }}
            >
              {extra?.text} {result?.text && `/ ${result?.text}`}
            </Typography>
          </Box>
          {listData?.categoryId !== 1 &&  <Box>
            <Typography
              variant="h6"
              fontSize="small"
              sx={{
                paddingBottom: "8px",
                width: "170px",
                display: "inline-block",
              }}
            >
              Danh mục hỗ trợ
            </Typography>
            <Typography
              variant="h6"
              fontSize="small"
              sx={{ paddingBottom: "8px", display: "inline-block" }}
            >
              {listData?.dataInfo?.categories?.join(", ")}{" "}
            </Typography>
          </Box>}
         
          <hr />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Avatar
                alt="Avatar"
                sx={{
                  width: '56px',
                  height: '56px',
                  boxShadow: "0px 4px 10px #ddd",
                }}
                src={
                  listData?.creator?.images?.image ?
                  linkImage(listData?.creator?.images?.image) :
                  linkImage(defaultAvatarImage)
                }
              >
                
              </Avatar>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                >
                  {listData?.contactInfo?.name}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Chip
                    size="small"
                    label={typeAccount?.text}
                    sx={{ background: typeAccount?.color }}
                  />
                  <FavoriteIcon sx={{ color: "#f27474", width: "24px" }} />
                </Stack>
              </Box>
            </Box>
          </Box>

          <hr />
        </Box>
        <Box>
          <Typography
            variant="h6"
            fontSize="medium"
            sx={{ paddingBottom: "8px" }}
          >
            Liên hệ
          </Typography>
          <Box>
            <Box sx={{display: 'flex', gap: '12px', marginBottom: '12px'}}>
              <PersonOutlineOutlinedIcon />
              <Typography variant="subtitle2" fontSize="small" sx={{fontSize: '14px'}}>{listData?.creator?.name}</Typography>
            </Box>
            <Box sx={{display: 'flex', gap: '12px', marginBottom: '12px'}}>
              <LocalPhoneOutlinedIcon />
              <a href={`tel:${listData?.creator?.phone}`} style={{color: '#3c48b1'}} >{listData?.creator?.phone}</a >
            </Box>
            <Box sx={{display: 'flex', gap: '12px', marginBottom: '12px'}}>
              <EmailOutlinedIcon />
              <Typography variant="subtitle2" fontSize="small" sx={{fontSize: '14px'}}>{listData?.creator?.email}</Typography>
            </Box>
            <Box sx={{display: 'flex', gap: '12px', marginBottom: '12px'}}>
              <RoomOutlinedIcon />
              <Typography variant="subtitle2" fontSize="small" sx={{fontSize: '14px'}}>{listData?.dataInfo?.addressLocation}</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
 