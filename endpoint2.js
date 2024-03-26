const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000; // porta

// Configuração do banco de dados
const pool = new Pool({
  user: 'coloar_usuario',
  host: 'localhost',
  database: 'colocar_bd',
  password: 'colocar_senha',
  port: 5432,
});

// Endpoint para listar a média de corte de um curso com base no turno, estado e nome do curso
app.get('/api/media_corte', async (req, res) => {
  const { turno, estado, nome_curso } = req.query;

  try {
    const { rows } = await pool.query(
      `
      SELECT cc.media_minima
      FROM Curso c
      JOIN Concorrencia cc ON c.codigo_curso = cc.codigo_curso
      WHERE c.turno = $1 AND c.estado = $2 AND c.nome_curso = $3
      `,
      [turno, estado, nome_curso]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Curso não encontrado' });
    }

    const mediaCorte = rows[0].media_minima;
    res.json({ mediaCorte });
  } catch (err) {
    console.error('Erro ao consultar o banco de dados:', err);
    res.status(500).json({ message: 'Erro ao consultar o banco de dados' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

