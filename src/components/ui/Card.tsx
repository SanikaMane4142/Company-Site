import React from 'react';
import useIsMobile from '../../hooks/useIsMobile';

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
    const isMobile = useIsMobile();

    return (
        <div
            className={`glass ${hoverEffect ? 'hover-lift' : ''} ${className}`}
            style={{
                padding: padding ? (isMobile ? '1rem' : 'var(--space-md)') : '0',
                borderRadius: isMobile ? '14px' : 'var(--radius-lg)',
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
