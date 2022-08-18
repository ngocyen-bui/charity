import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import { carrier, formSupport, infoExperiance, infoGender, infoLevelOfEducation, kindJob, kindOfAccommodation, kindPaySalary, kindProduct, kindTransport, listSupport } from "./optionPost";

const homepage  = {
    id: 2,
    type: 1,
    text: "Trang chủ",
    fieldExtra: []
}

const persionalPage = {
    categoryId: 16,
    id: 6,
    type: 2,
    text: "Trang cá nhân",
    fieldExtra: []
}

const needHelp = {
    categoryId: 4,
    id: 5,
    type: 4,
    text: "Cần giúp đỡ",
    fieldExtra: [ 
        listSupport,
    ]
}

const giveSomeoneElse = {
    categoryId: 4,
    id: 6,
    type: 3,
    text: "Tặng người khác",
    fieldExtra: [ 
        listSupport,
        formSupport,
    ]
}

const findCarrier = {
    categoryId: 12,
    id: 8,
    type: 4,
    text: "Tìm người vận chuyển",
    fieldExtra: [ 
        kindTransport,
        kindProduct,
    ]
}
const getShipping = {
    categoryId: 12,
    id: 9,
    type: 3,
    text: "Nhận vận chuyển",
    fieldExtra: [ 
        kindTransport,
        kindProduct,
    ]
}
const findJob = {
    categoryId: 25,
    id: 11,
    type: 4,
    text: "Cần tìm việc",
    fieldExtra: [ 
        carrier,
        kindJob,
        kindPaySalary,
    ], 
    moreInfomation: [
        infoGender, 
        infoExperiance,
        infoLevelOfEducation
    ]
}

const recruit = {
    categoryId: 25,
    id: 7,
    type: 3,
    text: "Tuyển dụng",
    fieldExtra: [ 
        carrier,
        kindJob,
        kindPaySalary,
    ], 
    moreInfomation: [
        infoGender, 
        infoExperiance,
        infoLevelOfEducation
    ]
}

const findPlace = {
    categoryId: 35,
    id: 14,
    type: 4,
    text: "Tìm chỗ ở",
    fieldExtra: [ 
        kindOfAccommodation
    ]
    
}


const supportPlace = {
    categoryId: 35,
    id: 15,
    type: 3,
    text: "Hỗ trợ chỗ ở",
    fieldExtra: [ 
        kindOfAccommodation
    ]
}

const findSupplier  = {
    categoryId: 3,
    id: 17,
    type: 4,
    text: "Tìm nhà cung cấp",
    fieldExtra: [ 
        listSupport,
    ]
}

const supportSupplier = {
    categoryId: 3,
    id: 18,
    type: 3,
    text: "Nhà cung cấp",
    fieldExtra: [ 
        listSupport,
    ]
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
    ],
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