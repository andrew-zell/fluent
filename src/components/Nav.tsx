import React from 'react';
import './Nav.css';

interface NavProps {
  activeItem?: 'my-learning' | 'explore' | 'team';
  userInitials?: string;
  onWordmarkClick?: () => void;
}

export const Nav: React.FC<NavProps> = ({
  activeItem = 'my-learning',
  userInitials = 'ZK',
  onWordmarkClick,
}) => (
  <nav className="nav">
    {onWordmarkClick ? (
      <button type="button" className="nav-wordmark nav-wordmark-btn" onClick={onWordmarkClick}>
        Fluent<span>.</span>
      </button>
    ) : (
      <div className="nav-wordmark">Fluent<span>.</span></div>
    )}
    <div className="nav-links">
      <div className={`nav-link ${activeItem === 'my-learning' ? 'active' : ''}`}>My learning</div>
      <div className={`nav-link ${activeItem === 'explore' ? 'active' : ''}`}>Explore</div>
      <div className={`nav-link ${activeItem === 'team' ? 'active' : ''}`}>Team</div>
    </div>
    <div className="nav-avatar">{userInitials}</div>
  </nav>
);
