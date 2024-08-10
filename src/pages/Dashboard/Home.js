import React from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/Arena');
  }

  return (
    <>
      <div className="home-container">
        <header>
          <h1>Dashboard</h1>
        </header>
        <div>
          <button onClick={handleNavigation}>Go to Arena</button>
        </div>
      </div>
    </>
  )
}

export default Home;