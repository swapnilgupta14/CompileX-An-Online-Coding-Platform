import { AxiosInstance } from '../axiosInstance';

export const createRoom = async (b_name, start_time, end_time) => {
    try {
        const response = await AxiosInstance.post('/battlefield/create_room/', {
            b_name,
            start_time,
            end_time,
        });

        return response.data;
    } catch (error) {
        console.error('Error creating room:', error);
        return { error: true, responseData: error.message, status_code: error.response?.status};
    }
};


export const addProblem = async (p_title, p_content, p_author, p_difficulty, room_id) => {
    try {
        const response = await AxiosInstance.post('/battlefield/add_problem/', {
            p_title,
            p_content,
            p_author,
            p_difficulty,
            room_id,
        });

        return response.data;
    } catch (error) {
        console.error('Error adding problem:', error);
        return { error: true, responseData: error.message, status_code: error.response?.status || 500 };
    }
};



export const getUserId = async (name, room_id) => {
    try {
        const response = await AxiosInstance.post('/battlefield/get_user_id/', {
            name,
            room_id,
        });

        return response.data;
    } catch (error) {
        console.error('Error getting user ID:', error);
        return { error: true, responseData: error.message, status_code: error.response?.status || 500 };
    }
};



export const getProblemsByRoom = async (room_id) => {
    try {
        const response = await AxiosInstance.get('/battlefield/get_problem_by_room/', {
            params: { room_id },
        });

        return response.data;
    } catch (error) {
        console.error('Error getting problems by room:', error);
        return { error: true, responseData: error.message, status_code: error.response?.status || 500 };
    }
};


export const addTestcase = async (p_id, input_case, output_case, is_public) => {
    try {
        const response = await AxiosInstance.post('/arena/add_testcase/', {
            p_id,
            input_case,
            output_case,
            is_public,
        });

        return response.data;
    } catch (error) {
        console.error('Error adding testcase:', error);
        return { error: true, responseData: error.message, status_code: error.response?.status || 500 };
    }
};