import React, { useState } from 'react';
import { FaCode, FaDatabase, FaTerminal, FaTasks, FaComments, FaGamepad, FaCommentDots, FaUser, FaCamera, FaClipboard, FaCog } from 'react-icons/fa'; // Updated icons

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const menuItems = [
        { icon: <FaTasks size={20} />, label: 'Dashboard' },
        { icon: <FaCode size={20} />, label: 'Code Editor' },
        { icon: <FaGamepad size={20} />, label: 'Battleground' },
        { icon: <FaCommentDots size={20} />, label: 'Discussion' },
    ];

    const userItems = [
        { icon: <FaTerminal size={20} />, label: 'Terminal' },
        { icon: <FaUser size={20} />, label: 'Profile' },
        { icon: <FaCog size={20} />, label: 'Settings' },

    ];

    return (
        <div className="sidebar">
            <div className="sidebar-icon logo">
                <FaCamera size={30} />
            </div>
            <div className="sidebar-menu">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`sidebar-icon ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => setActiveIndex(index)}
                    >
                        {item.icon}
                        {activeIndex === index && <div className="active-indicator" />}
                    </div>
                ))}
            </div>
            <div className="sidebar-icon toggle">
                {userItems.map((item, index) => (
                    <div
                        key={index}
                        className={`sidebar-icon`}
                    >
                        {item.icon}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
