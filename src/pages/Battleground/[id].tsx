import dynamic from 'next/dynamic';
import {useRouter} from "next/router";
import {useRef} from "react";
import {AxiosInstance} from "../../utils/axiosInstance";
import {ApiResponseFormatted} from "../../types/API";
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

const Arena = () => {
    const router = useRouter();
    const ref = useRef(null);

    const handleName = async () =>{
        const name = (ref.current as HTMLInputElement).value
        const response = await AxiosInstance.post("/battlefield/get_user_id/",{
            name : name,
            room_id : router.query.id,
        }).then(res=>res.data) as ApiResponseFormatted<{ user_id?:string }>

        if(response.responseData?.user_id){
            router.push(`/Battleground/play/${router.query.id}/${response.responseData.user_id}`);
        }else{
            alert("Some error")
            console.log(response.responseData)
        }
    }
    return (
        <>
        <div className={`flex h-screen justify-center items-center`}>
            <div className={`flex flex-col gap-4 justify-center items-center`}>
                <div>
                    <span className={`text-xl font-semibold`}>Welcome to Battleground</span>
                </div>
                <div className={`flex flex-col w-full`}>
                    <span>Name</span>
                    <input className={`bg-gray-200 rounded-md px-2 py-1`} ref={ref}/>
                </div>
                <button className={`bg-green-200 rounded-md px-2 py-1`} onClick={handleName}>Submit</button>
            </div>
        </div>
        </>
    )
};

export default Arena;
