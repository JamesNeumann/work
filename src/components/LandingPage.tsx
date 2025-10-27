import React from 'react';
import {
  Building2,
  CheckCircle2,
  Clock,
  Shield,
  Database,
  TrendingUp,
  Users,
  FileText,
  ArrowRight,
  Zap,
  BarChart3,
  Lock
} from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-2">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Swiss Life</h1>
                <p className="text-xs text-gray-600">Finanzvertrieb</p>
              </div>
            </div>
            <button
              onClick={onEnter}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105"
            >
              Zur Feature Matrix
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full mb-6">
              <Zap className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-semibold text-blue-600">Enterprise Feature Management</span>
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Ihre zentrale
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Feature Matrix</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Verwalten und verfolgen Sie alle Features und Entwicklungen für Swiss Life Finanzvertrieb
              in einer modernen, übersichtlichen Enterprise-Anwendung.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={onEnter}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all hover:scale-105 flex items-center"
              >
                Feature Matrix öffnen
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold border-2 border-gray-200 hover:border-gray-300 transition-all hover:shadow-lg">
                Dokumentation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl mb-3">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">40+</p>
              <p className="text-sm text-gray-600">Features gesamt</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-xl mb-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="text-3xl font-bold text-emerald-600 mb-1">12</p>
              <p className="text-sm text-gray-600">Produktiv</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-xl mb-3">
                <Clock className="w-6 h-6 text-indigo-600" />
              </div>
              <p className="text-3xl font-bold text-indigo-600 mb-1">9</p>
              <p className="text-sm text-gray-600">In Entwicklung</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mb-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-purple-600 mb-1">100%</p>
              <p className="text-sm text-gray-600">Transparenz</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Enterprise Features</h2>
          <p className="text-xl text-gray-600">
            Alles was Sie für professionelles Feature Management benötigen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-xl transition-all hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6">
              <Database className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">MongoDB Integration</h3>
            <p className="text-gray-600 leading-relaxed">
              Persistente Datenspeicherung mit MongoDB für zuverlässige und skalierbare Datenverwaltung.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-xl transition-all hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">JWT Authentication</h3>
            <p className="text-gray-600 leading-relaxed">
              Sichere JWT-basierte Authentifizierung mit Rollen-basierter Zugriffskontrolle.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-xl transition-all hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
              <BarChart3 className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Live Statistiken</h3>
            <p className="text-gray-600 leading-relaxed">
              Echtzeit-Dashboard mit detaillierten Statistiken und Fortschrittsbalken.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-xl transition-all hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-Department</h3>
            <p className="text-gray-600 leading-relaxed">
              Separate Ansichten für Persovertrieb und Finanzvertrieb mit individuellen Filtern.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-xl transition-all hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Export Funktionen</h3>
            <p className="text-gray-600 leading-relaxed">
              Exportieren Sie Daten in CSV und JSON Format für weitere Analysen.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-xl transition-all hover:scale-105">
            <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Enterprise Security</h3>
            <p className="text-gray-600 leading-relaxed">
              Rate Limiting, Helmet.js, CORS und sichere Password-Hashing für maximale Sicherheit.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Bereit loszulegen?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Öffnen Sie die Feature Matrix und starten Sie mit der Verwaltung Ihrer Features
          </p>
          <button
            onClick={onEnter}
            className="group px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-xl transition-all hover:scale-105 inline-flex items-center"
          >
            Jetzt starten
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg p-2">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Swiss Life Finanzvertrieb</p>
                <p className="text-xs text-gray-600">Enterprise Feature Matrix</p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} Swiss Life. Alle Rechte vorbehalten.
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
