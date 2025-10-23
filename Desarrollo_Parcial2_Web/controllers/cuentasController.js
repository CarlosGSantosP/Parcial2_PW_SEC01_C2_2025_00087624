const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/cuentas.json');

function readData() {
  const raw = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(raw);
}

exports.getAllAccounts = (req, res) => {
  const cuentas = readData();

  const { queryParam } = req.query;
  if (queryParam !== undefined) {
    const q = queryParam.toString().toLowerCase().trim();

    // Buscar por id 
    const maybeId = Number(q);
    if (!Number.isNaN(maybeId)) {
      const found = cuentas.find(c => c.id === maybeId);
      if (found) {
        return res.json({ finded: true, account: found });
      } else {
        return res.json({ finded: false, account: null });
      }
    }

    // Buscar por nombre o por género 
    // Nombre: busqueda parcial
    const byName = cuentas.filter(c => c.name.toLowerCase().includes(q));
    if (byName.length === 1) {
      return res.json({ finded: true, account: byName[0] });
    }
    if (byName.length > 1) {
      return res.json({ finded: true, data: byName });
    }

    // Buscar por genero
    const byGender = cuentas.filter(c => c.gender.toLowerCase() === q);
    if (byGender.length === 1) {
      return res.json({ finded: true, account: byGender[0] });
    }
    if (byGender.length > 1) {
      return res.json({ finded: true, data: byGender });
    }

    // Si no encontró nada
    return res.json({ finded: false, account: null });
  }

  // Si no hay queryParam: devolver todas
  return res.json({ count: cuentas.length, data: cuentas });
};

exports.getAccountById = (req, res) => {
  const cuentas = readData();
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ finded: false, account: null, message: 'ID inválido' });
  }
  const found = cuentas.find(c => c.id === id);
  if (found) {
    return res.json({ finded: true, account: found });
  } else {
    return res.json({ finded: false, account: null });
  }
};

exports.getAccountsBalance = (req, res) => {
  const cuentas = readData();
  const activeAccounts = cuentas.filter(c => c.isActive === true);
  if (activeAccounts.length === 0) {
    return res.json({ status: false, accountBalance: 0 });
  }
  const sum = activeAccounts.reduce((acc, c) => acc + Number(c.balance || 0), 0);
 
  const accountBalance = Math.round(sum * 100) / 100;
  return res.json({ status: true, accountBalance });
};
