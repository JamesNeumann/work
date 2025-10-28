import React from 'react';
import { Department } from './Dashboard';
import EditableDocument from './EditableDocument';
import './DetailPage.css';

interface DetailPageProps {
  department: Department;
}

const DetailPage: React.FC<DetailPageProps> = ({ department }) => {
  return (
    <div className="detail-page">
      <div className="detail-image-container">
        <img
          src={department.image}
          alt={department.name}
          className="detail-image"
        />
        <div className="detail-image-overlay">
          <h2 className="detail-image-title">{department.name}</h2>
        </div>
      </div>

      <div className="detail-card">
        <h2 className="detail-title">{department.page.title}</h2>

        <p className="detail-benefit">{department.page.benefit}</p>

        <div className="detail-features">
          <h3>Funktionen:</h3>
          <ul>
            {department.page.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>

        <EditableDocument departmentId={department.id} />
      </div>
    </div>
  );
};

export default DetailPage;
