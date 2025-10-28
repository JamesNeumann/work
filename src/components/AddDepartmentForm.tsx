import React, { useState } from 'react';
import './AddDepartmentForm.css';

interface AddDepartmentFormProps {
  onAdd: (department: {
    name: string;
    image: string;
    page: {
      title: string;
      benefit: string;
      features: string[];
    };
  }) => void;
  onClose: () => void;
}

const AddDepartmentForm: React.FC<AddDepartmentFormProps> = ({ onAdd, onClose }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [benefit, setBenefit] = useState('');
  const [features, setFeatures] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !image || !title || !benefit) {
      alert('Bitte füllen Sie alle Pflichtfelder aus');
      return;
    }

    const featuresList = features
      .split('\n')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    onAdd({
      name,
      image,
      page: {
        title,
        benefit,
        features: featuresList,
      },
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Neuen Fachbereich hinzufügen</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="department-form">
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="z.B. IT, Finanzen, Personal"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Bild-URL *</label>
            <input
              id="image"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Seitentitel *</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="z.B. Benutzer-Provisionierung"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="benefit">Nutzen *</label>
            <textarea
              id="benefit"
              value={benefit}
              onChange={(e) => setBenefit(e.target.value)}
              placeholder="z.B. Beschleunigt Onboarding und reduziert Fehler."
              rows={3}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="features">Funktionen (eine pro Zeile)</label>
            <textarea
              id="features"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="Self-Service Antrag&#10;Automatische Genehmigung&#10;Integration mit Active Directory"
              rows={5}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Abbrechen
            </button>
            <button type="submit" className="btn-save">
              Hinzufügen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartmentForm;
