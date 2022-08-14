import { Box, Container } from "@mui/system";
import { Header } from "../../components/Header";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArticleIcon from "@mui/icons-material/Article";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinDropIcon from "@mui/icons-material/PinDrop";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import RepeatIcon from "@mui/icons-material/Repeat";
import EditIcon from "@mui/icons-material/Edit";
import PublicIcon from "@mui/icons-material/Public";
import SettingsIcon from "@mui/icons-material/Settings";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  OutlinedInput,
  Slide,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { defaultAvatarImage, defaultImage } from "../../common/user";
import { useState } from "react";
import Link from "next/link";
import { getDetailUser } from "../../features/users/userAPI";
import { linkImage } from "../../features/Image";
import { deleteCookie } from "cookies-next";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const listSetting = [
  {
    id: 1,
    key: "1",
    text: "Chỉnh sửa thông tin",
    icon: <EditIcon sx={{ color: "#000" }} fontSize="small" />,
    url: "/user/edit",
  },
  {
    id: 2,
    key: "2",
    text: "Đổi mật khẩu",
    icon: <RepeatIcon sx={{ color: "#000" }} fontSize="small" />,
    open: true
  },
  {
    id: 3,
    key: "3",
    text: "Ngôn ngữ",
    icon: <PublicIcon sx={{ color: "#000" }} fontSize="small" />,
    children: [],
  },
];
const listType = [
  {
    id: 1,
    text: "Về tôi",
  },
  {
    id: 2,
    text: "Tin của tôi",
  },
];
const listTypePost = [
  {
    id: 0,
    key: '0',
    text: 'Đang hiển thị',
  },
  {
    id: 1,
    key: '1',
    text: 'Tạm ngưng',
  },
  {
    id: 2,
    key: '2',
    text: 'Tin hết hạn',
  }
]
export default function DetailUser() {
  const router = useRouter();
  const { id } = router.query;
  const [anchorEl, setAnchorEl] = useState(null);
  const [type, setType] = useState(1);
  const [typePost, setTypePost] = useState(0);
  const [openModalPassWord, setOpenModalPassWord] = useState(false);

  const handleClickOpenChangePassWord = () => {
    console.log(1)
    setOpenModalPassWord(true);
  };

  const handleCloseChangePassWord = () => {
    setOpenModalPassWord(false);
    handleClose();
  };
  const { data: infoUser } = useQuery(["user", id], () => getDetailUser(id), {
    enabled: Boolean(id),
  });
  const listData = infoUser?.data?.data;
  const unknown = () => {
    return <span className="text-grey">Chưa cập nhật</span>;
  };

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangeType = (e) => {
    setType(e);
  };
  const handleChangeTypePost = (event, newValue) => {
    setTypePost(newValue);
  };
  const handleLogOut = () => {
    deleteCookie('auth')
    deleteCookie('token')
    handleClose();

    router.push('/user/login')

  }
  const renderTabPanel = ({ typePost }) => {
    return (
      <TabPanel value={typePost} index={typePost}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">
            Rất tiếc, chúng tôi không tìm thấy kết quả nào phù hợp {typePost}
          </Typography>
          <Button
            sx={{ width: "100%", maxWidth: "300px", textTransform: "initial", marginTop: '12px' }}
            variant="contained"
            size="small"
            disabled
          >
            Bạn đã xem đến cuối danh sách
          </Button>
        </Box>
      </TabPanel>
    );
  };
  const RenderFormChangePassword = ({isOpen,handleClose}) => {
    return (
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogContent>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
        <OutlinedInput
            margin="dense"
            id={"password"}
            label="Mật khẩu cũ"
            type="password"
            
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  // onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {true ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
         
        </DialogContent>
      </Dialog>
    )
  }
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
          <Box sx={{ position: "absolute", bottom: "10px", right: "10px" }}>
            <IconButton
              sx={{ fontSize: "20px", padding: "0" }}
              aria-label="upload picture"
              component="label"
            >
              <input hidden accept="image/*" type="file" />
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
                }}
              >
                <img
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  src={
                    listData?.images?.avatar
                      ? linkImage(listData?.images?.avatar)
                      : linkImage(defaultAvatarImage)
                  }
                ></img>
              </Avatar>
              <Box sx={{ position: "absolute", bottom: "0", right: "0" }}>
                <IconButton
                  sx={{ fontSize: "20px", padding: "0" }}
                  aria-label="upload picture"
                  component="label"
                >
                  <input hidden accept="image/*" type="file" />
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
                backgroundColor: "rgb(101, 255, 185) ",
                fontSize: "14px",
                borderRadius: "10px",
                padding: "0 8px",
              }}
            >
              Cá nhân
            </Typography>
          </Box>

          <Typography className="name">Name</Typography>
          <Box className="wrapper-info-header">
            <Box className="follower">
              <FavoriteBorderIcon
                sx={{ color: "#f19e9e", marginRight: "8px" }}
              />
              <Typography>0</Typography>
            </Box>
            <Box className="setting">
              <SettingsIcon
                sx={{ color: "#f19e9e", cursor: "pointer" }}
                onClick={handleClick}
              />
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
                  if(e?.open){
                  return  <MenuItem key={e?.text} onClick={handleClickOpenChangePassWord}>
                    <ListItemIcon>{e?.icon}</ListItemIcon>
                    <ListItemText>{e?.text}</ListItemText>
                  </MenuItem>
                  }
                  if (e?.url) {
                    return <Link href={e.url} key={e?.text}>
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>{e?.icon}</ListItemIcon>
                        <ListItemText>{e?.text}</ListItemText>
                      </MenuItem>
                    </Link>
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
          {type === 1 && (
            <Slide
              direction="right"
              in={true}
              timeout={700}
              sx={{ marginLeft: "20px", paddingTop: '8px' }}
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
          {type === 2 ? (
            <>
              <Box sx={{ borderBottom: 1, borderColor: "#ddd" }}>
                <Tabs
                  value={typePost}
                  onChange={handleChangeTypePost}
                  aria-label="basic tabs example"
                >
                  {listTypePost?.map(e => {
                    return <Tab key={e?.key} label={e?.text} {...a11yProps(e?.key)} />
                  })}
                </Tabs>
              </Box>
              {renderTabPanel({ typePost })}
            </>
          ) : null}
        </Box>
      </Container>
      <RenderFormChangePassword isOpen={openModalPassWord} handleClose={handleCloseChangePassWord} />
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
