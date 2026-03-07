
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

  const height = size === 'sm' ? '38px' : size === 'lg' ? '52px' : '44px';
  const padding = size === 'sm' ? '0 14px' : size === 'lg' ? '0 28px' : '0 20px';
  const fontSize = size === 'sm' ? '0.9rem' : size === 'lg' ? '1.125rem' : '1rem';

  return (
    <button
      className={`btn-${variant} btn-${size} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
      style={{
        height,
        padding,
        fontSize,
        borderRadius: 'var(--radius-md)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        width: fullWidth ? '100%' : 'auto',
        fontWeight: 600,

        ...(variant === 'primary'
          ? {
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              color: 'white',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
            }
          : variant === 'glass'
          ? {
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(12px)',
              border: '1px solid var(--glass-border)',
              color: 'white',
            }
          : variant === 'outline'
          ? {
              border: '1px solid var(--glass-border)',
              color: 'white',
              background: 'transparent',
            }
          : {
              background: 'white',
              color: 'var(--bg-primary)',
            }),
      }}
    >
      {children}
    </button>
  );
};

export default Button;