import React, { useState } from 'react';
import { useRouter } from 'next/router'; 
import { FaCode, FaTerminal, FaTasks, FaCommentDots, FaUser, FaCamera, FaCog, FaGamepad } from 'react-icons/fa';

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const router = useRouter();

    const menuItems = [
        { icon: <FaTasks size={20} />, label: 'Dashboard', path: '/' },
        { icon: <FaCode size={20} />, label: 'Code Editor', path: '/Editor' },
        { icon: <FaGamepad size={20} />, label: 'Battleground', path: '/Battleground/Battles' },
        // { icon: <FaCommentDots size={20} />, label: 'Discussion', path: '/#' },
    ];

    const userItems = [
        { icon: <FaUser size={20} />, label: 'Profile - Soon to be implemented' },
        { icon: <FaCog size={20} />, label: 'Settings - Soon to be implemented' },
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
                        title={item.label}
                    >
                        {item.icon}
                        {activeIndex === index && <div className="active-indicator" />}
                    </div>
                ))}
            </div>
            <div className="sidebar-menu">
                {userItems.map((item, index) => (
                    <div
                        key={index}
                        className={`sidebar-icon`}
                        title={item.label}
                    >
                        {item.icon}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
