# Feature Matrix - Swiss Life Finanzvertrieb

Eine Enterprise-level Anwendung zur Verwaltung und Verfolgung von Features in der Entwicklung für Swiss Life Finanzvertrieb.

## Features

### 🚀 Kern-Funktionen
- **CRUD Operations**: Vollständige Create, Read, Update, Delete Funktionalität für Features
- **MongoDB Integration**: Persistente Datenspeicherung mit MongoDB
- **Authentication**: JWT-basierte Benutzerauthentifizierung
- **Dark Mode**: Vollständiger Light/Dark Theme Support
- **Responsive Design**: Optimiert für Desktop, Tablet und Mobile
- **Export Funktionen**: CSV und JSON Export
- **Erweiterte Suche**: Real-time Suche und Filterung

### 🔐 Sicherheit
- JWT Token-basierte Authentifizierung
- Rollen-basierte Zugriffskontrolle (User, Manager, Admin)
- Rate Limiting
- Input Validation
- Secure Password Hashing (bcrypt)

### 📊 Dashboard Features
- Statistik-Übersicht mit Progress Bars
- Filter nach Status (Produktiv, Wireframe, Geplant)
- Prioritäts-Management
- Department-spezifische Ansichten

## Installation

### Voraussetzungen
- Node.js 18+
- MongoDB 7.0+
- Docker (optional)

### Lokale Installation

1. **Repository klonen**
```bash
git clone <repository-url>
cd feature-matrix
```

2. **Dependencies installieren**
```bash
npm install
```

3. **Umgebungsvariablen konfigurieren**
```bash
cp .env.example .env
# .env Datei bearbeiten mit deinen Konfigurationen
```

4. **MongoDB starten**
```bash
# Lokal mit MongoDB
mongod

# Oder mit Docker
docker run -d -p 27017:27017 --name mongodb mongo:7.0
```

5. **Backend starten**
```bash
npm run dev
```

6. **Frontend öffnen**
- Öffne `index-api.html` in deinem Browser für die API-Version
- Oder `index.html` für die localStorage-Version

### Docker Installation

1. **Mit Docker Compose starten**
```bash
docker-compose up -d
```

Dies startet:
- MongoDB auf Port 27017
- Backend API auf Port 5000
- Nginx Reverse Proxy auf Port 80

## API Dokumentation

### Authentication Endpoints

#### POST `/api/auth/register`
Neuen Benutzer registrieren
```json
{
  "username": "mustermann",
  "email": "max@example.com",
  "password": "password123",
  "firstName": "Max",
  "lastName": "Mustermann",
  "department": "finanzvertrieb"
}
```

#### POST `/api/auth/login`
Benutzer anmelden
```json
{
  "email": "max@example.com",
  "password": "password123"
}
```

#### GET `/api/auth/me`
Aktueller Benutzer (requires token)

### Feature Endpoints

#### GET `/api/features`
Alle Features abrufen (mit Filterung und Paginierung)
Query Parameters:
- `page`: Seitennummer (default: 1)
- `limit`: Anzahl pro Seite (default: 50)
- `status`: Filter nach Status (Prod, Wireframe, '')
- `search`: Suchterm
- `persovertrieb`: true/false
- `finanzvertrieb`: true/false

#### POST `/api/features`
Neues Feature erstellen
```json
{
  "seite": "Feature Name",
  "status": "Wireframe",
  "persovertrieb": true,
  "finanzvertrieb": false,
  "description": "Feature Beschreibung",
  "priority": "high"
}
```

#### PUT `/api/features/:id`
Feature aktualisieren

#### DELETE `/api/features/:id`
Feature löschen (nur Admin/Manager)

#### GET `/api/features/stats/overview`
Statistik-Übersicht

## Benutzerrollen

### User
- Features anzeigen und bearbeiten
- Eigene Features erstellen
- Export-Funktionen nutzen

### Manager
- Alle User-Rechte
- Features löschen
- Bulk-Import von Features

### Admin
- Alle Manager-Rechte
- Benutzer verwalten
- System-Konfiguration

## Konfiguration

### Umgebungsvariablen

| Variable | Beschreibung | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Verbindungs-URL | `mongodb://localhost:27017/feature-matrix` |
| `PORT` | Server Port | `5000` |
| `JWT_SECRET` | JWT Secret Key | - |
| `JWT_EXPIRE` | Token Gültigkeitsdauer | `30d` |
| `NODE_ENV` | Umgebung | `development` |

### MongoDB Schema

#### Feature Schema
```javascript
{
  seite: String (required),
  status: String (enum: ['', 'Wireframe', 'Prod']),
  persovertrieb: Boolean,
  finanzvertrieb: Boolean,
  description: String,
  priority: String (enum: ['low', 'medium', 'high', 'critical']),
  createdBy: ObjectId (User),
  lastModifiedBy: ObjectId (User),
  createdAt: Date,
  updatedAt: Date,
  history: Array // Änderungshistorie
}
```

#### User Schema
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  firstName: String,
  lastName: String,
  role: String (enum: ['user', 'admin', 'manager']),
  department: String (enum: ['persovertrieb', 'finanzvertrieb', 'both']),
  isActive: Boolean,
  preferences: {
    theme: String,
    language: String,
    notifications: Object
  }
}
```

## Deployment

### Production Setup

1. **Umgebungsvariablen für Production setzen**
```bash
NODE_ENV=production
MONGODB_URI=mongodb://your-production-mongodb
JWT_SECRET=your-very-secure-secret-key
```

2. **Mit Docker Compose deployen**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

3. **SSL Zertifikate konfigurieren**
- Zertifikate in `./ssl/` Verzeichnis legen
- Nginx Konfiguration anpassen

### Monitoring

- Health Check Endpoint: `GET /api/health`
- MongoDB Monitoring über Compass
- Application Logs in `./logs/` Verzeichnis

## Sicherheits-Features

- **Rate Limiting**: 100 Requests pro 15 Minuten
- **Helmet.js**: Security Headers
- **CORS**: Konfigurierbare Cross-Origin Requests
- **Input Validation**: Express-validator
- **Password Security**: bcrypt mit Salt
- **JWT Security**: Sichere Token-Generierung

## Backup & Recovery

### MongoDB Backup
```bash
mongodump --uri="mongodb://localhost:27017/feature-matrix" --out ./backup/
```

### MongoDB Restore
```bash
mongorestore --uri="mongodb://localhost:27017/feature-matrix" ./backup/feature-matrix/
```

## Support

Für Support und Fragen:
- Issues erstellen im Repository
- Dokumentation prüfen
- Logs in `./logs/` überprüfen

## Lizenz

Dieses Projekt ist für Swiss Life Finanzvertrieb entwickelt.