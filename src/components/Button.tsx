import React from 'react';
import './Button.css';

export type ButtonVariant = 'ink' | 'verd' | 'verd-deep' | 'ghost' | 'ghost-light' | 'parch';
export type ButtonSize = 'default' | 'lg' | 'sm';

interface ButtonProps {
  verb: string;
  context: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  verb,
  context,
  variant = 'ink',
  size = 'default',
  onClick,
}) => (
  <button
    className={`btn btn-${variant} btn-${size}`}
    onClick={onClick}
  >
    <span className="btn-serif">{verb}</span>
    <span className="btn-rule" />
    <span className="btn-sans">{context}</span>
  </button>
);
