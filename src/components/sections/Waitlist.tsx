import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';

const Waitlist: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) return;

        try {
            const response = await fetch('http://localhost:5000/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            setMessage(data.message);

            if (response.ok) {
                setEmail('');
            }
        } catch (error) {
            setMessage('Something went wrong');
        }
    };

    return (
        <section style={{ padding: 'var(--space-lg) 0' }}>
            <div className="container">
                <Card style={{ textAlign: 'center', padding: 'var(--space-lg)', maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                        Join the <span className="gradient-text">Waitlist</span>
                    </h2>

                    <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-md)' }}>
                        Be the first to experience the future of digital navigation. Limited spots available for the beta release.
                    </p>

                    <form 
                        onSubmit={handleSubmit}
                        style={{ display: 'flex', gap: '0.5rem', maxWidth: '500px', margin: '0 auto' }}
                    >
                        <Input
                            placeholder="Enter your email"
                            type="email"
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setEmail(e.target.value)
                            }
                        />

                        <Button variant="primary" type="submit"style={{ height: '40px', padding: '0 16px' }}>
                            Join Now
                        </Button>
                    </form>

                    {message && (
                        <p style={{ marginTop: '1rem' }}>
                            {message}
                        </p>
                    )}
                </Card>
            </div>
        </section>
    );
};

export default Waitlist;