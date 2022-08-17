import { Avatar, Box, Button, Container, Grid, Typography } from "@mui/material";
import { Header } from "../../components";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getFollowerOfUser } from "../../features/users/userAPI";
import { useEffect } from "react";
import Image from "next/image";
import { linkImage } from "../../features/Image";
import { defaultAvatarImage, listTypeAccount } from "../../common/user";




export default function FollowerUser() {
    const router = useRouter()
    const {id, name} = router.query;
    const handleBackRouter = () => {
        router.back()
    }
    const initFilter ={
        followState:-1,
        createdFrom: undefined,
        createdTo:undefined,
        page:undefined,
        size:undefined,
        sortedBy:undefined,
        status:1,
        memberId:id,
        name: name,
        id: id*1 
    }
    const filter =
    "?" +
    new URLSearchParams(JSON.parse(JSON.stringify(initFilter))).toString();
    const {data: dataFollower} = useQuery(['follower', id], ()=> getFollowerOfUser({filter}),{enabled: Boolean(id)} )

    const listFollowers = dataFollower?.data?.data;
    const pageInfo = dataFollower?.data?.pageInfo;
    console.log(initFilter)
    // useEffect(() => {
    //     router.replace({
    //       query: { ...JSON.parse(JSON.stringify(initFilter))},
    //   });
    // }, [id]);

    return (
      <>
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
              onClick={handleBackRouter}
            >
              Trở về
            </Typography>
            <Typography variant="h6">
              Danh sách yêu thương ({pageInfo?.total})
            </Typography>
            <Typography variant="body2" sx={{paddingBottom: '10px'}}>
              Xem ngay những tài khoản đã trao yêu thương đến {name}
            </Typography>

            {dataFollower?<Grid container spacing={2}>
              {listFollowers?.map(follower => {
                const typeAccount = listTypeAccount.find(e => e.type === follower?.member?.type); 
                return (
                  <Grid item xs={4} key={follower?.id} className="animate__animated animate__backInUp">
                    <Box
                      sx={{
                        boxShadow: "0px 4px 10px #ddd ",
                        padding: "12px",
                        border: "1px solid #ddd",
                        background: "#fff",
                        display: "flex",
                        gap: "16px",
                      }}
                    >
                      <Avatar
                        sx={{
                          width: "50px",
                          height: "50px",
                          border: "1px solid rgb(221, 221, 221)",
                        }}
                      >
                        <Image
                          style={{
                            objectFit: "cover",
                          }}
                          width="100%"
                          height="100%"
                          src={
                            follower?.member?.images?.avatar
                              ? linkImage(follower?.member?.images?.avatar)
                              : linkImage(defaultAvatarImage)
                          }
                          alt="avatar"
                        ></Image>
                      </Avatar>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "8px",
                        }}
                      >
                        <Typography>{follower?.member?.name}</Typography>
                        <Typography
                          sx={{
                            backgroundColor: typeAccount?.color,
                            fontSize: "12px",
                            borderRadius: "10px",
                            padding: "0 8px",
                            width: "fit-content",
                          }}
                        >
                          {typeAccount?.text}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>: <>Loading...</>
            }
          </Box>

          <Box sx={{textAlign: 'center'}}>
            <Button
              sx={{
                width: "100%",
                maxWidth: "300px",
                textTransform: "initial",
                marginTop: "12px",
                margin: "0 auto",
              }}
              variant="contained"
              size="small"
              disabled
            >
              Bạn đã xem đến cuối danh sách
            </Button>
          </Box>
        </Container>
      </>
    );
}