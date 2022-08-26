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
import {
  defaultAvatarImage,
  defaultImage,
  ended,
  listTypeAccount,
  listTypePostDetails,
  showing,
  stoped,
} from "../../common/user";
import { linkImage } from "../../features/Image";
import Image from "next/image";
import moment from "moment";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { Message } from "../Message";
import { listExtraPost } from "../../common/post";

export { RenderTabPanel };
const edit = { id: 1, key: "1", text: "Chỉnh sửa tin" };
const stop = { id: 2, key: "2", text: "Tạm dừng tin" };
const active = { id: 3, key: "3", text: "Kích hoạt tin" };
const optionsStop = [edit, stop];
const optionsActive = [edit, active];

const RenderTabPanel = ({ typePost, updateType, id }) => {
  const router = useRouter();
  const item = listTypePostDetails.find((e) => e.id === typePost * 1);
  const initFilter = {
    page: 1,
    size: 100,
    creatorId: id,
    isAvailable: item?.isAvailable,
    status: item?.status,
  }; 
  const filter =
    "?" +
    new URLSearchParams(JSON.parse(JSON.stringify(initFilter))).toString();
  useEffect(() => {
      router.replace({
        query: { ...JSON.parse(JSON.stringify(initFilter)), id: id },
    });
  }, [typePost]);
  const { data: listDataPostFromApi, isFetching } = useQuery(
    ["posts", initFilter],
    () => getPostOfUser({ filter })
  );
    const [itemClick, setItemClick] = useState()
  const [stateUpdateStatusPost, setStateUpdateStatusPost] = useState({
    state: false,
    message: "Cập nhật thành công",
    type: "success",
    time: 1000,
  });

  let options = optionsStop;
  if (typePost === stoped?.id) {
    options = optionsActive;
  }
  const listItemPost = listDataPostFromApi?.data?.data;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event, element) => {
    setAnchorEl(event.currentTarget);
    setItemClick(element)
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickMenu = (type) => {  
    const id = itemClick;
    handleClose();
    if (type === edit.id) {
      return router.push("/user/post/" + id);
    }
    let status = {};
    let idMenu = 0;
    if (type === stop?.id) {
      status = { status: stoped?.status };
      idMenu = stoped?.id;
    } else if (type === active?.id) {
      status = { status: showing?.status };
      idMenu = showing?.id;
    }
    return updateStatusPost({ id: id, data: status })
      .then(() => {
        setStateUpdateStatusPost({ ...stateUpdateStatusPost, state: true });
        return updateType(idMenu);
      })
      .catch((err) => {
        return setStateUpdateStatusPost({
          message: err?.response?.data?.message || "Cập nhật thất bại",
          type: "error",
          state: true,
        });
      });
  };
  const handleCloseMessage = () => {
    setStateUpdateStatusPost({ ...stateUpdateStatusPost,state: false });
  };
  const handleClickDetailPost = (id)=>{
    router.push(`/gift/${id}`)
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
    <TabPanel value={typePost} index={typePost} >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {listItemPost?.length > 0 ? (
          <Grid container spacing={1} >
            {listItemPost?.map((e) => {
              const typeAccount = listTypeAccount.find(
                (t) => t.type * 1 === e?.creator?.type * 1
              );
              const typePost = listExtraPost.find(t => t.type === e.type)
              return (
                <Grid item xs={6} key={e?.id} >
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
                          sx={{
                            width: 56,
                            height: 56,
                            boxShadow: "0px 4px 10px #ddd",
                          }}
                          src={
                            e?.creator?.images?.avatar?
                            linkImage(e?.creator?.images?.avatar) :
                            linkImage(defaultAvatarImage)
                          }
                          onClick={()=>handleClickDetailPost(e?.id)}
                        ></Avatar>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                          onClick={()=>handleClickDetailPost(e?.id)}
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
                              label={typeAccount?.text}
                              sx={{ background: typeAccount?.color }}
                            />
                            <Chip
                              size="small"
                              label={typePost.text}
                              sx={{ background: 'orange', lineHeight: '24px' }}
                            />
                          </Stack>
                        </Box>
                      </Box>
                      {(item?.id !== ended?.id )&& <IconButton
                        sx={{ color: "rgb(254, 146, 146)" }}
                        component="label"
                        aria-haspopup="true"
                        onClick={(i) => handleClick(i, e?.id)}
                      >
                        <MoreHorizIcon />
                      </IconButton>}
                    </Box>
                    <Box
                      sx={{
                        borderBottom: "1px solid #ddd",
                        marginTop: "10px",
                      }}
                    >
                      <Image
                        src={linkImage(e?.images?.image || defaultImage)}
                        width="340px"
                        height="260px"
                        objectFit="cover"
                        style={{ borderRadius: "10px" }}
                        alt="Image"
                        onClick={()=>handleClickDetailPost(e?.id)}
                      />
                    </Box>
                    <Box onClick={()=>handleClickDetailPost(e?.id)}> 
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
                        sx={{
                          fontSize: "12px",
                          height: "40px",
                          lineHeight: "20px",
                        }}
                        className="text-two-line"
                      >
                        {e?.content}
                      </Typography>
                      <Typography variant="body2">
                        {moment(e?.updatedAt).format("HH:mm - DD/MM/yyyy") +
                          " - " + (e?.city?.name || 'Toàn quốc')}
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

      <Message
        {...stateUpdateStatusPost}
        handleCloseMessage={handleCloseMessage}
      />
      <Menu
        id="short-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 20 * 4.5,
            width: "20ch",
          },
        }}
      >
        {options?.map((option) => {
          return (
            <MenuItem
              key={option?.id}
              value={option?.key}
              onClick={() => handleClickMenu(option?.id)}
            >
              {option?.text}
            </MenuItem>
          );
        })}
      </Menu>
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
