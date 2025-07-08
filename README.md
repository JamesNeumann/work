# Feature Matrix Application

Eine React-Anwendung mit MongoDB-Backend zur Verwaltung und Darstellung einer Feature-Matrix für Swiss Life Finanzvertrieb.

## Features

- **Responsive Design**: Moderne UI mit Tailwind CSS
- **Datenfilterung**: Filter nach Entwicklungsstatus (Produktiv, Wireframe, Geplant)
- **Statistik-Dashboard**: Übersicht über Projektfortschritt
- **REST API**: Vollständige CRUD-Operationen
- **MongoDB Integration**: Persistente Datenspeicherung
- **Docker Support**: Containerisierte Anwendung

## Technologien

- **Frontend**: React, TypeScript, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Containerisierung**: Docker, Docker Compose

## Entwicklung

### Voraussetzungen

- Node.js 18+
- MongoDB (lokal oder Docker)
- Docker & Docker Compose (optional)

### Lokale Entwicklung

1. **Repository klonen**
   ```bash
   git clone <repository-url>
   cd feature-matrix
   ```

2. **Dependencies installieren**
   ```bash
   npm install
   npm run install-server
   ```

3. **Umgebungsvariablen konfigurieren**
   ```bash
   cp .env.example .env
   ```

4. **MongoDB starten** (wenn lokal installiert)
   ```bash
   mongod
   ```

5. **Anwendung starten**
   ```bash
   npm run dev
   ```

   Die Anwendung ist verfügbar unter:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Docker Deployment

1. **Mit Docker Compose starten**
   ```bash
   docker-compose up --build
   ```

2. **Datenbank initialisieren**
   ```bash
   curl -X POST http://localhost:5000/api/init
   ```

   Die Anwendung ist verfügbar unter: http://localhost:5000

## API Endpoints

- `GET /api/features` - Alle Features abrufen
- `POST /api/features` - Neues Feature erstellen
- `PUT /api/features/:id` - Feature aktualisieren
- `DELETE /api/features/:id` - Feature löschen
- `POST /api/init` - Datenbank mit Beispieldaten initialisieren

## Projektstruktur

```
feature-matrix/
├── public/                 # Statische Dateien
├── src/
│   ├── components/        # React Komponenten
│   │   └── FeatureMatrix.tsx
│   ├── App.tsx
│   └── index.tsx
├── server/                # Backend API
│   ├── index.js          # Express Server
│   └── package.json
├── docker-compose.yml     # Docker Compose Konfiguration
├── Dockerfile            # Docker Image Definition
└── README.md
```

## Deployment

### Produktionsumgebung

1. **Environment Variables setzen**
   ```bash
   export NODE_ENV=production
   export MONGODB_URI=mongodb://user:pass@host:port/database
   ```

2. **Build erstellen**
   ```bash
   npm run build
   ```

3. **Server starten**
   ```bash
   npm run server
   ```

### Mit Docker

```bash
docker-compose -f docker-compose.yml up -d
```

## Lizenz

Dieses Projekt ist für interne Zwecke bei Swiss Life entwickelt worden.