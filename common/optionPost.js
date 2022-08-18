import { listKindAccomodation } from "./listOption/accommodation"
import { listExperiance } from "./listOption/experiance"
import { listGender } from "./listOption/gender"
import { listCarrier, listKindJob, listKindPaySalary } from "./listOption/job"
import { listLevelOfEducation } from "./listOption/listLevelOfEducation"
import { listFormSpport, listKindSupport } from "./listOption/support"
import { listFormTransport, listProduct } from "./listOption/transport"



const listSupport = {
    type: 'categories',
    text: 'Danh mục hỗ trợ * (Có thể chọn nhiều)',
    children: listKindSupport
}

const formSupport = {
    type :'formOfSupport',
    text: 'Hình thức hỗ trợ * (Có thể chọn nhiều)',
    children: listFormSpport
}


//transport 


const kindTransport = {
    type: 'categories',
    text: 'Loại hình vận chuyển * (Có thể chọn nhiều)',
    children: listFormTransport
}

const kindProduct = {
    type: 'transportProductType',
    text: 'Thông tin hàng hóa * (Có thể chọn nhiều)',
    children: listProduct
}


// job

const carrier = {
    type: 'career',
    text: 'Ngành nghề * (Có thể chọn nhiều)',
    children: listCarrier
}

const  kindJob = {
    type: 'jobType',
    text: 'Loại công việc * (Có thể chọn nhiều)',
    children: listKindJob
}


const kindPaySalary = {
    type: 'payForm',
    text: 'Hình thức trả lương * (Có thể chọn nhiều)',
    children: listKindPaySalary
}

//type of accommodation

const kindOfAccommodation = {
    type: 'placeType',
    text: 'Loại chỗ ở * (Có thể chọn nhiều)',
    children: listKindAccomodation
}


//market 


//gender 
const infoGender = {
    type: 'gender',
    text: 'Giới tính',
    children: listGender
}
const infoExperiance = {
    type: 'experience',
    text: 'Kinh nghiệm',
    children: listExperiance
}
const infoLevelOfEducation = {
    type: 'academicLevel',
    text: 'Trình độ học vấn cao nhất',
    children: listLevelOfEducation
}
export {
    listSupport,
    formSupport,
    kindTransport,
    kindProduct,
    carrier,
    kindJob,
    kindPaySalary,
    infoGender,
    kindOfAccommodation,
    infoExperiance,
    infoLevelOfEducation
}