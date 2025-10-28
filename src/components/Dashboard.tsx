import React, { useState, useEffect } from 'react';
import StartView from './StartView';
import Sidebar from './Sidebar';
import DetailPage from './DetailPage';
import ThemeToggle from './ThemeToggle';
import AddDepartmentForm from './AddDepartmentForm';
import './Dashboard.css';

export interface Department {
  id: string;
  name: string;
  icon?: string;
  image: string;
  page: {
    title: string;
    benefit: string;
    features: string[];
  };
}

const defaultDepartments: Department[] = [
  {
    id: 'it',
    name: 'IT',
    icon: '💻',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop',
    page: {
      title: 'Benutzer-Provisionierung',
      benefit: 'Beschleunigt Onboarding und reduziert Fehler.',
      features: [
        'Self-Service Antrag',
        'Rollenbasiertes Rechte-Set',
        'Audit-Log'
      ]
    }
  },
  {
    id: 'finance',
    name: 'Finanzen',
    icon: '💰',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=400&fit=crop',
    page: {
      title: 'Budget-Übersicht',
      benefit: 'Transparente Planung und Kontrolle der Kostenstellen.',
      features: [
        'Soll/Ist Vergleich',
        'Quartals-Forecast',
        'CSV-Export'
      ]
    }
  },
  {
    id: 'hr',
    name: 'Personal',
    icon: '👥',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    page: {
      title: 'Urlaubsübersicht',
      benefit: 'Schneller Überblick über Abwesenheiten.',
      features: [
        'Teamkalender',
        'Genehmigungsstatus',
        'Download Monatsliste'
      ]
    }
  }
];

const Dashboard: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>(() => {
    const saved = localStorage.getItem('departments');
    return saved ? JSON.parse(saved) : defaultDepartments;
  });

  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('departments', JSON.stringify(departments));
  }, [departments]);

  const handleDepartmentSelect = (department: Department) => {
    setSelectedDepartment(department);
  };

  const handleBack = () => {
    setSelectedDepartment(null);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleAddDepartment = (newDept: {
    name: string;
    image: string;
    page: {
      title: string;
      benefit: string;
      features: string[];
    };
  }) => {
    const department: Department = {
      id: `dept-${Date.now()}`,
      name: newDept.name,
      image: newDept.image,
      page: newDept.page,
    };

    setDepartments([...departments, department]);
  };

  return (
    <div className="dashboard">
      <div className="light-effect light-effect-1"></div>
      <div className="light-effect light-effect-2"></div>
      <div className="light-effect light-effect-3"></div>
      <div className="geometric-lines"></div>

      <header className="dashboard-header">
        <h1>Mein Dashboard</h1>
        <ThemeToggle isDark={isDarkMode} onToggle={toggleTheme} />
      </header>

      <div className="dashboard-content">
        {selectedDepartment && (
          <Sidebar
            department={selectedDepartment}
            onBack={handleBack}
          />
        )}

        <main className="dashboard-main">
          {selectedDepartment ? (
            <DetailPage department={selectedDepartment} />
          ) : (
            <StartView
              departments={departments}
              onSelect={handleDepartmentSelect}
              onAddNew={() => setShowAddForm(true)}
            />
          )}
        </main>
      </div>

      {showAddForm && (
        <AddDepartmentForm
          onAdd={handleAddDepartment}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
