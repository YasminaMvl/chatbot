const express = require('express');
const app = express();
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('./app/config/database');
const routes = require('./app/config/routes');
require('dotenv').config(); // Ajout de cette ligne pour charger les variables d'environnement

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuration de Sequelize
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database.');
        await sequelize.sync({ alter: true }); // Synchronisation des modèles avec la base de données
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

// Routes
app.use('/', routes);

// Gestion des erreurs 404
app.use((req, res, next) => {
    res.status(404).send('Page not found');
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

// Démarrage du serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
