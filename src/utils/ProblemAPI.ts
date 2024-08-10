import {AxiosInstance} from "./axiosInstance";
import {ApiResponse, ApiResponseFormatted, ProblemGetData} from "../types/API";

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

const problemDelete = async (data:{p_id:string}) => {
    return AxiosInstance.delete("/arena/delete_problem/",{ data }).then((res)=>res.data) as Promise<ApiResponse>;
}

interface testcaseType{
    p_id : string ,
    input_case : string ,
    output_case : string ,
    is_public : boolean ,
}

const testcaseAdd = async (data:testcaseType) => {
    return AxiosInstance.post("/arena/add_testcase/",{ data }).then((res)=>res.data) as Promise<ApiResponse>;
}

const testcaseGet = async (data:testcaseType) => {
    return AxiosInstance.post("/arena/get_testcase/",{ data }).then((res)=>res.data) as Promise<ApiResponseFormatted<testcaseType>>;
}
const testcaseDelete = async (data:{p_id:string}) => {
    return AxiosInstance.post("/arena/delete_testcase/",{ data }).then((res)=>res.data) as Promise<ApiResponse>;
}

export default {
    problemCreate,
    problemGet,
    problemDelete,
    testcaseAdd,
    testcaseGet
}
