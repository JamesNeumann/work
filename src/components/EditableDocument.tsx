import React, { useState } from 'react';
import './EditableDocument.css';

interface EditableDocumentProps {
  departmentId: string;
}

const EditableDocument: React.FC<EditableDocumentProps> = ({ departmentId }) => {
  const [content, setContent] = useState(() => {
    const saved = localStorage.getItem(`doc-${departmentId}`);
    return saved || '';
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    localStorage.setItem(`doc-${departmentId}`, content);
    setIsEditing(false);
  };

  const handleCancel = () => {
    const saved = localStorage.getItem(`doc-${departmentId}`);
    setContent(saved || '');
    setIsEditing(false);
  };

  return (
    <div className="editable-document">
      <div className="document-header">
        <h3>Notizen & Dokumentation</h3>
        {isEditing ? (
          <div className="document-actions">
            <button onClick={handleSave} className="btn-save">Speichern</button>
            <button onClick={handleCancel} className="btn-cancel">Abbrechen</button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)} className="btn-edit">
            Bearbeiten
          </button>
        )}
      </div>

      {isEditing ? (
        <textarea
          className="document-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Hier können Sie Notizen und Dokumentation hinzufügen..."
          autoFocus
        />
      ) : (
        <div
          className="document-display"
          onClick={() => setIsEditing(true)}
        >
          {content || 'Klicken Sie hier, um Notizen hinzuzufügen...'}
        </div>
      )}
    </div>
  );
};

export default EditableDocument;
