import { Request, Response } from 'express';
import { db } from '../lib/db';

interface CursoQueryParams {
    notaCorte?: string;
    turno?: string;
    grau?: string;
    uf?: string;
    municipio?: string;
    qtVagas?: string;
}

const NotaController = {
    async buscarMaiorNotaPorCurso(req: Request, res: Response) {

        try {
            const { nome_curso } = req.params;
            const maiorNota = await db.concorrencia.findMany({
                where: {
                    nome_curso: nome_curso.toUpperCase()

                },
                orderBy: {

                    nota_corte: 'desc' // Ordenar pela maior nota de corte
                },
                include: {
                    campus: {
                        select: {
                            nome_campus: true
                        }
                    }
                }
            });



            if (!maiorNota) {
                return res.status(404).json({ error: 'Nota não encontrada para o curso fornecido.' });
            }

            return res.status(200).json(maiorNota);
        } catch (error) {
            console.error('Erro ao buscar maior nota:', error);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
    },

    async cursosPorNota(req: Request<{}, {}, {}, CursoQueryParams>, res: Response) {
        try {
            let where = {};
          

            const { notaCorte, turno, grau, uf, municipio, qtVagas } = req.query;

            if (!notaCorte) {
                return res.status(404).json({ error: 'Informe a nota de corte.' });
            }

            if (grau) where['grau'] = grau;
            if (turno) where['turno'] = turno;
            if (qtVagas) where['qt_vagas_concorrencia'] = { lte: parseInt(qtVagas) };
            if (notaCorte) where['nota_corte'] = { lte: parseFloat(notaCorte) };

            if (uf) {
                const campus = await db.campus.findMany({
                  where: { uf_campus : uf },
                  select: { codigo_campus: true }
                });
                const campusCodigos = campus.map(c => c.codigo_campus);
                where['codigo_campus'] = { in: campusCodigos };
              }


            // if (uf) whereCampus['uf_campus'] = uf ;
            // if (municipio) whereCampus['municipio_campus'] =  municipio ;



            const cursos = await db.concorrencia.findMany({
                where,
                include: { campus: true }
            });

            res.json(cursos);
        } catch (error) {
            console.error('Erro ao buscar cursos:', error);
            res.status(500).json({ error: 'Erro ao buscar cursos' });
        }

    }



}

export default NotaController 