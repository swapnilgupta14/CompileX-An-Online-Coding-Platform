import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from 'next/router';

const Add = ({RoomId, BattleName}) => {
    const router = useRouter();
    return (
        <div className="add-contest-container">
            <header className="header">
                <FaArrowLeft size={15} onClick={() => router.push("/Battleground/Battles")} />
                <h1>Add Problem And Test Cases for Battle: {BattleName}</h1>
            </header>
        </div>
    )
}

export default Add