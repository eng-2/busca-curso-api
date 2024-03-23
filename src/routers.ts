import { Router } from "express";
const routes = Router();

import UniversidadeController from "./controllers/UniversidadeController";
import NotaController from "./controllers/NotaController";

routes.get('/universidades', UniversidadeController.getAll);
routes.get('/notas-de-corte/curso/:nome_curso', NotaController.buscarMaiorNotaPorCurso);

export { routes };