import { UserController } from "../controllers/userControllers";
import { checkJwt } from "../middlewares/checkJwt";

import express from "express";

export class UserRoute{
    public router: express.Router;
    private controller: UserController;

    constructor(){
        this.router = express.Router();
        this.controller = new UserController();
        this.configRoutes();
    }

    configRoutes():void {
        this.router.post("/signIn", this.controller.signIn);
        
        this.router.post("/signUp", this.controller.signUp);
        
        this.router.post("/searchUser", checkJwt, this.controller.searchUser);

        this.router.get("/searchUsers/:page/:limit", checkJwt, this.controller.searchAllUsers);

        this.router.post('/signOut', checkJwt, this.controller.signOut);
    }
}


