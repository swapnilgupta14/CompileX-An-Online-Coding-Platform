import React, { useState } from 'react';
import { useRouter } from 'next/router'; 
import { FaCode, FaTerminal, FaTasks, FaCommentDots, FaUser, FaCamera, FaCog, FaGamepad } from 'react-icons/fa';

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(1);
    const router = useRouter();

    const menuItems = [
        { icon: <FaTasks size={20} />, label: 'Dashboard', path: '/Dashboard/Home' },
        { icon: <FaCode size={20} />, label: 'Code Editor', path: '/Editor' },
        { icon: <FaGamepad size={20} />, label: 'Battleground', path: '#' },
        { icon: <FaCommentDots size={20} />, label: 'Discussion', path: '#' },
    ];

    const userItems = [
        { icon: <FaTerminal size={20} />, label: 'Terminal' },
        { icon: <FaUser size={20} />, label: 'Profile' },
        { icon: <FaCog size={20} />, label: 'Settings' },
    ];

    const handleNavigation = (index, path) => {
        setActiveIndex(index);
        router.push(path);
    };

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
                        onClick={() => handleNavigation(index, item.path)}
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
