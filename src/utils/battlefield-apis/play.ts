import {ApiResponse, ApiResponseFormatted, testcaseType} from "../../types/API";
import {AxiosInstance} from "../axiosInstance";

export interface BattleGroundQues {
    p_author:string
    p_content:string
    p_difficulty:string
    p_id:string
    p_title:string
}

const getQuestion = async (data:{room_id:string}) => {
    return AxiosInstance.get(`/battlefield/get_problem_by_room/?room_id=${data.room_id}`).then((res)=>res.data) as Promise<ApiResponseFormatted<BattleGroundQues[]>>;
}

const getTestcase = async (data:{p_id:string}) => {
    return AxiosInstance.get(`/arena/get_testcase/?pid=${data.p_id}`).then((res)=>res.data) as Promise<ApiResponseFormatted<testcaseType[]>>;
}


export const BattleGroundAPIS = {
    getQuestion,
    getTestcase
}