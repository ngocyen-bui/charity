import { Box, Breadcrumbs, Container, Link, Typography } from "@mui/material";
import { Header } from "../../components/Header";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import { useState } from "react";
import { Footer, PostUser } from "../../components";
import { getCookie } from "../../utils";
import { listTypePost } from "../../common/post";
// const listTypePost = [
//   {
//     id: 1,
//     text: "Bảng tin",
//     icon: (props) => <HomeOutlinedIcon {...props} />,
//     extraText: "Loại tin",
//     children: [
//       {
//         id: 1,
//         text: "Trang cá nhân",
//       },
//     ],
//     hadTimeStop: true,
//   },
//   {
//     id: 2,
//     text: "Cho tặng",
//     icon: (props) => <CardGiftcardOutlinedIcon {...props} />,
//     extraText: "Nhận khi bạn cần, cho khi bạn có",
//     children: [
//       {
//         id: 1,
//         text: "Cần giúp đỡ",
//       },
//       {
//         id: 2,
//         text: "Tặng người khác",
//         hadTimeStop: true,
//       },
//     ],
//   },
//   {
//     id: 3,
//     text: "Vận chuyển",
//     icon: (props) => <LocalShippingOutlinedIcon {...props} />,
//     extraText: "",
//     children: [
//       {
//         id: 1,
//         text: "Tìm người vận chuyển",
//       },
//       {
//         id: 2,
//         text: "Nhận vận chuyển",
//         hadTimeStop: true,
//       },
//     ],
//   },
//   {
//     id: 4,
//     text: "Công việc",
//     icon: (props) => <BusinessCenterOutlinedIcon {...props} />,
//     extraText: "",
//     extraText: "",
//     children: [
//       {
//         id: 1,
//         text: "Cần tìm việc",
//       },
//       {
//         id: 2,
//         text: "Tuyển dụng",
//         hadTimeStop: true,
//       },
//     ],
//   },
//   {
//     id: 5,
//     text: "Chỗ ở",
//     icon: (props) => <HouseOutlinedIcon {...props} />,
//     extraText: "",
//     extraText: "",
//     children: [
//       {
//         id: 1,
//         text: "Tìm chỗ ở",
//       },
//       {
//         id: 2,
//         text: "Hỗ trọ chỗ ở",
//         hadTimeStop: true,
//       },
//     ],
//   },
//   {
//     id: 6,
//     text: "Chợ yêu thương",
//     icon: (props) => <LocalGroceryStoreOutlinedIcon {...props} />,
//     extraText: "",
//     extraText: "",
//     children: [
//       {
//         id: 1,
//         text: "Tìm nhà cung cấp",
//       },
//       {
//         id: 2,
//         text: "Nhà cung cấp",
//         hadTimeStop: true,
//       },
//     ],
//   },
// ];

export default function Post() {
  const [type, setType] = useState();
  const [extraType, setExtraType] = useState();
  const infoUserString =
    getCookie(typeof document !== "undefined" ? document.cookie : "", "auth") ||
    "";
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
  return (
    <>
      <Header isShowSubBar={false} />
      <Container maxWidth="md">
        {infoUserString?.length > 0 ? (
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
              <Link className="text-link" onClick={handleClickDetailListPost}>
                Tìm hiểu chi tiết danh mục tin đăng
              </Link>
            </Box>
          </>
        ) : (
          <div>Please login</div>
        )}
      </Container>
      <Footer />
    </>
  );
}
