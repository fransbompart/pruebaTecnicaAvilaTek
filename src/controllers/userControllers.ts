import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel";
import bcrypt from "bcryptjs";

export class UserController {
    signIn = async (req: Request, res: Response) => {
        let { email, password } = req.body;

        if (!(email && password))
            res.status(401).send('Email and password are required');
        else{
            const user = await userModel.findOneAndUpdate({email}, {isLoggedIn: true}).exec();

            if (user){
                if (await bcrypt.compare(password, user.password)){
                    const token = jwt.sign({_id: user.id}, <string>process.env.JWTSECRET, {expiresIn: '15m'});
                    res.cookie('token', token);
                    res.send('User sign in');
                }
                else
                    res.status(401).send('Incorrect password');
            }
            else
                res.status(401).send('User not found');
        }        
    };

    signUp = async (req: Request, res: Response) => {
        let {email, password} = req.body;

        if (!(email && password)) 
            res.status(401).send('Email and password are required');
        else{
            const hashPassword = await bcrypt.hash(password, 10);

            const user = await userModel.findOne({email}).exec();
            
            if (!user){
                let newUser = new userModel({email, password: hashPassword, isLoggedIn: false});
                newUser = await newUser.save();
                if (newUser){
                    const token = jwt.sign({_id: newUser.id}, <string>process.env.JWTSECRET, {expiresIn: '15m'});
                    res.send('User sign up');
                }
                else
                    res.status(401).send('Not possible to sign up');
            }
            else
                res.status(401).send('Email already in use');
        }        
    };

    searchUser = async (req: Request, res: Response) => {
        const { email } = req.body;
        
        if (!email) 
            res.status(401).send('Email is required');
        else{
            const user = await userModel.find({email}).exec();

            if (user)
                res.send({ user });
            else
                res.send('User not found');
        }
    }

    searchAllUsers = async (req: Request, res: Response) => {
        const {page, limit} = req.params;
        const pageNumber = Number(page);

        const pageLimit = Number(limit);

        const skipItems = (pageNumber - 1) * Number(limit);

        const totalUsers = await userModel.countDocuments().exec();
        if (totalUsers){
            const lastPage = Math.ceil(totalUsers / pageLimit);
            if (pageNumber <= lastPage){
                const users = await userModel.find({}).skip(skipItems).limit(pageLimit).exec();
                if (users)
                    res.send({users, lastPage});
                else
                    res.send('Get users unsuccessful');
            }
            else
                res.status(401).send('Page not exists');
        }
    }

    signOut = async (req: Request, res: Response) => {
        const _id = res.locals.jwtPayload;
        const result = await userModel.findByIdAndUpdate(_id, {isLoggedIn: false}).exec();
        if (result){
            res.clearCookie('token');
            res.send('User sign out');
        }
        else
            res.status(401).send('User not found');
    }
}