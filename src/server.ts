import express from "express";
import { routes } from "./routers";
import cors from 'cors';



const app = express();

app.use(express.json());

app.use(cors({
    origin: '*'
}));


app.use(routes);

app.listen(3000, () => console.log("Server is running"));