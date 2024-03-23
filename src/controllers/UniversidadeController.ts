import {Request,Response} from 'express';
import { db } from '../lib/db';


const UserController = {
   async getAll(req : Request,res: Response){  
    
     const universidade = await db.universidade.findMany()

        return res.status(200).json(universidade)
    } 
   
}

export default UserController 