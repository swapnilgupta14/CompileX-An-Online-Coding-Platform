import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import {QUESTION_DIFFICULTY} from "../../utils/Static";
import Link from "next/link";
import ProblemAPI from "../../utils/ProblemAPI";
import useWebSocket from "../../utils/useWebSocket";

const Home = () => {
  const router = useRouter();
  const [questionArr, setQuestionArr] = useState([
    {
      "p_id": "p_62a4c1dd10189cbe051864ba9640a2e9",
      "p_title": "Introduction to C++",
      "p_content": "This is a beginner-friendly guide to C++ programming, covering basic concepts such as variables, data types, loops, and functions.",
      "p_author": "John Doe",
      "p_likes": 0,
      "p_difficulty": 1,
      "created_at": "2024-08-10T13:16:31.762228Z"
    }
  ])

  const {sendMessage} = useWebSocket("/pg/code_execute")

  sendMessage({
        "code": "#include <iostream>\n\nint main() {\n    int num1, num2, sum;\n    std::cin >> num1;\n    std::cin >> num2;\n\n    // Calculating the sum\n    sum = num1 + num2;\n\n    // Displaying the result\n    std::cout << \"The sum is: \" << sum << std::endl;\n\n    return 0;\n}\n",
        "input": "4\n5"
      }
  )

  useEffect(() => {
    ProblemAPI.problemGet().then((data) => {
      console.log(data)
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

            <span className={`p-2 rounded-full bg-sky-100`}>
              <i className="fi fi-br-plus"></i>
            </span>
          </div>

          {
            questionArr.map((question, index) => (
                <Link href={`/question/edit/${question.p_id}`} className={`flex w-full flex-col gap-2 p-2 bg-gray-100 rounded-md`} key={`data-${question.p_id}`}>
                  <div>
                    <span>{question.p_title}</span>
                  </div>
                  <div className={`flex w-full justify-between`}>
                    <span className={`flex justify-center items-center gap-2`}>
                      <i className="fi fi-sr-heart text-red-500"></i>
                      <span>{question.p_likes}</span>
                    </span>
                    <span>{question.created_at}</span>
                    <span className={`px-1 ${QUESTION_DIFFICULTY[question.p_difficulty].style}`}>{QUESTION_DIFFICULTY[question.p_difficulty].Title}</span>
                  </div>
                </Link>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Home;
