const express = require('express');
const router = express.Router();
const cuentasController = require('../controllers/cuentasController');

// Listar cuentas
router.get('/cuentas', cuentasController.getAllAccounts);

// Obtener cuenta por id 
router.get('/cuenta/:id', cuentasController.getAccountById);

// Endpoint para balance total
router.get('/cuentasBalance', cuentasController.getAccountsBalance);

module.exports = router;
