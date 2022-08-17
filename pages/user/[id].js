import { Box, Container } from "@mui/system";
import { Header } from "../../components/Header";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArticleIcon from "@mui/icons-material/Article";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinDropIcon from "@mui/icons-material/PinDrop";
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Alert,
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Slide,
  Snackbar,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import {
  defaultAvatarImage,
  defaultImage,
  listSetting,
  listType,
  listTypePost,
  listTypeAccount
} from "../../common/user";
import { useState } from "react";
import Link from "next/link";
import { getDetailUser, getFlowerlUser, updateDetailUser } from "../../features/users/userAPI";
import { linkImage, upload } from "../../features/Image";
import { deleteCookie, getCookie } from "cookies-next";
import { RenderFormChangePassword, RenderTabPanel } from "../../components";


export default function DetailUser() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const authString = getCookie('auth');
  const auth = authString && JSON.parse(authString);
  const { id } = router.query;
  const [anchorEl, setAnchorEl] = useState(null);
  const [type, setType] = useState(1);
  const [typePost, setTypePost] = useState(0);
  const [openModalPassWord, setOpenModalPassWord] = useState(false);
  const [isChangeAvatar, setIsChangeAvatar] = useState(false)

  const { data: infoUser } = useQuery(["user", id], () => getDetailUser(id), {
    enabled: Boolean(id),
  });
  const [stateUploadImages, setStateUploadImages] = useState({
    open: false,
    text: "Upload success",
    type: "success",
  });
  const mutation = useMutation(updateDetailUser, {
    onSuccess: () => {
      setIsChangeAvatar(true)
      queryClient.invalidateQueries("user");
    },
  });
  const listData = infoUser?.data?.data;
  const isFollower = !!listData?.nowBeingFollowed?.find(e => e.id * 1 === auth?.id * 1);
  const typeAccount = listTypeAccount.find(e => e.type === listData?.type);
  const isAuth = auth?.id * 1 === id * 1; 
  const unknown = () => {
    return <span className="text-grey">Chưa cập nhật</span>;
  };

  const open = Boolean(anchorEl);

  const handleClickOpenChangePassWord = () => {
    setOpenModalPassWord(true);
  };

  const handleCloseChangePassWord = () => {
    setOpenModalPassWord(false);
    handleClose();
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangeType = (e) => {
    setType(e);
  };
  const handleChangeTypePost = (newValue) => {
    setTypePost(newValue);
  };
  const handleLogOut = () => {
    deleteCookie("auth");
    deleteCookie("token");
    handleClose();

    router.push("/user/login");
  };
  const handleUploadCoverImage = (event) => {
    let file = event.target.files[0];
    upload(file).then((res) => {
      setStateUploadImages({ text: "Cập nhật ảnh bìa thành công", open: true, type: 'success' });
      let data = {
        images: {
          avatar: listData?.images?.avatar || undefined,
          altText: listData?.images?.altText || undefined,
          image: res?.id,
        },
      };
      return mutation.mutate({ data: data });
    });
  };
  const handleUploadAvatar = (event) => {
    let file = event.target.files[0];
    upload(file).then((res) => {
      setStateUploadImages({
        text: "Cập nhật ảnh đại diện thành công",
        open: true,
        type: 'success'
      });
      let data = {
        images: {
          avatar: res?.id,
          altText: listData?.images?.altText || undefined,
          image: listData?.images?.image || undefined,
        },
      };
      return mutation.mutate({ data: data });
    }).catch(err => setStateUploadImages({
      text: "Cập nhật ảnh đại diện thất bại",
      open: true,
      type: 'error'
    }))
  };
  const handleCloseMessage = () => {
    setStateUploadImages({ ...stateUploadImages, open: false });
  };
  const handleFollower = (val) => {
    console.log(val)
    if (auth?.id * 1 === id * 1) {
      return;
    }
    // getFlowerlUser()

  } 
  return (
    <>
      <Header isShowSubBar={false} isChange={isChangeAvatar} />
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
          <Box sx={{ position: "absolute", bottom: "10px", right: "10px" }}>
            <IconButton
              sx={{ fontSize: "20px", padding: "0" }}
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleUploadCoverImage}
              />
              <Box
                sx={{
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  padding: "5px",
                  cursor: "pointer",
                  backgroundColor: "#f19e9e",
                }}
              >
                <CameraAltIcon sx={{ fontSize: "20px", color: "white" }} />
              </Box>
            </IconButton>
          </Box>
        </div>
        <Box className="div-avatar">
          <Box className="avatar">
            <Box sx={{ position: "relative" }}>
              <Avatar
                sx={{
                  width: "90px",
                  height: "90px",
                  border: "1px solid rgb(221, 221, 221)",
                  boxShadow: '0px 4px 10px #ddd'
                }}
                src={
                  listData?.images?.avatar
                    ? linkImage(listData?.images?.avatar)
                    : linkImage(defaultAvatarImage)
                }
              />
              <Box sx={{ position: "absolute", bottom: "0", right: "0" }}>
                <IconButton
                  sx={{ fontSize: "20px", padding: "0" }}
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleUploadAvatar}
                  />
                  <Box
                    sx={{
                      borderRadius: "50%",
                      width: "30px",
                      height: "30px",
                      padding: "5px",
                      cursor: "pointer",
                      backgroundColor: "#f19e9e",
                    }}
                  >
                    <CameraAltIcon sx={{ fontSize: "20px", color: "white" }} />
                  </Box>
                </IconButton>
              </Box>
            </Box>
            <Typography
              sx={{
                backgroundColor: typeAccount?.color,
                fontSize: "14px",
                borderRadius: "10px",
                padding: "0 8px",
              }}
            >
              {typeAccount?.text}
            </Typography>
          </Box>

          <Typography className="name">{listData?.name}</Typography>
          <Box className="wrapper-info-header">
            <Box className="follower">
              {isFollower ?
              // {Không thể follow chính bản thân mình => chỉnh cursor về mặt định}
                <FavoriteIcon sx={{ color: "#f19e9e", marginRight: "8px", cursor: !isAuth && "pointer" }}
                  onClick={() =>handleFollower(true)} /> :
                <FavoriteBorderIcon
                  sx={{ color: "#f19e9e", marginRight: "8px", cursor: !isAuth && "pointer" }}
                  onClick={() =>handleFollower(false)} />}


              <Link href={`/follower/${id}`}>
                <Typography sx={{ fontSize: '16px', cursor: 'pointer' }}>{listData?.totalBeingFollowed}</Typography>
              </Link>
            </Box>
            <Box className="setting">
              {isAuth ? <SettingsIcon
                sx={{ color: "#f19e9e", cursor: "pointer" }}
                onClick={handleClick}
              />: <Box sx={{height: '30px'}}></Box> }
              
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {listSetting?.map((e) => {
                  if (e?.open) {
                    return (
                      <MenuItem
                        key={e?.text}
                        onClick={handleClickOpenChangePassWord}
                      >
                        <ListItemIcon>{e?.icon}</ListItemIcon>
                        <ListItemText>{e?.text}</ListItemText>
                      </MenuItem>
                    );
                  }
                  if (e?.url) {
                    return (
                      <Link href={e.url} key={e?.text}>
                        <MenuItem onClick={handleClose}>
                          <ListItemIcon>{e?.icon}</ListItemIcon>
                          <ListItemText>{e?.text}</ListItemText>
                        </MenuItem>
                      </Link>
                    );
                  }
                  return (
                    <MenuItem onClick={handleClose} key={e?.text}>
                      <ListItemIcon>{e?.icon}</ListItemIcon>
                      <ListItemText>{e?.text}</ListItemText>
                    </MenuItem>
                  );
                })}
                <Divider sx={{ color: "rgba(0, 0, 0, 0.87)" }} />
                <MenuItem onClick={handleLogOut}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText>Đăng xuất </ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>
        <Box className="wrapper-button-info-user">
          {listType?.map((e) => {
            return (
              <Button
                key={e?.id}
                size="small"
                variant={type === e.id ? "contained" : "text"}
                onClick={() => handleChangeType(e?.id)}
                sx={
                  type === e.id
                    ? {
                      backgroundColor: "#f19e9e",
                      marginRight: "12px",
                      "&:hover": { backgroundColor: "#ef5d5d" },
                    }
                    : { marginRight: "12px", color: "#f19e9e" }
                }
              >
                {e?.text}
              </Button>
            );
          })}
        </Box>
        <Box className="wrapper-list-info-user">
          {/* {Kiểm tra nếu là tab thông tin thì sẽ render ra } */}
          {type === 1 && (
            <Slide
              direction="right"
              in={true}
              timeout={700}
              sx={{ marginLeft: "20px", paddingTop: "8px" }}
            >
              <Box>
                <Box sx={{ display: "flex", marginTop: "10px" }}>
                  <ArticleIcon sx={{ color: "#f19e9e" }} />
                  <Typography variant="body2" className="item-info-user">
                    {listData?.description || unknown()}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", marginTop: "10px" }}>
                  <PinDropIcon sx={{ color: "#f19e9e" }} />
                  <Typography variant="body2" className="item-info-user">
                    {listData?.address || unknown()}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", marginTop: "10px" }}>
                  <LocalPhoneIcon sx={{ color: "#f19e9e" }} />
                  <Typography variant="body2" className="item-info-user">
                    {listData?.phone || unknown()}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", marginTop: "10px" }}>
                  <FacebookIcon sx={{ color: "#f19e9e" }} />
                  <Typography variant="body2" className="item-info-user">
                    {listData?.websites?.website || unknown()}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", marginTop: "10px" }}>
                  <LanguageIcon sx={{ color: "#f19e9e" }} />
                  <Typography variant="body2" className="item-info-user">
                    {listData?.websites?.facebook || unknown()}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", marginTop: "10px" }}>
                  <EmailIcon sx={{ color: "#f19e9e" }} />
                  <Typography variant="body2" className="item-info-user">
                    {listData?.email || unknown()}
                  </Typography>
                </Box>
              </Box>
            </Slide>
          )}
          {/* {Kiểm tra nếu là tab danh sách post thì sẽ render ra } */}
          {type === 2 ? (
            <Box>
              <Box sx={{ borderBottom: 1, borderColor: "#ddd" }}>
                <Tabs
                  value={typePost}
                  onChange={(e, i) => handleChangeTypePost(i)}
                  aria-label="basic tabs example"
                >
                  {listTypePost?.map((e) => {
                    return (
                      <Tab
                        key={e?.key}
                        value={e?.id}
                        label={e?.text}
                        {...a11yProps(e?.key)}
                      />
                    );
                  })}
                </Tabs>
              </Box>
              <RenderTabPanel typePost={typePost} updateType={handleChangeTypePost} id={id} />
            </Box>
          ) : null}
        </Box>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={stateUploadImages.open}
        onClose={handleCloseMessage}
        autoHideDuration={2000}
        key={"Upload image"}
      >
        <Alert onClose={handleCloseMessage} severity={stateUploadImages.type}>
          {stateUploadImages.text}
        </Alert>
      </Snackbar>
      <RenderFormChangePassword
        isOpen={openModalPassWord}
        handleClose={handleCloseChangePassWord}
      />
    </>
  );
}
function a11yProps(index) {
  return {
    id: `item-info-user-tab-${index}`,
    "aria-controls": `item-info-user-tabpanel-${index}`,
    sx: { "&.Mui-selected": { color: "rgb(254, 146, 146)" } },
  };
}
