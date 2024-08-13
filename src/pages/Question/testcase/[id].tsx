import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import ProblemAPI from "../../../utils/ProblemAPI";
import {testcaseType} from "../../../types/API";

const TestcaseId = () => {
    const router = useRouter()
    const [testcases, setTestcases] = useState<testcaseType[]>([])

    const fetchCases = () =>{
        if(router.query.id){
            ProblemAPI.testcaseGet({
                p_id : router.query.id as string,
            }).then((data)=>{
                if(data.responseData && data.responseData.length >= 1)
                    setTestcases(data.responseData)
            })
        }
    }
    useEffect(() => {
        fetchCases()
    }, [router.query.id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const data = new FormData(form);
        const input_case = data.get("input_case")
        const output_case = data.get("output_case")
        const visibility = data.get("public")
        if(!input_case) return alert("Please enter input case");
        if(!output_case) return alert("Please enter output case");
        if(!visibility) return alert("Please select visibility");

        await ProblemAPI.testcaseAdd({
            output_case : output_case.toString(),
            input_case : input_case.toString(),
            is_public : visibility === "true",
            p_id : router.query.id as string,
        })

        alert("Testcase Added Successfully!")
        form.reset()
        fetchCases()
    }

    return (
        <div className="flex flex-col p-2 pt-10 w-full pl-20 pr-5 gap-5">
            <div>
                <span className={`font-semibold text-xl`}>Add TestCase :</span>
            </div>
            <form className={`flex flex-col gap-2 w-full`} onSubmit={handleSubmit}>
                <textarea name={"input_case"} className={`bg-gray-100 rounded-md p-1`} placeholder={"input case"} rows={4} required/>
                <textarea name={"output_case"} className={`bg-gray-100 rounded-md p-1`} placeholder={"output"} rows={4} required/>
                <div className={`flex flex-col gap-2`}>
                    <span>
                        Public ?
                    </span>
                    <select className={`bg-gray-100 rounded-md p-1`} required name={"public"}>
                        <option value={"true"}>Yes</option>
                        <option value={"false"}>No</option>
                    </select>
                </div>
                <div className={`flex justify-center`}>
                    <button className={`px-4 py-1 rounded-md bg-green-300`}>Submit</button>
                </div>
            </form>

            {
                testcases.map((testcase: testcaseType) => (
                    <div key={testcase.p_id} className={`flex flex-col gap-2 border-b-2 pb-4`}>
                        <div className={`flex flex-col gap-2`}>
                            <span>Input</span>
                            <span>
                                <textarea className={`flex bg-amber-50 w-full p-2 rounded-md`} value={testcase.input_case} disabled rows={testcase.input_case.split("\n").length} style={{
                                    resize: "none",
                                }} />
                            </span>
                        </div>
                        <div className={`flex flex-col gap-2`}>
                            <span>Output</span>
                            <span>
                                 <textarea className={`flex bg-amber-50 w-full p-2 rounded-md`} value={testcase.output_case} disabled
                                           rows={testcase.output_case.split("\n").length} style={{
                                     resize: "none",
                                 }}/>
                            </span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default TestcaseId;