import React from 'react';

import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';

import Waitlist from '../components/sections/Waitlist';


const Home: React.FC = () => {
    return (
        <main style={{ width: '100%', overflow: 'hidden' }}>
            <Hero />
            <Features />
            <Waitlist />
        </main>
    );
};

export default Home;