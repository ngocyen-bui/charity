import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Container } from "@mui/system";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PublicIcon from "@mui/icons-material/Public";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import { CarIcon, GiftIcon } from "../utils/CustomIcon";
import Link from "next/link";
import { defaultAvatarImage } from "../common/user";
import { linkImage } from "../features/Image";
import { getCookie, setCookie } from "cookies-next";
import { useQuery } from "@tanstack/react-query";
import { getDetailUser } from "../features/users/userAPI";
import { useRouter } from "next/router";
export { Header };
const navItems = [
  {
    id: 1,
    text: "Trang chủ",
    icon: <HomeOutlinedIcon />,
    url: '/'
  },
  {
    id: 2,
    text: "Cộng đồng",
    icon: <PublicIcon />,
    url: '/'
  },
  {
    id: 3,
    text: "Đăng tin",
    icon: <BorderColorOutlinedIcon />,
    url: '/user/post'
  },
  {
    id: 4,
    text: "Thông báo",
    icon: <NotificationsOutlinedIcon />,
    url: '/'
  },
];

const subNavItems = [
  {
    id: 5,
    text: "Cho tặng",
    icon: <GiftIcon sx={{ fontSize: "16px" }} />,
    url: '/'
  },
  {
    id: 6,
    text: "Vận chuyển",
    icon: <CarIcon sx={{ fontSize: "16px" }} />,
    url: '/'
  },
  {
    id: 7,
    text: "công việc",
    icon: <GiftIcon sx={{ fontSize: "16px" }} />,
    url: '/'
  },
  {
    id: 8,
    text: "Chỗ ở",
    icon: <GiftIcon sx={{ fontSize: "16px" }} />,
    url: '/'
  },
  {
    id: 9,
    text: "Chợ yêu thương",
    icon: <GiftIcon sx={{ fontSize: "16px" }} />,
    url: '/'
  },
];

function Header({isShowSubBar=true, isChange=false}) {
  const router = useRouter()
  const [isNavBarActive, setIsNavBarActive] = useState(1);
  const infoUserString = getCookie('auth')
  let infoUser = infoUserString ? JSON.parse(infoUserString) : {};
    
  const { data } = useQuery(["user", infoUser], () => getDetailUser(infoUser?.id), {enabled: isChange});
  useEffect(()=>{
    const auth = {
      id: data?.data?.data?.id,
      images: data?.data?.data?.images,
      memberVerify: data?.data?.data?.memberVerify,
      name: data?.data?.data?.name,
      totalBeingFollowed: data?.data?.data?.totalBeingFollowed,
      type: data?.data?.data?.type
    }
    if(data?.data?.data){
        setCookie('auth', auth)
    }
  },[data])
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleClickNavBarItem = (val) => {
    setIsNavBarActive(val * 1);
  };
  return (
    <>
     <Box sx={{position:"fixed", top: '0', right: '0', left: '0', zIndex: '99'}}>
      <div position="static" style={isShowSubBar ? {boxShadow: 'none'}: {}} className={"header-layout"} component="nav">
        <Container maxWidth="md">
          <Box
            sx={{
              display: "flex",
              paddingBlock: "8px",
              gap: 1,
              overflow: "auto",
              justifyContent: "space-between",
              "& > *": {
                scrollSnapAlign: "center",
              },
              "::-webkit-scrollbar": { display: "none" },
            }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ display: "flex", gap: 2 }}>
              {infoUserString && infoUserString?.length > 0 ? (
                <>
                  {/* { infoUser?.name[0]} */}
                  <Box>
                    <Avatar sx={{ width: "34px", height: "34px", border: '1px solid rgb(221, 221, 221)' }}>
                      <img
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                        src={
                          infoUser?.images?.avatar
                            ? linkImage(infoUser?.images?.avatar)
                            : linkImage(defaultAvatarImage)
                        }
                        alt="avatar"
                      ></img>
                    </Avatar>
                  </Box>
                  <Box
                    sx={{
                      textTransform: "uppercase",
                      color: "white",
                      fontSize: "0.875rem",
                    }}
                  >
                    <Link href={"/user/" + infoUser?.id}>{infoUser?.name}</Link>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <FavoriteBorderIcon fontSize="small" />
                      <span> {infoUser?.totalBeingFollowed}</span>
                    </Box>
                  </Box>
                </>
              ) : (
                <Box>
                  <Link href="/user/login">
                    <Button size="small" className="btn-header-login">
                      <Typography
                        style={{
                          fontSize: "12px",
                          padding: "2px 4px",
                          textTransform: "none",
                        }}
                      >
                        Đăng nhập
                      </Typography>
                    </Button>
                  </Link>
                </Box>
              )}
            </Box>
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              {navItems.map((item) => (
                <Link href={item.url} key={item.id}>
                  <Button
                    id={item.id}
                    className={
                      isNavBarActive === item.id ? "isActiveNavBar" : ""
                    }
                    onClick={() => handleClickNavBarItem(item.id)}
                    startIcon={item.icon}
                    style={{
                      color: "#fff",
                      textTransform: "capitalize",
                      lineHeight: "30px",
                      paddingBlock: "0",
                      marginInline: "8px",
                      fontSize: "10px",
                    }}
                  >
                    {item.text}
                  </Button>
                </Link>
              ))}
            </Box>
          </Box>
        </Container>
      </div>
      {isShowSubBar && (
        <div className="header-sub-menu">
          <Container maxWidth="md">
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                },
                justifyContent: "space-between",
                px: 2,
              }}
            >
              {subNavItems.map((item) => (
                <Button
                  id={item.id}
                  className={
                    isNavBarActive === item.id ? "isActiveSubNavBar" : ""
                  }
                  onClick={() => handleClickNavBarItem(item.id)}
                  key={item.id}
                  style={{
                    width: "100px",
                    display: "flex",
                    padding: 0,
                    color: "black",
                    flexDirection: "column",
                    textTransform: "capitalize",
                    fontSize: "9px",
                    padding: "4px",
                  }}
                >
                  {item.icon}
                  <Typography style={{ fontSize: "10px", marginTop: "3px" }}>
                    {item.text}
                  </Typography>
                </Button>
              ))}
            </Box>
          </Container>
        </div>
      )}
    </Box>
    <Box sx={{height: isShowSubBar?'107px':'55px'}}></Box>
    </>
   
  );
}
