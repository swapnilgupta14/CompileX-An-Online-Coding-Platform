export interface PlaygroundCodeReq {
    code : string
    input : string
}

export interface ArenaCodeReq {
    code : string
    p_id : string
}

export interface ArenaCodeRes {
    error: boolean;
    responseData: {
        error: boolean,
        data: {
            message: string,
            output: string,
            error: string,
            exec_time: number
        },
        t_id: number,
        expected_out: string,
        passed: boolean
    }[]
    status: number;
}



export interface PlaygroundCodeRes {
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
