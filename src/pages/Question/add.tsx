import React from 'react';
import ProblemAPI from "../../utils/ProblemAPI";
import {useRouter} from "next/router";

const Add = () => {
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const data = new FormData(form);
        const title = data.get("title")
        const question = data.get("question")
        const author = data.get("author")
        const difficulty = data.get("difficulty")
        if(!title) return alert("Please enter a title");
        if(!question) return alert("Please enter a question");
        if(!author) return alert("Please enter a author");
        if(!difficulty) return alert("Please enter a difficulty");

        ProblemAPI.problemCreate({
            p_title : title.toString(),
            p_content : question.toString(),
            p_author : author.toString(),
            p_difficulty : Number(difficulty),
        })

        alert("Problem Added Successfully!")
        router.push("/")

        console.log(title,author,question,difficulty)
    }

    return (
        <div className="flex flex-col p-2 pt-10 w-full pl-20 pr-5 gap-5">
            <div>
                <span className={`font-semibold text-xl`}>Add Question :</span>
            </div>
            <form className={`flex flex-col gap-2 w-full`} onSubmit={handleSubmit}>
                <input type={"text"} name={"title"} className={`bg-gray-100 rounded-md p-1`} placeholder={"Title"} required/>
                <textarea name={"question"} className={`bg-gray-100 rounded-md p-1`} placeholder={"Question"} required/>
                <input type={"text"} name={"author"} className={`bg-gray-100 rounded-md p-1`} placeholder={"Author"} required/>
                <select className={`bg-gray-100 rounded-md p-1`} required name={"difficulty"}>
                    <option value={"1"}>Easy</option>
                    <option value={"2"}>Medium</option>
                    <option value={"3"}>Hard</option>
                </select>
                <div className={`flex justify-center`}>
                    <button className={`px-4 py-1 rounded-md bg-green-300`}>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Add;