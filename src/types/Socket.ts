export interface SocketCodeReq {
    code : string
    input : string
}

export interface SocketCodeRes {
    error: boolean;
    responseData: {
        error: string;
        data:{
            exec_time: number;
            message: string;
            output: string;
        }|{
            details: string,
            message : string,
        }
    }
    status: number;
}
