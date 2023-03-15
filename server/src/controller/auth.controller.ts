import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {User} from "../entity/user.entity";
import bcryptjs from 'bcryptjs';
import {sign} from "jsonwebtoken";

export const Register = async (req: Request, res: Response) => {
    const {name, email, password} = req.body;

    const user = await getRepository(User).save({
        name,
        email,
        password: await bcryptjs.hash(password, 12)
    });

    res.send(user);
}

export const Login = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    const user = await getRepository(User).findOne({email});

    if(!user) {
        return res.status(400).send({
            message: 'Invalid credentials'
        })
    }

    if(!await bcryptjs.compare(password, user.password)) {
        return res.status(400).send({
            message: 'Invalid credentials'
        })
    }

    const accessToken = sign({
        id: user.id
    }, "access_secret", {expiresIn: '30s'});

    const refreshToken = sign({
        id: user.id
    }, "refresh_secret", {expiresIn: '1w'});

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 //1day
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 //7days
    });

    res.send({
        message: 'success'
    });
}
