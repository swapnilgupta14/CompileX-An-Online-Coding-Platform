import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { QUESTION_DIFFICULTY } from "../utils/Static";
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
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold">Problems</h1>
          <p className="text-lg text-gray-600">Solve challenges, enhance your skills</p>
        </div>

        <div className={`p-4 flex flex-col gap-4`}>
          <div className={`flex justify-between items-center`}>
            <span className={`text-2xl font-semibold`}>Questions</span>

            <Link href={"/Question/add"} className={`p-2 rounded-full bg-sky-100`}>
              <i className="fi fi-br-plus"></i>
            </Link>
          </div>

          {
            questionArr.length !== 0 ? questionArr.map((question, index) => (
              <div className={`flex w-full flex-col gap-4 p-4 bg-gray-100 rounded-lg`} key={`data-${question.p_id}`}>
                <div className={`flex justify-between items-center`}>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xl font-semibold">{question.p_title}</span>
                    </div>
                  </div>
                  <div className={`flex gap-4 items-center`}>
                    <div className={`text-sm text-gray-500 mt-1`}>
                      <span className={`px-4 py-2 ${QUESTION_DIFFICULTY[question.p_difficulty].style}`}>{QUESTION_DIFFICULTY[question.p_difficulty].Title}</span>
                    </div>
                    <Link href={`Question/testcase/${question.p_id}`} className={`p-2 rounded-md bg-green-500 text-white`}>
                      <i className="fi fi-tr-memo-circle-check"></i>
                    </Link>
                    {/*<Link href={`Arena/${question.p_id}`} className={`p-1 px-2 rounded-md bg-green-500 text-white`}>*/}
                    {/*  Solve Problem*/}
                    {/*</Link>*/}
                    {/*<div className={`flex gap-2 items-center`}>*/}
                    {/*  <i className="fi fi-sr-heart text-red-500"></i>*/}
                    {/*  <span>{question.p_likes}</span>*/}
                    {/*</div>*/}
                  </div>
                </div>
                <div className={`flex justify-between text-sm text-gray-600`}>
                  <span>{question.created_at}</span>
                </div>
              </div>
            )) : isLoading ? (
              <div className={`flex justify-center items-center gap-2`}>
                <span>Loading</span>
              </div>
            ) : (
              <div className={`flex justify-center items-center gap-2`}>
                <span>No questions to show</span>
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default Home;
