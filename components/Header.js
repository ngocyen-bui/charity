import { Avatar, Box, Button,Typography } from "@mui/material";
import { Container } from "@mui/system";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PublicIcon from "@mui/icons-material/Public";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect, useState } from "react";
import { BagIcon, CarIcon, GiftIcon, HomeIcon, MarketIcon } from "../utils/CustomIcon";
import Link from "next/link";
import { defaultAvatarImage } from "../common/user";
import { linkImage } from "../features/Image";
import { getCookie, setCookie } from "cookies-next";
import { useQuery } from "@tanstack/react-query";
import { getDetailUser } from "../features/users/userAPI"; 
import { listTypePost } from "../common/post";
import { useRouter } from "next/router";

import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton'; 
import { BootstrapButton } from "../utils";
const navItems = [
  {
    id: 1,
    text: "Trang chủ",
    icon: <HomeOutlinedIcon />,
    url: '/?categoryId=1&memberTypes=%5B2%2C3%5D&page=1&size=12'
  },
  {
    id: 51,
    text: "Cộng đồng",
    icon: <PublicIcon />,
    url: '#'
  },
  {
    id: 52,
    text: "Đăng tin",
    icon: <BorderColorOutlinedIcon />,
    url: '/user/post'
  },
  {
    id: 53,
    text: "Thông báo",
    icon: <NotificationsOutlinedIcon />,
    url: '#'
  },
];

const subNavItems = [
  {
    id: 4,
    text: "Cho tặng",
    icon: <GiftIcon sx={{ fontSize: "16px" }} />,
    url: '/'
  },
  {
    id: 12,
    text: "Vận chuyển",
    icon: <CarIcon sx={{ fontSize: "16px" }} />,
    url: '/'
  },
  {
    id: 25,
    text: "công việc",
    icon: <BagIcon sx={{ fontSize: "16px" }} />,
    url: '/'
  },
  {
    id: 35,
    text: "Chỗ ở",
    icon: <HomeIcon sx={{ fontSize: "16px" }} />,
    url: '/'
  },
  {
    id: 3,
    text: "Chợ yêu thương",
    icon: <MarketIcon sx={{ fontSize: "16px" }} />,
    url: '/'
  },
]; 

function Header({isShowSubBar=true, isChange=false, handleChange, type}) { 
  const router = useRouter()
  const {categoryId} = router.query; 
  const [isNavBarActive, setIsNavBarActive] = useState(type || 1);
  const infoUserString = getCookie('auth')
  let infoUser = infoUserString ? JSON.parse(infoUserString) : {};
  const [openPopup, setOpenPopup] = useState(false)
    
  const closePopUp = ()=>{
    setOpenPopup(false)
  }
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
  useEffect(()=>{
    setIsNavBarActive(categoryId*1)
  },[categoryId])

  const handleClickNavBarItem = (e,val) => {  
    const nav = navItems.find(e => e.id === val*1)
    const acc =  listTypePost.find(e => e.id === val*1) ;
    const accClone = {...acc}
    if(val*1 === 52 && !infoUserString?.length > 0){
      setOpenPopup(true)
      return;
    }


    if(val*1 === 1){
      accClone.children = [
        {
          categoryId: 1, 
          type: 2,
          text: "Tổ chức", 
      },
      {
        categoryId: 1, 
        type: 3,
        text: "Mạnh thường quân", 
    }
      ]
    }
    
    if(val*1 < 50 && typeof(handleChange) ==='function'){  
      setTimeout(() => handleChange(accClone))
    }
    setIsNavBarActive(val);  
    if(nav?.url){
      router.push(nav?.url)
    }
  };  
  return (
    <>
     <Box sx={{position:"fixed", top: '0', right: '0', left: '0', zIndex: '99'}}>
      <div style={isShowSubBar ? {boxShadow: 'none'}: {}} className={"header-layout"} component="nav">
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
            <Box sx={{ display: "flex", gap: 2 }}>
              {infoUserString && infoUserString?.length > 0 ? (
                <>
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
                          textTransform: "none", 
                          borderRadius:' 4px',
                          padding:' 4px 12px',
                          lineHeight: '24px', 
                        }}
                      >
                        Đăng nhập
                      </Typography>
                    </Button>
                  </Link>
                </Box>
              )}
            </Box>
            <Box sx={{ display:  "flex" }}>
              {navItems.map((item) => { 
                return  (
                  <Button
                    id={item.id}
                    key={item.id}
                    onClick={(e) => handleClickNavBarItem(e,item.id)}
                    startIcon={item.icon}
                    style={{
                      color: "#fff",
                      textTransform: "capitalize",
                      lineHeight: "30px",
                      paddingBlock: "0",
                      marginInline: "8px",
                      fontSize: "10px",
                    }}
                    className={
                      isNavBarActive === item?.id ? "isActiveNavBar" : ""
                    }
                  >
                    {item.text}
                  </Button>  )
              })}
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
                  onClick={(e) => handleClickNavBarItem(e,item.id)}
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
    <PopUpRequestLogin openPopup={openPopup} setOpenPopup={closePopUp}/>
    </>
   
  );
} 
export { Header };




const PopUpRequestLogin = ({openPopup, setOpenPopup})=>{
  const router = useRouter()
  const handleClose = () => {
    setOpenPopup(false);
  };
  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openPopup}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        ></BootstrapDialogTitle>
        <DialogContent>
          <Box sx={{textAlign: 'center'}}>
          <img 
              style={{width: '100px', margin: '0 auto'}}
            src={"https://dev-charity.estuary.solutions/popupIcon.svg"}
          ></img>
          </Box>
          <Typography variant="h6" align="center">
            Chào mừng đến với{" "}
          </Typography>
          <Typography variant="h6" align="center">
            Kết nối yêu thương
          </Typography>
          <Typography variant="body1" align="center">
            Cộng đồng từ thiện uy tín, minh bạch
          </Typography>
          <BootstrapButton sx={{color: 'white'}}>
            <Link href="/user/login">Đăng nhập hoặc đăng ký tài khoản</Link>
          </BootstrapButton>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
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
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            fontSize: '16px',
            right: 8,
            top: 8,
            color: '#f19e9e', 
          }}
        >
          Lúc khác
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};


BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};