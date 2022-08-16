import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { getPostOfUser, updateStatusPost } from "../../features/users/userAPI";
import { useQuery } from "@tanstack/react-query";
import { listTypePost, showing, stoped } from "../../common/user";
import { linkImage } from "../../features/Image";
import Image from "next/image";
import moment from "moment";
import { useState } from "react";

import { useRouter } from "next/router";
import { Message } from "../Message";

export { RenderTabPanel };
const edit =  {id: 1, key: '1', text:'Chỉnh sửa tin'}
const stop = {id: 2, key: '2', text:'Tạm dừng tin'}
const active = {id: 3, key: '3', text:'Kích hoạt tin'}
const optionsStop = [
  edit,
  stop
];
const optionsActive = [
  edit, 
  active
];
const RenderTabPanel = ({ typePost,updateType }) => {
  const router = useRouter();
  const item = listTypePost.find((e) => e.id === typePost * 1);
  const initFilter = {
    page: 1,
    size: 100,
    creatorId: 1209,
    isAvailable: item?.isAvailable,
    status: item?.status,
  };
  const filter =
    "?" +
    new URLSearchParams(JSON.parse(JSON.stringify(initFilter))).toString();
  const { data: listDataPostFromApi, isFetching } = useQuery(
    ["posts", initFilter],
    () => getPostOfUser({ filter })
  );

  const [stateUpdateStatusPost, setStateUpdateStatusPost] = useState({
    state: false,
    message: "Cập nhật thành công",
    type: "success",
  });

  let options = optionsStop;
  if(typePost === stoped?.id){
    options = optionsActive;
  }
  const listItemPost = listDataPostFromApi?.data?.data;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => { 
    setAnchorEl(null);
  };
  const handleClickMenu = (type,id)=>{
    handleClose()
    if(type === edit.id){
      return router.push('/user/post/'+id)
     }
     let status = {}

    if(type === stop?.id){
     status = { status: stoped?.status }
    }
    if(type === active?.id){
      status = { status: showing?.status }
    }
    return updateStatusPost({ id: id, data:status  })
      .then(() =>{
        setStateUpdateStatusPost({ ...stateUpdateStatusPost, open: true })
        updateType( status?.status);
      }
      )
      .catch(() =>
        setStateUpdateStatusPost({
          message: "Cập nhật thât bại",
          type: "error",
          open: true,
        })
      );
  }

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
    <TabPanel value={typePost} index={typePost}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {listItemPost?.length > 0 ? (
          <Grid container spacing={1}>
            {listItemPost?.map((e) => {
              return (
                <Grid item xs={6} key={e?.id}>
                  <Paper
                    className="animate__animated animate__backInUp"
                    variant="outlined"
                    sx={{ padding: "24px", cursor: "pointer" }}
                  >
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
                          sx={{ width: 56, height: 56,
                            boxShadow: '0px 4px 10px #ddd' }}
                          src={
                            linkImage(e?.creator?.images?.image) ||
                            linkImage(defaultAvatarImage)
                          }
                        ></Avatar>
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
                            {e?.creator?.name}
                          </Typography>
                          <Stack direction="row" spacing={1}>
                            <Chip
                              size="small"
                              label="Cá nhân"
                              color="primary"
                            />
                            <Chip
                              size="small"
                              label="Nhà cung cấp"
                              color="success"
                            />
                          </Stack>
                        </Box>
                      </Box>
                      <IconButton
                        sx={{ color: "rgb(254, 146, 146)" }}
                        component="label"
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <MoreHorizIcon />
                      </IconButton>
                      <Menu
                        id="long-menu"
                        MenuListProps={{
                          'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                          style: {
                            maxHeight: 20 * 4.5,
                            width: '20ch',
                          },
                        }}
                      >
                        {options.map((option) => {
                          if(typePost === item?.id){
                            return  <MenuItem key={option?.id} value={option?.key} onClick={() => handleClickMenu(option?.id,e?.id)}>
                              {option?.text}
                            </MenuItem>
                          }

                          return  <MenuItem key={option?.id} value={option?.key} onClick={() => handleClickMenu(option?.id,e?.id)}>
                          {option?.text}
                        </MenuItem>
                        })}
                      </Menu>
                    </Box>
                    <Box
                      sx={{
                        borderBottom: "1px solid #ddd",
                        marginTop: "10px",
                      }}
                    >
                      <Image
                        src={linkImage(e?.images?.image)}
                        width="340px"
                        height="260px"
                        style={{ borderRadius: "10px" }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          minHeight: "50px",
                          fontWeight: "600",
                          fontSize: "18px",
                          margin: "10px 0 16px 0",
                        }}
                        className="text-two-line"
                      >
                        {e?.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontSize: "12px", height: '40px', lineHeight: '20px' }}
                        className="text-two-line"
                      >
                        {e?.content}
                      </Typography>
                      <Typography variant="body2">
                        {moment(e?.updatedAt).format("HH:mm - DD/MM/yyyy") +
                          " - Toàn quốc"}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Typography variant="h6" component="p">
            Rất tiếc, chúng tôi không tìm thấy kết quả nào phù hợp
          </Typography>
        )}

        <Button
          sx={{
            width: "100%",
            maxWidth: "300px",
            textTransform: "initial",
            marginTop: "12px",
          }}
          variant="contained"
          size="small"
          disabled
        >
          Bạn đã xem đến cuối danh sách
        </Button>
      </Box>

      <Message {...stateUpdateStatusPost}/>
    </TabPanel>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`post-tabpanel-${index}`}
      aria-labelledby={`post-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
