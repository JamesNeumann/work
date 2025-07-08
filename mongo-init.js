// MongoDB Initialization Script for Production
// This script runs when the MongoDB container starts for the first time

// Switch to the feature-matrix database
db = db.getSiblingDB('feature-matrix');

// Create collections with validation
db.createCollection('users', {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["username", "email", "password", "firstName", "lastName", "role", "department"],
         properties: {
            username: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            email: {
               bsonType: "string",
               pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
               description: "must be a valid email address and is required"
            },
            password: {
               bsonType: "string",
               minLength: 6,
               description: "must be a string with minimum 6 characters and is required"
            },
            firstName: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            lastName: {
               bsonType: "string",
               description: "must be a string and is required"
            },
            role: {
               bsonType: "string",
               enum: ["user", "manager", "admin"],
               description: "must be one of: user, manager, admin"
            },
            department: {
               bsonType: "string",
               enum: ["persovertrieb", "finanzvertrieb", "both", "admin"],
               description: "must be one of: persovertrieb, finanzvertrieb, both, admin"
            },
            isActive: {
               bsonType: "bool",
               description: "must be a boolean"
            }
         }
      }
   }
});

db.createCollection('features', {
   validator: {
      $jsonSchema: {
         bsonType: "object",
         required: ["seite", "createdBy"],
         properties: {
            seite: {
               bsonType: "string",
               maxLength: 200,
               description: "must be a string with max 200 characters and is required"
            },
            status: {
               bsonType: "string",
               enum: ["", "Wireframe", "Prod"],
               description: "must be one of: empty string, Wireframe, Prod"
            },
            persovertrieb: {
               bsonType: "bool",
               description: "must be a boolean"
            },
            finanzvertrieb: {
               bsonType: "bool",
               description: "must be a boolean"
            },
            priority: {
               bsonType: "string",
               enum: ["low", "medium", "high", "critical"],
               description: "must be one of: low, medium, high, critical"
            },
            description: {
               bsonType: "string",
               maxLength: 1000,
               description: "must be a string with max 1000 characters"
            }
         }
      }
   }
});

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "username": 1 }, { unique: true });
db.users.createIndex({ "role": 1 });
db.users.createIndex({ "department": 1 });
db.users.createIndex({ "isActive": 1 });

db.features.createIndex({ "seite": "text" });
db.features.createIndex({ "status": 1 });
db.features.createIndex({ "createdBy": 1 });
db.features.createIndex({ "priority": 1 });
db.features.createIndex({ "persovertrieb": 1 });
db.features.createIndex({ "finanzvertrieb": 1 });
db.features.createIndex({ "createdAt": -1 });
db.features.createIndex({ "updatedAt": -1 });

// Create default admin user (password will be hashed by the application)
// Default password: admin123 (should be changed after first login)
db.users.insertOne({
   username: "admin",
   email: "admin@work.cloud.vu",
   password: "$2a$10$rQ0FQ0yQ5Q5Q5Q5Q5Q5Q5u", // This will be replaced by the app
   firstName: "System",
   lastName: "Administrator",
   role: "admin",
   department: "both",
   isActive: true,
   preferences: {
      theme: "light",
      language: "de",
      notifications: {
         email: true,
         inApp: true
      }
   },
   createdAt: new Date(),
   updatedAt: new Date(),
   loginAttempts: 0
});

// Insert initial feature data
db.features.insertMany([
   {
      seite: "Hierarchiekette",
      status: "Prod",
      persovertrieb: true,
      finanzvertrieb: true,
      priority: "high",
      description: "Verwaltung der Organisationshierarchie",
      createdBy: db.users.findOne({email: "admin@work.cloud.vu"})._id,
      lastModifiedBy: db.users.findOne({email: "admin@work.cloud.vu"})._id,
      createdAt: new Date(),
      updatedAt: new Date(),
      history: [{
         action: "created",
         performedBy: db.users.findOne({email: "admin@work.cloud.vu"})._id,
         timestamp: new Date()
      }]
   },
   {
      seite: "Standardgeldflusskette",
      status: "Prod",
      persovertrieb: true,
      finanzvertrieb: false,
      priority: "medium",
      description: "Standard-Provisionsverteilung",
      createdBy: db.users.findOne({email: "admin@work.cloud.vu"})._id,
      lastModifiedBy: db.users.findOne({email: "admin@work.cloud.vu"})._id,
      createdAt: new Date(),
      updatedAt: new Date(),
      history: [{
         action: "created",
         performedBy: db.users.findOne({email: "admin@work.cloud.vu"})._id,
         timestamp: new Date()
      }]
   },
   {
      seite: "Organigramm",
      status: "Prod",
      persovertrieb: true,
      finanzvertrieb: false,
      priority: "medium",
      description: "Visualisierung der Organisationsstruktur",
      createdBy: db.users.findOne({email: "admin@work.cloud.vu"})._id,
      lastModifiedBy: db.users.findOne({email: "admin@work.cloud.vu"})._id,
      createdAt: new Date(),
      updatedAt: new Date(),
      history: [{
         action: "created",
         performedBy: db.users.findOne({email: "admin@work.cloud.vu"})._id,
         timestamp: new Date()
      }]
   },
   {
      seite: "Landing Page",
      status: "Wireframe",
      persovertrieb: true,
      finanzvertrieb: false,
      priority: "low",
      description: "Neue Startseite mit modernem Design",
      createdBy: db.users.findOne({email: "admin@work.cloud.vu"})._id,
      lastModifiedBy: db.users.findOne({email: "admin@work.cloud.vu"})._id,
      createdAt: new Date(),
      updatedAt: new Date(),
      history: [{
         action: "created",
         performedBy: db.users.findOne({email: "admin@work.cloud.vu"})._id,
         timestamp: new Date()
      }]
   },
   {
      seite: "Dashboard",
      status: "Wireframe",
      persovertrieb: true,
      finanzvertrieb: false,
      priority: "high",
      description: "Zentrale Übersichtsseite für alle Kennzahlen",
      createdBy: db.users.findOne({email: "admin@work.cloud.vu"})._id,
      lastModifiedBy: db.users.findOne({email: "admin@work.cloud.vu"})._id,
      createdAt: new Date(),
      updatedAt: new Date(),
      history: [{
         action: "created",
         performedBy: db.users.findOne({email: "admin@work.cloud.vu"})._id,
         timestamp: new Date()
      }]
   }
]);

print("MongoDB initialization completed successfully!");
print("Default admin user created: admin@work.cloud.vu");
print("Database: feature-matrix");
print("Collections created: users, features");
print("Indexes created for performance optimization");
print("Sample data inserted successfully");