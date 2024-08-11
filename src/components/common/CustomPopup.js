import React, { useState } from 'react';
import { createRoom } from '../../utils/battlefield-apis/b-api'; // Ensure this path is correct
import { useRouter } from 'next/router';
import Add from '../../pages/Battleground/Add';

const Popup = ({ isVisible, onClose, children }) => {
  const router = useRouter();
  const [contestData, setContestData] = useState({
    name: '',
    startDateAndTime: '',
    endDateAndTime: '',
  });
  const [contestId, setContestId] = useState('');
  const [roomId, setRoomId] = useState('');

  const handleJoin = () => {
    console.log('Joining contest with ID:', contestId);
    if(contestId.length >= 10)
    router.push(`/Battleground/${contestId}`)
    onClose();
  };

  const convertToUTC = (dateStr) => {
    const date = new Date(dateStr);
    return date.toISOString().slice(0, 19);
  };

  const handleCreateContest = async () => {
    if (!contestData.name || !contestData.startDateAndTime || !contestData.endDateAndTime) {
      alert('Please fill all the fields');
      return;
    }

    try {
      const startDateUTC = convertToUTC(contestData.startDateAndTime);
      const endDateUTC = convertToUTC(contestData.endDateAndTime);
      const result = await createRoom(contestData.name,
        startDateUTC,
        endDateUTC);
      console.log('Contest creation result:', result);
      if(result){
        const room_id = result.responseData.roomId;
        if (room_id) {
          setRoomId(room_id);
          router.push(`/Battleground/Add?RoomId=${room_id}`);
          <Add
          RoomId={room_id}
          BattleName={contestData.name}
          />
          onClose();
        }
        else {
          console.log('Room ID not found');
          return;
        }
        console.log('Contest created successfully', result);
      }else{
        console.log('Error creating battle:', result);
      }
    } catch (error) {
      console.error('Error creating battle:', error);
    }
  };

  if (!isVisible) return null;

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
                onChange={(e) => setContestData({ ...contestData, name: e.target.value })}
              />
            </div>
            <div className="date-and-time">
              <h4>Enter Start Time</h4>
              <input
                type="datetime-local"
                value={contestData.startDateAndTime}
                onChange={(e) => setContestData({ ...contestData, startDateAndTime: e.target.value })}
                min={new Date().toISOString().slice(0, 16)}
              />
              <h4>Enter End Time</h4>
              <input
                type="datetime-local"
                value={contestData.endDateAndTime}
                onChange={(e) => setContestData({ ...contestData, endDateAndTime: e.target.value })}
                min={contestData.startDateAndTime}
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
    </div>
  );
};

export default Popup;
