import React, { useState } from 'react';
import { createRoom } from '../../utils/battlefield-apis/b-api';
import {useRouter} from "next/router";

const Popup = ({ isVisible, onClose, children }) => {
  const router = useRouter();

  const [contestData, setContestData] = useState({
    name: '',
    startDateAndTime: '',
    endDateAndTime: '',
  });
  const [contestId, setContestId] = useState('');

  const handleJoin = () => {
    console.log('Joining contest with ID:', contestId);
    if(contestId.length >= 10)
    router.push(`/Battleground/${contestId}`)
    onClose();
  };

  if (!isVisible) return null;

  const handleCreateContest = async () => {
    if (!contestData.name || !contestData.startDateAndTime || !contestData.endDateAndTime) {
      alert('Please fill all the fields');
      return;
    }
    const result = await createContest(contestData.name, contestData.startDateAndTime, contestData.endDateAndTime);
    console.log('Contest creation result:', result);
    if (result.error) {
      setError(result.responseData);
    } else {
      setSuccess('Contest created successfully!');
    }
  };

  return (
    <div className={`popup-overlay ${isVisible ? 'visible' : ''}`}>
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>×</button>
        {children === 'create' && (
          <div className="contest-creation">
            <h3>Create New Battle</h3>
            <div>
              <h4>Enter Battle Name</h4>
              <input
                type="text"
                value={contestData.name}
                onChange={(e) => setContestData({ ...contestData, name: e.target.value })}></input>
            </div>
            <div className="date-and-time">
              <h4>Enter Start Time</h4>
              <input
                type="datetime-local"
                value={contestData.date}
                onChange={(e) => setContestData({ ...contestData, startDateAndTime: e.target.value })}
                min={new Date().toISOString().slice(0, 16)}
              />
              <h4>Enter End Time</h4>
              <input
                type="datetime-local"
                value={contestData.endTime}
                onChange={(e) => setContestData({ ...contestData, endDateAndTime: e.target.value })}
                min={contestData.date}
              />
            </div>
            <button onClick={handleCreateContest}>Create this Battle</button>
          </div>
        )}
        {children === 'join' && (
          <div className="join-contest">
            <h3>Join a Contest</h3>
            <input
              type="text"
              placeholder="Enter Contest ID"
              value={contestId}
              onChange={(e) => setContestId(e.target.value)}
            />
            <button onClick={handleJoin}>Join</button>
          </div>
        )}
      </div>
    </div >
  );
};

export default Popup;
