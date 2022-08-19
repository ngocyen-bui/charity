import { Box, Container, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import React from "react" 
import { listExtraPost } from "../../../common/post"
import { Header } from "../../../components/Header"
import { PostUser } from "../../../components/PostUser"
import { getPost } from "../../../features/users/postAPI"

 

export default function DetailPost (){
    const router = useRouter()
    const {id} = router.query;  
    const {data: infoPost, isFetching} = useQuery(['post', id], ()=> getPost({id}), {enabled: Boolean(id)}); 
    const data = listExtraPost.find(e=> e.categoryId === infoPost?.data?.data?.categoryId);
    if (isFetching)
    return (
      <Box sx={{ alignItems: "center" }}>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "20px",
            color: "#6a6a6a",
            lineHeight: "100px",
          }}
        >
          Loading...
        </Typography>
      </Box>
    );
    return (
        <>
        <Header isShowSubBar={false}/>
        <Container maxWidth="md">
            <Box sx={{padding: '24px'}}>
                {infoPost && <PostUser data={data} dataPost={infoPost?.data?.data} />}
               

            </Box>
        </Container>
        </>
    )
}