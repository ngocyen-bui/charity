
import RepeatIcon from "@mui/icons-material/Repeat";
import EditIcon from "@mui/icons-material/Edit";
import PublicIcon from "@mui/icons-material/Public";


const defaultImage = '48aafd7e-c702-495b-b621-6b13fffdc8b2';
const defaultAvatarImage = "b988a14d-d4c0-4b28-84f3-68abe1aa0f30"

const gender = [
  {
    id: 1,
    key: '1',
    text: 'Nam'
  },
  {
    id: 2,
    key: '2',
    text: 'Nữ'
  }
]

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
const showing = {
  id: 0,
  key: '0',
  text: 'Đang hiển thị',
  status: 1,
  isAvailable: 1,
}
const stoped = {
  id: 1,
  key: '1',
  text: 'Tạm ngưng',
  status: -1,
  isAvailable: 1,
}
const ended = {
  id: 2,
  key: '2',
  text: 'Tin hết hạn',
  isAvailable: -1,
}
const listTypePostDetails = [
  showing,
  stoped,
  ended
]

const persional = {
 id: 1,
 key: '1',
 text: 'Cá nhân',
 type: 1,
 color: 'rgb(101, 255, 185)'
}

const  sponsor ={
  id: 3,
  key: '3',
  text: 'Mạnh thường quân',
  type: 3,
  color: 'orange'
}
const organization = {
  id: 2,
  key: '2',
  text: 'Tổ chức',
  type: 2,
  color: '#91aeed'
}


const listTypeAccount = [ persional,
  sponsor,
  organization]

export {
  defaultImage,
  defaultAvatarImage,
  gender,
  listSetting,
  listType,
  listTypePostDetails,
  showing,
  stoped,
  ended,
  persional,
  sponsor,
  organization,
  listTypeAccount
}