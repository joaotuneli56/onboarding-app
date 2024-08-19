const express = require('express');
const bodyParser = require('body-parser');
const oracledb = require('oracledb');

const app = express();
app.use(bodyParser.json());

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function checkUser(email, senha) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: 'RM93530',           // Substitua pelo seu usuário Oracle
      password: '030802',         // Substitua pela sua senha Oracle
      connectString: 'localhost:1521/ORCL'  // Substitua pelo seu connect string
    });

    const result = await connection.execute(
      `SELECT * FROM ONBOARDING_APP_USUARIOS WHERE EMAIL = :email AND SENHA = :senha`,
      [email, senha]
    );

    return result.rows.length > 0;
  } catch (err) {
    console.error(err);
    return false;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function registerUser(nome, email, senha) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: 'seu-usuario',
      password: 'sua-senha',
      connectString: 'localhost/orclpdb1'
    });

    await connection.execute(
      `INSERT INTO ONBOARDING_APP_USUARIOS (NOME, EMAIL, SENHA) VALUES (:nome, :email, :senha)`,
      [nome, email, senha],
      { autoCommit: true }
    );

    return true;
  } catch (err) {
    console.error(err);
    return false;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

app.post('/api/login', async (req, res) => {
  const { email, senha } = req.body;
  const success = await checkUser(email, senha);
  res.json({ success });
});

app.post('/api/register', async (req, res) => {
  const { nome, email, senha } = req.body;
  const success = await registerUser(nome, email, senha);
  res.json({ success });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
