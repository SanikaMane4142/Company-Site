import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'glass' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    ...props
}) => {

    /* Using specific styles based on props */

    /* Note: Using CSS modules or styled-components would be cleaner for complex variants, 
       but keeping it simple with standard CSS classes defined in global.css and variables.css */

    return (
        <button
            className={`btn-${variant} btn-${size} ${fullWidth ? 'w-full' : ''} ${className}`}
            {...props}
            style={{
                padding: size === 'sm' ? '0.5rem 1rem' : size === 'lg' ? '1rem 2rem' : '0.75rem 1.5rem',
                fontSize: size === 'sm' ? '0.875rem' : size === 'lg' ? '1.125rem' : '1rem',
                borderRadius: 'var(--radius-md)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                width: fullWidth ? '100%' : 'auto',
                fontWeight: 600,
                ... (variant === 'primary' ? {
                    background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)'
                } : variant === 'glass' ? {
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid var(--glass-border)',
                    color: 'white'
                } : variant === 'outline' ? {
                    border: '1px solid var(--glass-border)',
                    color: 'white',
                    background: 'transparent'
                } : {
                    background: 'white',
                    color: 'var(--bg-primary)'
                })
            }}
        >
            {children}
        </button>
    );
};

export default Button;
