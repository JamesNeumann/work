import React from 'react';
import { Department } from './Dashboard';
import './Sidebar.css';

interface SidebarProps {
  department: Department;
  onBack: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ department, onBack }) => {
  return (
    <aside className="sidebar">
      <button className="back-button" onClick={onBack}>
        <span>← Zurück</span>
      </button>

      <div className="sidebar-content">
        <h3 className="sidebar-department">{department.name}</h3>
        <nav className="sidebar-nav">
          <div className="sidebar-item active">
            {department.page.title}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
