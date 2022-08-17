import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";

const homepage  = {
    id: 2,
    type: 1,
    text: "Tặng người khác",
}

const persionalPage = {
    id: 6,
    type: 2,
    text: "Trang cá nhân",
}

const needHelp ={
    id: 5,
    type: 4,
    text: "Cần giúp đỡ",
}

const giveSomeoneElse = {
    id: 6,
    type: 3,
    text: "Tặng người khác",
    hadTimeStop: true,
}

const findCarrier = {
    id: 8,
    type: 4,
    text: "Tìm người vận chuyển",
}
const getShipping = {
    id: 9,
    type: 3,
    text: "Nhận vận chuyển",
    hadTimeStop: true,
}
const findJob = {
    id: 11,
    type: 4,
    text: "Cần tìm việc",
}

const recruit = {
    id: 7,
    type: 3,
    text: "Tuyển dụng",
    hadTimeStop: true,
}

const findPlace = {
    id: 14,
    type: 4,
    text: "Tìm chỗ ở",
}


const supportPlace = {
    id: 15,
    type: 3,
    text: "Hỗ trọ chỗ ở",
    hadTimeStop: true,
}

const findSupplier  = {
    id: 17,
    type: 4,
    text: "Tìm nhà cung cấp",
}

const supportSupplier = {
    id: 18,
    type: 3,
    text: "Nhà cung cấp",
    hadTimeStop: true,
}

const listExtraPost = [
    homepage,
    persionalPage,
    needHelp,
    giveSomeoneElse,
    findCarrier,
    getShipping,
    findJob,
    recruit,
    findPlace,
    supportPlace,
    findSupplier,
    supportSupplier
]


const news = {
    id: 1,
    text: "Bảng tin",
    icon: (props) => <HomeOutlinedIcon {...props} />,
    extraText: "Loại tin",
    children: [
        homepage,
        persionalPage,
    ]
}


const takeGive ={
    id: 4,
    text: "Cho tặng",
    icon: (props) => <CardGiftcardOutlinedIcon {...props} />,
    extraText: "",
    children: [
        needHelp,
        giveSomeoneElse,
    ]
}
const shipping ={
    id: 12,
    text: "Vận chuyển",
    icon: (props) => <LocalShippingOutlinedIcon {...props} />,
    extraText: "",
    children: [
        findCarrier,
        getShipping,
    ]
}
const job = {
    id: 25,
    text: "Công việc",
    icon: (props) => <BusinessCenterOutlinedIcon {...props} />,
    extraText: "",
    children: [
        findJob,
        recruit,
    ]
}

const place = {
    id: 35,
    text: "Chỗ ở",
    icon: (props) => <HouseOutlinedIcon {...props} />,
    extraText: "",
    children: [
        findPlace,
        supportPlace,
    ]
}

const market = {
    id: 3,
    text: "Chợ yêu thương",
    icon: (props) => <LocalGroceryStoreOutlinedIcon {...props} />,
    extraText: "",
    children: [
        findSupplier,
        supportSupplier
    ]
}

const listTypePost = [
    news,
    takeGive,
    shipping,
    job,
    place,
    market
]

export {
    listExtraPost,
    listTypePost,
    news,
    takeGive,
    shipping,
    job,
    place,
    market,
    homepage,
    persionalPage,
    needHelp,
    giveSomeoneElse,
    findCarrier,
    getShipping,
    findJob,
    recruit,
    findPlace,
    supportPlace,
    findSupplier,
    supportSupplier

}