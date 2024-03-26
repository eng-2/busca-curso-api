const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000; // porta

// Configuração do banco de dados
const pool = new Pool({
  user: 'colocar_usuario',
  host: 'localhost',
  database: 'colocar_nosso_bd',
  password: 'colocar_senha',
  port: 5432,
});

// Endpoint para listar os cursos com média de corte igual ou maior que uma nota enviada pelo usuário
app.get('/api/cursos_por_nota', async (req, res) => {
  const { nota_minima } = req.query;

  try {
    const { rows } = await pool.query(
      `
      SELECT c.nome_curso
      FROM Curso c
      JOIN Concorrencia cc ON c.codigo_curso = cc.codigo_curso
      WHERE cc.media_minima >= $1
      `,
      [nota_minima]
    );

    res.json(rows);
  } catch (err) {
    console.error('Erro ao consultar o banco de dados:', err);
    res.status(500).json({ message: 'Erro ao consultar o banco de dados' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
