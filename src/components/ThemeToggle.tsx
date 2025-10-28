import React from 'react';
import './ThemeToggle.css';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button className="theme-toggle" onClick={onToggle} aria-label="Toggle theme">
      <div className="theme-toggle-track">
        <div className={`theme-toggle-thumb ${isDark ? 'dark' : 'light'}`}>
          {isDark ? (
            <span className="icon">🌙</span>
          ) : (
            <span className="icon">☀️</span>
          )}
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
