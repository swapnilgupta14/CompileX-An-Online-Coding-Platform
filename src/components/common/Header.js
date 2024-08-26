import React, { use, useState } from 'react';
import Image from 'next/image';
import {useRouter} from 'next/router';

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
        console.log(isDropdownOpen);
    };

    const handleRouteToProfile = () => {
        router.push('../../pages/Profile/profile.js')
    }

    return (
        <nav className='navbar'>
            <ul className='nav-links'>
                <li><a href='#'>Home</a></li>
                <li><a href='#'>Battles</a></li>
                <li><a href='#'>Leaderboard</a></li>
                <li><a href='#'>Store</a></li>
            </ul>
            <div className='nav-actions'>
                <div className='profile' onClick={toggleDropdown}>
                    <Image
                        src='/images/profile-pic.png'
                        alt='profile'
                        width={40}
                        height={40}
                        className='profile-pic'
                        />
                </div>
                {isDropdownOpen && (
                    <div className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
                        <div className='user-info'>
                            <Image
                                src='/images/profile-pic.png'
                                alt='profile'
                                width={60}
                                height={60}
                                className='dropdown-profile-pic'
                                onClick={handleRouteToProfile}
                            />
                            <div className='user-details'>
                                <span className='user-name'>Swapnil Gupta</span>
                            </div>
                        </div>
                        <div className='dropdown-links'>
                            <div className='dropdown-item'><a href='#'>My Lists</a></div>
                            <div className='dropdown-item'><a href='#'>Notebook</a></div>
                            <div className='dropdown-item'><a href='#'>Submissions</a></div>
                            <div className='dropdown-item'><a href='#'>Progress</a></div>
                            <div className='dropdown-item'><a href='#'>Points</a></div>
                            <div className='dropdown-item'><button className='signout-btn'>Sign Out</button></div>
                        </div>
                    </div>
                )}

            </div>
        </nav>
    );
};

export default Header;
