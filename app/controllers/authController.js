const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secret } = require('../../config/jwt');

// Page d'inscription
router.get('/register', (req, res) => {
  res.render('register');
});

// Page de connexion
router.get('/login', (req, res) => {
  res.render('login');
});

// Inscription
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashedPassword,
    });

    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.render('register', { error: 'Une erreur s\'est produite lors de l\'inscription.' });
  }
});

// Connexion
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return res.render('login', { error: 'Identifiants invalides.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.render('login', { error: 'Identifiants invalides.' });
    }

    const token = jwt.sign({ userId: user.id }, secret);

    // Stocker le token dans un cookie sécurisé ou tout autre moyen approprié

    res.redirect('/chat');
  } catch (error) {
    console.error(error);
    res.render('login', { error: 'Une erreur s\'est produite lors de la connexion.' });
  }
});

module.exports = router;
