import React from 'react';
import { Department } from './Dashboard';
import './StartView.css';

interface StartViewProps {
  departments: Department[];
  onSelect: (department: Department) => void;
  onAddNew: () => void;
}

const StartView: React.FC<StartViewProps> = ({ departments, onSelect, onAddNew }) => {
  return (
    <div className="start-view">
      <h2 className="start-view-title">Willkommen!</h2>
      <p className="start-view-subtitle">Wählen Sie einen Fachbereich aus:</p>

      <div className="department-grid">
        {departments.map((department) => (
          <div
            key={department.id}
            className="department-card"
            onClick={() => onSelect(department)}
          >
            <div className="card-node"></div>
            <h3 className="department-name">{department.name}</h3>
          </div>
        ))}

        <div
          className="department-card add-department-card"
          onClick={onAddNew}
        >
          <div className="card-node"></div>
          <div className="add-icon">+</div>
          <h3 className="department-name">Neuer Fachbereich</h3>
        </div>
      </div>
    </div>
  );
};

export default StartView;
