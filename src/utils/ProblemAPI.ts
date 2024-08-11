import {AxiosInstance} from "./axiosInstance";
import {ApiResponse, ApiResponseFormatted, Problem, ProblemGetData, testcaseType} from "../types/API";

interface problemCreate {
    p_title : string ,
    p_content : string ,
    p_author : string ,
    p_difficulty : number ,
}

 const problemCreate = async (data:problemCreate) => {
    return AxiosInstance.post("/arena/add_problem/",data).then((res)=>res.data) as Promise<ApiResponse>;
}

const problemGet = async () => {
    console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
    return AxiosInstance.get("/arena/get_problem/").then((res)=>res.data) as Promise<ApiResponseFormatted<ProblemGetData>>;
}

const problemGetById = async (data:{p_id:string}) => {
    console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
    return AxiosInstance.get(`/arena/get_problem_by_id/?p_id=${data.p_id}`).then((res)=>res.data) as Promise<ApiResponseFormatted<Problem>>;
}


const problemDelete = async (data:{p_id:string}) => {
    return AxiosInstance.delete("/arena/delete_problem/",{ data }).then((res)=>res.data) as Promise<ApiResponse>;
}

const testcaseAdd = async (data:testcaseType) => {
    return AxiosInstance.post("/arena/add_testcase/",data).then((res)=>res.data) as Promise<ApiResponse>;
}

const testcaseGet = async (data:{p_id:string}) => {
    return AxiosInstance.get(`/arena/get_testcase_battle/?pid=${data.p_id}`).then((res)=>res.data) as Promise<ApiResponseFormatted<testcaseType[]>>;
}
const testcaseDelete = async (data:{p_id:string}) => {
    return AxiosInstance.post("/arena/delete_testcase/",{ data }).then((res)=>res.data) as Promise<ApiResponse>;
}

export default {
    problemCreate,
    problemGet,
    problemDelete,
    testcaseAdd,
    testcaseGet,
    testcaseDelete,
    problemGetById,
}
