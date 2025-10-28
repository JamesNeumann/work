import React, { useState, useEffect } from 'react';
import { Filter, BarChart3, CheckCircle2, Clock, AlertCircle, Building2 } from 'lucide-react';
import axios from 'axios';

interface FeatureItem {
  _id?: string;
  seite: string;
  status: string;
  persovertrieb: boolean;
  finanzvertrieb: boolean;
}

const FeatureMatrix: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [data, setData] = useState<FeatureItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/features');
      setData(response.data);
    } catch (err) {
      setError('Error loading data');
      // Fallback to static data if API fails
      setData([
        { seite: 'Hierarchiekette', status: 'Prod', persovertrieb: true, finanzvertrieb: true },
        { seite: 'Standardgeldflusskette', status: 'Prod', persovertrieb: true, finanzvertrieb: false },
        { seite: 'Organigramm', status: 'Prod', persovertrieb: true, finanzvertrieb: false },
        { seite: 'Umstrukturierung', status: 'Prod', persovertrieb: true, finanzvertrieb: false },
        { seite: 'Werberhierarchie', status: 'Prod', persovertrieb: true, finanzvertrieb: false },
        { seite: 'VPa-Suche', status: 'Prod', persovertrieb: true, finanzvertrieb: true },
        { seite: 'Stammdaten', status: 'Prod', persovertrieb: true, finanzvertrieb: true },
        { seite: 'Antraggeldflusskette', status: 'Prod', persovertrieb: true, finanzvertrieb: true },
        { seite: 'Positionswechsel', status: 'Prod', persovertrieb: true, finanzvertrieb: true },
        { seite: 'Vergütungseinstellungen', status: 'Prod', persovertrieb: true, finanzvertrieb: false },
        { seite: 'Datenbereitstellung', status: 'Prod', persovertrieb: true, finanzvertrieb: false },
        { seite: 'Geldflusskette', status: 'Prod', persovertrieb: true, finanzvertrieb: false },
        { seite: 'Landing Page', status: 'Wireframe', persovertrieb: true, finanzvertrieb: false },
        { seite: 'Dashboard', status: 'Wireframe', persovertrieb: true, finanzvertrieb: false },
        { seite: 'Bonifikation', status: 'Wireframe', persovertrieb: true, finanzvertrieb: false },
        { seite: 'Vier-Augen-Prinzip', status: 'Wireframe', persovertrieb: true, finanzvertrieb: false },
        { seite: 'Beförderungserlaubnis', status: 'Wireframe', persovertrieb: true, finanzvertrieb: false },
        { seite: 'Anschubfinanzierung – LaP', status: 'Wireframe', persovertrieb: true, finanzvertrieb: true },
        { seite: 'Anschubfinanzierung – Linearisierung', status: 'Wireframe', persovertrieb: true, finanzvertrieb: true },
        { seite: 'Anschubfinanzierung – CampusScout', status: 'Wireframe', persovertrieb: true, finanzvertrieb: true },
        { seite: 'Anschubfinanzierung – Vorschuss', status: 'Wireframe', persovertrieb: true, finanzvertrieb: true },
        { seite: 'Bankverbindung', status: '', persovertrieb: true, finanzvertrieb: true },
        { seite: 'Kontosperren', status: '', persovertrieb: true, finanzvertrieb: true },
        { seite: 'Pfändungssperre', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Recruitingbonus', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Bringerbonus', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Unterlage', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Sonderprovision NHB', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Notizenseite', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Büro', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Linearisierung', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Vorschuss', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'NBB', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'WZB', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'BAA', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'BBEX', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Abrechnungsseite', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Archiv', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Wettbewerbsabrechnung', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Kontoansicht', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'Ereignisprotokoll', status: '', persovertrieb: false, finanzvertrieb: true },
        { seite: 'CampusScout mit Zusatzfunktion', status: '', persovertrieb: false, finanzvertrieb: true }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = data.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'prod') return item.status === 'Prod';
    if (filter === 'wireframe') return item.status === 'Wireframe';
    if (filter === 'not-started') return item.status === '';
    return true;
  });

  const getStatusBadge = (status: string) => {
    if (status === 'Prod') {
      return (
        <div className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <CheckCircle2 className="w-3 h-3 mr-1.5" />
          Produktiv
        </div>
      );
    } else if (status === 'Wireframe') {
      return (
        <div className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <Clock className="w-3 h-3 mr-1.5" />
          Wireframe
        </div>
      );
    } else {
      return (
        <div className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-50 text-gray-600 border border-gray-200">
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Lade Daten...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-600 rounded-xl p-3 mr-4">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Feature Matrix</h1>
                <p className="text-gray-600 mt-1">Swiss Life Finanzvertrieb - Entwicklungsübersicht</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="text-sm text-gray-500 mb-1">Projekt Status</div>
              <div className="text-lg font-semibold text-gray-900 mb-2">In Entwicklung</div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Features gesamt</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-gray-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-600 h-2 rounded-full" style={{width: '100%'}}></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Produktiv</p>
                <p className="text-3xl font-bold text-emerald-600 mt-1">{stats.prod}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{width: `${(stats.prod / stats.total) * 100}%`}}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{Math.round((stats.prod / stats.total) * 100)}% abgeschlossen</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Wireframe</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">{stats.wireframe}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: `${(stats.wireframe / stats.total) * 100}%`}}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{Math.round((stats.wireframe / stats.total) * 100)}% in Planung</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Geplant</p>
                <p className="text-3xl font-bold text-gray-600 mt-1">{stats.notStarted}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-gray-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-400 h-2 rounded-full" style={{width: `${(stats.notStarted / stats.total) * 100}%`}}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{Math.round((stats.notStarted / stats.total) * 100)}% ausstehend</p>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-xl p-6 mb-8 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-500 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Filter anwenden</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'all' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Alle ({stats.total})
              </button>
              <button
                onClick={() => setFilter('prod')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'prod' 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Produktiv ({stats.prod})
              </button>
              <button
                onClick={() => setFilter('wireframe')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'wireframe' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Wireframe ({stats.wireframe})
              </button>
              <button
                onClick={() => setFilter('not-started')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === 'not-started' 
                    ? 'bg-gray-600 text-white shadow-sm' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Geplant ({stats.notStarted})
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
              <p className="text-yellow-800">{error} - Fallback-Daten werden verwendet</p>
            </div>
          </div>
        )}

        {/* Professional Table */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                    Feature / Komponente
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                    Entwicklungsstatus
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-900 uppercase tracking-wider">
                    Persovertrieb
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-900 uppercase tracking-wider">
                    Finanzvertrieb
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.seite}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {item.persovertrieb ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                          <span className="text-gray-400 text-sm">—</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {item.finanzvertrieb ? (
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 rounded-lg">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-lg">
                          <span className="text-gray-400 text-sm">—</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Information */}
        <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
          <div>
            Zeige {filteredData.length} von {data.length} Features
          </div>
          <div className="flex items-center space-x-4">
            <span>Letzte Aktualisierung: {new Date().toLocaleDateString('de-DE')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureMatrix;