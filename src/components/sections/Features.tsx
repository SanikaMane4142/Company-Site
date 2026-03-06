import React from 'react';
import Card from '../ui/Card';

const features = [
    {
        title: 'Real-time Insights',
        description: 'Monitor your performance with millisecond precision and actionable metrics.',
        icon: '📊'
    },
    {
        title: 'Adaptive Strategy',
        description: 'Our AI-driven engine suggests pivots based on evolving market conditions.',
        icon: '🧠'
    },
    {
        title: 'Seamless Integration',
        description: 'Connect your entire ecosystem with our robust API and pre-built connectors.',
        icon: '🔌'
    }
];

const Features: React.FC = () => {
    return (
        <section id="features" style={{ padding: 'var(--space-lg) 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-xs)' }}>Engineered for <span className="gradient-text">Precision</span></h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Powerful features to give you the competitive edge.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-md)' }}>
                    {features.map((feature, index) => (
                        <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{feature.icon}</div>
                            <h3 style={{ marginBottom: '0.5rem' }}>{feature.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{feature.description}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
