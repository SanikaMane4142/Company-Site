import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: boolean;
    hoverEffect?: boolean;
    style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({
    children,
    className = '',
    padding = true,
    hoverEffect = true,
    style = {}
}) => {
    return (
        <div
            className={`glass ${hoverEffect ? 'hover-lift' : ''} ${className}`}
            style={{
                padding: padding ? 'var(--space-md)' : '0',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                height: '100%',
                ...style
            }}
        >
            {children}
        </div>
    );
};

export default Card;
