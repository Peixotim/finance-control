import {Router} from "express";
import {healthRoutes} from "../health/routes/health.routes";

const routes : Router = Router();

const modules = [
    {path : '/health' , router : healthRoutes}
] as const;


modules.forEach(({path, router}) => routes.use(path, router));

export {routes}