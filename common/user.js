
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
const transportProductType = [
    {
        id: 1,
        key: '1',
        vnText: 'Xe máy',
        enText: 'Motorbike'
    },
    {
        id: 2,
        key: '2',
        vnText: 'Xe oto',
        enText: 'Car'
    },
    {
        id: 3,
        key: '3',
        vnText: 'Xe ba gác',
        enText: 'Cargo tricycle'
    },
    {
        id: 4,
        key: '4',
        vnText: 'Xe VAN 500kg',
        enText: '500kg Van'
    },
    {
        id: 5,
        key: '5',
        vnText: 'Xe VAN 1000kg',
        enText: '1000kg Van '
    },
    {
        id: 6,
        key: '6',
        vnText: 'Xe tải 500kg',
        enText: '500kg Truck'
    },
    {
        id: 7,
        key: '7',
        vnText: 'Xe tải 1000kg',
        enText: '1000kg Truck'
    },
    {
        id: 8,
        key: '8',
        vnText: 'Xe tải 2000kg',
        enText: '2000kg Truck'
    },
    {
        id: 9,
        key: '9',
        vnText: 'Khác',
        enText: 'Other'
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
  const listTypePost = [
    {
      id: 0,
      key: '0',
      text: 'Đang hiển thị',
      status: 1,
      isAvailable: 1,
    },
    {
      id: 1,
      key: '1',
      text: 'Tạm ngưng',
      status: -1,
      isAvailable: 1,
    },
    {
      id: 2,
      key: '2',
      text: 'Tin hết hạn',
      isAvailable: -1,
    }
  ]
export {
    defaultImage,
    defaultAvatarImage,
    gender,
    transportProductType,
    listSetting,
    listType,
    listTypePost
}