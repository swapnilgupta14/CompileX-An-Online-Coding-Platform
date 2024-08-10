import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import {QUESTION_DIFFICULTY} from "../utils/Static";
import Link from "next/link";
import ProblemAPI from "../utils/ProblemAPI";

const Home = () => {
  const router = useRouter();
  const [questionArr, setQuestionArr] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    ProblemAPI.problemGet().then((data) => {
      setQuestionArr(data.responseData.results)
      setIsLoading(false)
    })
  }, []);

  return (
    <>
      <div className="home-container">
        <header>
          <h1>Dashboard</h1>
        </header>
        <div className={`p-4 flex flex-col gap-2`}>
          <div className={`flex justify-between`}>

            <span className={`text-xl font-semibold`}>Questions</span>

            <Link href={"/Question/add"} className={`p-2 rounded-full bg-sky-100`}>
              <i className="fi fi-br-plus"></i>
            </Link>
          </div>

          {
            questionArr.length !== 0 ? questionArr.map((question, index) => (
                <div className={`flex w-full flex-col gap-2 p-2 bg-gray-100 rounded-md`} key={`data-${question.p_id}`}>
                  <div className={`flex justify-between items-center`}>
                    <span>{question.p_title}</span>
                    <div className={`flex gap-2`}>
                      <Link href={`Question/testcase/${question.p_id}`} className={`p-1 rounded-md bg-white`}>
                        <i className="fi fi-tr-memo-circle-check"></i>
                      </Link>
                      <Link href={`Arena/${question.p_id}`} className={`p-1 rounded-md bg-white text-green-500`}>
                        <i className="fi fi-br-check"></i>
                      </Link>
                    </div>
                  </div>
                  <div className={`flex w-full justify-between`}>
                    <span className={`flex justify-center items-center gap-2`}>
                      <i className="fi fi-sr-heart text-red-500"></i>
                      <span>{question.p_likes}</span>
                    </span>
                    <span>{question.created_at}</span>
                    <span className={`px-1 ${QUESTION_DIFFICULTY[question.p_difficulty].style}`}>{QUESTION_DIFFICULTY[question.p_difficulty].Title}</span>
                  </div>
                </div>
            )) : isLoading ? (
                <>
                  <div className={`flex justify-center items-center gap-2`}>
                    <span>Loading</span>
                  </div>
                </>
            ):  (
                <>
                  <div className={`flex justify-center items-center gap-2`}>
                    <span>No questions to show</span>
                  </div>
                </>
            )
          }
        </div>
      </div>
    </>
  )
}

export default Home;
