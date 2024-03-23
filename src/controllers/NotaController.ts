import {Request,Response} from 'express';
import { db } from '../lib/db';


const NotaController = {
   async buscarMaiorNotaPorCurso(req : Request,res: Response){  
    
    try {
        const { nome_curso } = req.params;
        const maiorNota = await db.concorrencia.findMany({
            where: {
                nome_curso: nome_curso.toUpperCase(),
                tipo_mod_concorrencia: 'A',

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
    } 
   
}

export default NotaController 