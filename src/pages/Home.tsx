import React from 'react';
import Navbar from '../components/layout/Navbar';

import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';

import Waitlist from '../components/sections/Waitlist';


const Home: React.FC = () => {
    return (
        <>
            <Navbar />
            <main style={{ overflow: 'hidden' }}>
                <Hero />
                <Features />
         
                <Waitlist />
                
            </main>
         
        </>
    );
};

export default Home;