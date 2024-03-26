import express from "express";
import pg from "pg";
const { Pool } = pg;

// Factory Method
class PoolFactoryBase {
  createPool(config) {
    throw new Error("createPool method must be implemented");
  }
}
class PoolFactory extends PoolFactoryBase {
  createPool(config) {
    return new Pool(config);
  }
}

// Configuração do banco de dados
const poolConfig = {
  user: "colocar_usuario",
  host: "localhost",
  database: "colocar_nosso_bd",
  password: "colocar_senha",
  port: 5432,
};

const factory = new PoolFactory();
const pool = factory.createPool(poolConfig);

const app = express();
const port = 3000;

app.get("/api/cursos_por_nota", async (req, res) => {
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
    console.error("Erro ao consultar o banco de dados:", err);
    res.status(500).json({ message: "Erro ao consultar o banco de dados" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});