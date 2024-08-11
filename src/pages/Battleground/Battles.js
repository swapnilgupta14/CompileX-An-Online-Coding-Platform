import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from 'next/router';
import CustomPopup from '../../components/common/CustomPopup';

const Battleground = () => {
    const router = useRouter();
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupAction, setPopupAction] = useState('');

    const openPopup = (content) => {
        setPopupAction(content);
        setIsPopupVisible(true);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
        setPopupAction('');
    };

    const [contests, setContests] = useState([
        { id: 1, name: 'Contest A', status: 'ongoing', endTime: '2024-08-10T14:30:00Z', linkLabel: 'Join' },
        { id: 4, name: 'Contest D', status: 'ongoing', endTime: '2024-08-10T14:30:00Z', linkLabel: 'Join' },
        { id: 2, name: 'Contest B', status: 'upcoming', startTime: '2024-08-12T10:00:00Z', linkLabel: 'Register' },
        { id: 3, name: 'Contest C', status: 'completed', endTime: '2024-08-08T18:00:00Z', linkLabel: 'See Result' },
    ]);

    const joinContest = (id) => {
        alert(`Join Contest ${id} functionality goes here`);
    };

    const renderContests = (status) => {
        return (
            <div className="contest-cards">
                {contests.filter(contest => contest.status === status).map(contest => (
                    <div key={contest.id} className="contest-card">
                        <h3>{contest.name}</h3>
                        <p>
                            {status === 'ongoing' && `Ends at: ${new Date(contest.endTime).toLocaleString()}`}
                            {status === 'upcoming' && `Starts in: ${Math.round((new Date(contest.startTime) - new Date()) / (1000 * 60 * 60))} hours`}
                            {status === 'completed' && `Ended at: ${new Date(contest.endTime).toLocaleString()}`}
                        </p>
                        {status !== 'completed' && <button onClick={() => joinContest(contest.id)}>{contest.linkLabel}</button>}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="battleground-container">
            <header className="header">
                <FaArrowLeft size={15} onClick={() => router.push("/Home")} />
                <h1>Battleground</h1>
            </header>

            <div className='battleground-bar'>
                <div className="search-bar">
                    <input type="text" placeholder="Search Contests... (To be implemented)" />
                </div>
                <div>
                    <div className="contest-actions">
                        <button onClick={() => openPopup('create')}>Create New Contest</button>
                        <button className="join" onClick={() => openPopup('join')}>Join Contest</button>
                    </div>
                    <CustomPopup
                        isVisible={isPopupVisible}
                        onClose={closePopup}>
                        {popupAction}
                    </CustomPopup>
                </div>
            </div>


            <>
                <div className="content">
                    <div className="contests">
                        <div className="contests-list">
                            <div className="section">
                                <h2>Ongoing Contests</h2>
                                {renderContests('ongoing')}
                            </div>
                            <div className="section">
                                <h2>Upcoming Contests</h2>
                                {renderContests('upcoming')}
                            </div>
                            <div className="section">
                                <h2>Completed Contests</h2>
                                {renderContests('completed')}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
};

export default Battleground;
