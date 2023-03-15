import {Request, Response} from "express";
import {getRepository} from "typeorm";
import {User} from "../entity/user.entity";
import bcryptjs from 'bcryptjs';

export const Register = async (req: Request, res: Response) => {
    const {name, email, password} = req.body;

    const user = await getRepository(User).save({
        name,
        email,
        password: await bcryptjs.hash(password, 12)
    });

    res.send(user);
}
