import React, { useState, useEffect, createContext, useContext } from 'react';
import { Filter, BarChart3, CheckCircle2, Clock, AlertCircle, Building2, Plus, Edit, Trash2, X, Save, Search, Download, Moon, Sun, FileText, FileSpreadsheet } from 'lucide-react';

// Theme Context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75" onClick={onClose}></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureMatrix = () => {
  const { isDark, setIsDark } = useTheme();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    seite: '',
    status: '',
    persovertrieb: false,
    finanzvertrieb: false
  });

  const initialData = [
    { id: 1, seite: 'Hierarchiekette', status: 'Prod', persovertrieb: true, finanzvertrieb: true },
    { id: 2, seite: 'Standardgeldflusskette', status: 'Prod', persovertrieb: true, finanzvertrieb: false },
    { id: 3, seite: 'Organigramm', status: 'Prod', persovertrieb: true, finanzvertrieb: false },
    { id: 4, seite: 'Umstrukturierung', status: 'Prod', persovertrieb: true, finanzvertrieb: false },
    { id: 5, seite: 'Werberhierarchie', status: 'Prod', persovertrieb: true, finanzvertrieb: false },
    { id: 6, seite: 'VPa-Suche', status: 'Prod', persovertrieb: true, finanzvertrieb: true },
    { id: 7, seite: 'Stammdaten', status: 'Prod', persovertrieb: true, finanzvertrieb: true },
    { id: 8, seite: 'Antraggeldflusskette', status: 'Prod', persovertrieb: true, finanzvertrieb: true },
    { id: 9, seite: 'Positionswechsel', status: 'Prod', persovertrieb: true, finanzvertrieb: true },
    { id: 10, seite: 'Vergütungseinstellungen', status: 'Prod', persovertrieb: true, finanzvertrieb: false },
    { id: 11, seite: 'Datenbereitstellung', status: 'Prod', persovertrieb: true, finanzvertrieb: false },
    { id: 12, seite: 'Geldflusskette', status: 'Prod', persovertrieb: true, finanzvertrieb: false },
    { id: 13, seite: 'Landing Page', status: 'Wireframe', persovertrieb: true, finanzvertrieb: false },
    { id: 14, seite: 'Dashboard', status: 'Wireframe', persovertrieb: true, finanzvertrieb: false },
    { id: 15, seite: 'Bonifikation', status: 'Wireframe', persovertrieb: true, finanzvertrieb: false },
    { id: 16, seite: 'Vier-Augen-Prinzip', status: 'Wireframe', persovertrieb: true, finanzvertrieb: false },
    { id: 17, seite: 'Beförderungserlaubnis', status: 'Wireframe', persovertrieb: true, finanzvertrieb: false },
    { id: 18, seite: 'Anschubfinanzierung – LaP', status: 'Wireframe', persovertrieb: true, finanzvertrieb: true },
    { id: 19, seite: 'Anschubfinanzierung – Linearisierung', status: 'Wireframe', persovertrieb: true, finanzvertrieb: true },
    { id: 20, seite: 'Anschubfinanzierung – CampusScout', status: 'Wireframe', persovertrieb: true, finanzvertrieb: true },
    { id: 21, seite: 'Anschubfinanzierung – Vorschuss', status: 'Wireframe', persovertrieb: true, finanzvertrieb: true },
    { id: 22, seite: 'Bankverbindung', status: '', persovertrieb: true, finanzvertrieb: true },
    { id: 23, seite: 'Kontosperren', status: '', persovertrieb: true, finanzvertrieb: true },
    { id: 24, seite: 'Pfändungssperre', status: '', persovertrieb: false, finanzvertrieb: true },
    { id: 25, seite: 'Recruitingbonus', status: '', persovertrieb: false, finanzvertrieb: true },
    { id: 26, seite: 'Bringerbonus', status: '', persovertrieb: false, finanzvertrieb: true },
    { id: 27, seite: 'Unterlage', status: '', persovertrieb: false, finanzvertrieb: true },
    { id: 28, seite: 'Sonderprovision NHB', status: '', persovertrieb: false, finanzvertrieb: true },
    { id: 29, seite: 'Notizenseite', status: '', persovertrieb: false, finanzvertrieb: true },
    { id: 30, seite: 'Büro', status: '', persovertrieb: false, finanzvertrieb: true },
    { id: 31, seite: 'Linearisierung', status: '', persovertrieb: false, finanzvertrieb: true },
    { id: 32, seite: 'Vorschuss', status: '', persovertrieb: false, finanzvertrieb: true },
    { id: 33, seite: 'NBB', status: '', persovertrieb: false, finanzvertrieb: true },
    { id: 34, seite: 'WZB', status: '', persovertrieb: false, finanzvertrieb: true },
    { id: 35, seite: 'BAA', status: '', persovertrieb: false, finanzvertrieb: true },
    { id: 36, seite: 'BBEX', status: '', persovertrieb: false, finanzvertrieb: true },
    { id: 37, seite: 'Abrechnungsseite', status: '', persovertrieb: false, finanzvertrieb: true },
    { id: 38, seite: 'Archiv', status: '', persovertrieb: false, finanzvertrieb: true },
    { id: 39, seite: 'Wettbewerbsabrechnung', status: '', persovertrieb: false, finanzvertrieb: true },
    { id: 40, seite: 'Kontoansicht', status: '', persovertrieb: false, finanzvertrieb: true },
    { id: 41, seite: 'Ereignisprotokoll', status: '', persovertrieb: false, finanzvertrieb: true },
    { id: 42, seite: 'CampusScout mit Zusatzfunktion', status: '', persovertrieb: false, finanzvertrieb: true }
  ];

  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('featureMatrixData');
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem('featureMatrixData', JSON.stringify(data));
  }, [data]);

  const filteredData = data.filter(item => {
    const matchesFilter = filter === 'all' ||
      (filter === 'prod' && item.status === 'Prod') ||
      (filter === 'wireframe' && item.status === 'Wireframe') ||
      (filter === 'not-started' && item.status === '');
    
    const matchesSearch = item.seite.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleAddFeature = () => {
    const newFeature = {
      ...formData,
      id: Math.max(...data.map(item => item.id), 0) + 1
    };
    setData([...data, newFeature]);
    setIsAddModalOpen(false);
    setFormData({ seite: '', status: '', persovertrieb: false, finanzvertrieb: false });
  };

  const handleEditFeature = (item) => {
    setEditingItem(item);
    setFormData(item);
    setIsEditModalOpen(true);
  };

  const handleUpdateFeature = () => {
    setData(data.map(item => item.id === editingItem.id ? { ...formData, id: item.id } : item));
    setIsEditModalOpen(false);
    setEditingItem(null);
    setFormData({ seite: '', status: '', persovertrieb: false, finanzvertrieb: false });
  };

  const handleDeleteFeature = (id) => {
    if (window.confirm('Sind Sie sicher, dass Sie dieses Feature löschen möchten?')) {
      setData(data.filter(item => item.id !== id));
    }
  };

  const exportToCSV = () => {
    const headers = ['Feature/Komponente', 'Status', 'Persovertrieb', 'Finanzvertrieb'];
    const csvData = data.map(item => [
      item.seite,
      item.status || 'Geplant',
      item.persovertrieb ? 'Ja' : 'Nein',
      item.finanzvertrieb ? 'Ja' : 'Nein'
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'feature-matrix.csv';
    link.click();
  };

  const exportToJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'feature-matrix.json';
    link.click();
  };

  const getStatusBadge = (status) => {
    if (status === 'Prod') {
      return (
        <div className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
          <CheckCircle2 className="w-3 h-3 mr-1.5" />
          Produktiv
        </div>
      );
    } else if (status === 'Wireframe') {
      return (
        <div className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
          <Clock className="w-3 h-3 mr-1.5" />
          Wireframe
        </div>
      );
    } else {
      return (
        <div className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-600">
          <AlertCircle className="w-3 h-3 mr-1.5" />
          Geplant
        </div>
      );
    }
  };

  const stats = {
    total: data.length,
    prod: data.filter(item => item.status === 'Prod').length,
    wireframe: data.filter(item => item.status === 'Wireframe').length,
    notStarted: data.filter(item => item.status === '').length
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Professional Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-600 dark:bg-blue-500 rounded-xl p-3 mr-4">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Feature Matrix</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Swiss Life Finanzvertrieb - Entwicklungsübersicht</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {isDark ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-600" />}
              </button>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Projekt Status</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">In Entwicklung</div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Features gesamt</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-gray-600 dark:bg-gray-500 h-2 rounded-full" style={{width: '100%'}}></div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Produktiv</p>
                <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{stats.prod}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-emerald-500 dark:bg-emerald-400 h-2 rounded-full" style={{width: `${(stats.prod / stats.total) * 100}%`}}></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{Math.round((stats.prod / stats.total) * 100)}% abgeschlossen</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Wireframe</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">{stats.wireframe}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-blue-500 dark:bg-blue-400 h-2 rounded-full" style={{width: `${(stats.wireframe / stats.total) * 100}%`}}></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{Math.round((stats.wireframe / stats.total) * 100)}% in Planung</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Geplant</p>
                <p className="text-3xl font-bold text-gray-600 dark:text-gray-400 mt-1">{stats.notStarted}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-gray-400 dark:bg-gray-500 h-2 rounded-full" style={{width: `${(stats.notStarted / stats.total) * 100}%`}}></div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{Math.round((stats.notStarted / stats.total) * 100)}% ausstehend</p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Features suchen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Feature hinzufügen
              </button>
              <div className="flex gap-2">
                <button
                  onClick={exportToCSV}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center"
                >
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  CSV
                </button>
                <button
                  onClick={exportToJSON}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  JSON
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filter anwenden</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'all' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Alle ({stats.total})
              </button>
              <button
                onClick={() => setFilter('prod')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'prod' 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Produktiv ({stats.prod})
              </button>
              <button
                onClick={() => setFilter('wireframe')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'wireframe' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Wireframe ({stats.wireframe})
              </button>
              <button
                onClick={() => setFilter('not-started')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'not-started' 
                    ? 'bg-gray-600 text-white shadow-sm' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Geplant ({stats.notStarted})
              </button>
            </div>
          </div>
        </div>

        {/* Professional Table */}
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                    Feature / Komponente
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                    Entwicklungsstatus
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                    Persovertrieb
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                    Finanzvertrieb
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                    Aktionen
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{item.seite}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {item.persovertrieb ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg">
                          <span className="text-gray-400 dark:text-gray-500 text-sm">—</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {item.finanzvertrieb ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg">
                          <span className="text-gray-400 dark:text-gray-500 text-sm">—</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEditFeature(item)}
                          className="p-1.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteFeature(item.id)}
                          className="p-1.5 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Information */}
        <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div>
            Zeige {filteredData.length} von {data.length} Features
          </div>
          <div className="flex items-center space-x-4">
            <span>Letzte Aktualisierung: {new Date().toLocaleDateString('de-DE')}</span>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Feature hinzufügen">
        <form onSubmit={(e) => { e.preventDefault(); handleAddFeature(); }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Feature Name
              </label>
              <input
                type="text"
                required
                value={formData.seite}
                onChange={(e) => setFormData({ ...formData, seite: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Geplant</option>
                <option value="Wireframe">Wireframe</option>
                <option value="Prod">Produktiv</option>
              </select>
            </div>
            <div className="flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.persovertrieb}
                  onChange={(e) => setFormData({ ...formData, persovertrieb: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Persovertrieb</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.finanzvertrieb}
                  onChange={(e) => setFormData({ ...formData, finanzvertrieb: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Finanzvertrieb</span>
              </label>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Speichern
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Feature bearbeiten">
        <form onSubmit={(e) => { e.preventDefault(); handleUpdateFeature(); }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Feature Name
              </label>
              <input
                type="text"
                required
                value={formData.seite}
                onChange={(e) => setFormData({ ...formData, seite: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Geplant</option>
                <option value="Wireframe">Wireframe</option>
                <option value="Prod">Produktiv</option>
              </select>
            </div>
            <div className="flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.persovertrieb}
                  onChange={(e) => setFormData({ ...formData, persovertrieb: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Persovertrieb</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.finanzvertrieb}
                  onChange={(e) => setFormData({ ...formData, finanzvertrieb: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Finanzvertrieb</span>
              </label>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Aktualisieren
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <ThemeProvider>
      <FeatureMatrix />
    </ThemeProvider>
  );
};

export default App;