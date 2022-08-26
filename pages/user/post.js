import { Box, Breadcrumbs, Container, Typography } from "@mui/material";
import { Header } from "../../components/Header"; 
import { useState } from "react";
import { Footer, PostUser } from "../../components";
import { listTypePost } from "../../common/post";
import { getCookie } from "cookies-next";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"; 

import * as React from 'react'; 
import Link from "next/link";
export default function Post() {
  const [type, setType] = useState();
  const [extraType, setExtraType] = useState();
  const infoUserString = getCookie("auth"); 
  const handleClickDetailListPost = () => {
  };
  const handleChooseTypePost = (e) => {
    setType(e);
  };
  const handleBackListType = () => {
    setType(null);
  };
  const handleBackListExtraType = () => {
    setExtraType(null);
  };
  const handleChooseExtraTypePost = (e) => {
    setExtraType(e); 
  };
  const infoUser =  getCookie("auth") && JSON.parse(infoUserString);
  
  return (
    <>
      <Header isShowSubBar={false} type={52} />
      <Container maxWidth="md">
          <>
            {type ? (
              <Box sx={{ paddingTop: "24px" }}>
                <Typography
                  sx={{
                    fontSize: "12px",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  variant="body2"
                  onClick={
                    extraType ? handleBackListExtraType : handleBackListType
                  }
                >
                  Trở về
                </Typography>
                {extraType ? (
                  <Box sx={{ marginTop: "8px" }}>
                    <Breadcrumbs aria-label="breadcrumb">
                      <Typography
                        variant="h5"
                        fontSize="small"
                        onClick={handleBackListExtraType}
                        sx={{ cursor: "pointer" }}
                      >
                        {type?.text}
                      </Typography>
                      <Typography variant="h5" fontSize="small">
                        {extraType?.text}
                      </Typography>
                    </Breadcrumbs>
                    <PostUser data={extraType} />
                  </Box>
                ) : (
                  <>
                    <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                      {type?.extraText}
                    </Typography>
                    <Box className="list-cate">
                      {type?.children?.map((e) => { 
                        if(infoUser?.type === 1 && e.id === 2) return <></>
                        return (
                          <Box
                            className="item-cate"
                            key={e?.id}
                            onClick={() => handleChooseExtraTypePost(e)}
                          >
                            <Box sx={{ display: "flex", gap: 1 }}>
                              {e?.icon &&
                                e.icon({ fontSize: "medium", color: "#ddd" })}
                              <Typography
                                sx={{ fontSize: "14px", lineHeight: "24px" }}
                              >
                                {e?.text}
                              </Typography>
                            </Box>
                            <ArrowForwardIosIcon
                              sx={{ fontSize: "12px", height: "20px" }}
                            />
                          </Box>
                        );
                      })}
                    </Box>
                  </>
                )}
              </Box>
            ) : (
              <Box>
                <Typography variant="h6" sx={{ marginBottom: "10px", marginTop: '24px' }}>
                  Chọn danh mục tin đăng
                </Typography>
                <Box className="list-cate">
                  {listTypePost?.map((e) => {
                    return (
                      <Box
                        className="item-cate"
                        key={e?.id}
                        onClick={() => handleChooseTypePost(e)}
                      >
                        <Box sx={{ display: "flex", gap: 1 }}>
                          {e?.icon &&
                            e.icon({ fontSize: "medium", color: "#ddd" })}
                          <Typography
                            sx={{ fontSize: "14px", lineHeight: "24px" }}
                          >
                            {e?.text}
                          </Typography>
                        </Box>
                        <ArrowForwardIosIcon
                          sx={{ fontSize: "12px", height: "20px" }}
                        />
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}

            <Box sx={{ textAlign: "center", padding: "10px 0" }}>
              <Link href={'#'} className="text-link" onClick={handleClickDetailListPost}>
                Tìm hiểu chi tiết danh mục tin đăng
              </Link>
            </Box> 
          </>
      </Container>
      <Footer />
    </>
  );
}
