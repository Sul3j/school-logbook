import {NextFunction, Request, Response} from "express";
import {ROLE} from "../data/user.role";
import {verify} from "jsonwebtoken";
import {createQueryBuilder, getRepository} from "typeorm";
import {User} from "../entity/user.entity";

export const authRole = (role: ROLE) => {
    return (req: Request, res: Response, next: NextFunction) => {

        const accessToken = req.header('Authorization')?.split(" ")[1] || "";

        const payload: any = verify(accessToken, "access_secret");

        if (payload.role !== role) {
            res.status(401);
            return res.send('Not allowed');
        }

        next();
    }
}

export const UpdateRole = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const {role} = req.body;

        const user = await userIsExist(id);

        if(!user) {
            return res.status(404).json({message: `cannot find any user with ID ${id}`});
        } else {
            await getRepository(User)
                .createQueryBuilder()
                .update()
                .set({role: role})
                .where("id = :id", { id: id}).execute();

            return res.status(200).json({message: 'role updated'})
        }

    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}

export const DeleteUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params;

        const user = await userIsExist(id);

        if(!user) {
            return res.status(404).json({message: `cannot find any user with ID ${id}`});
        } else {
            await getRepository(User)
                .createQueryBuilder()
                .delete()
                .where("id = :id", { id: id}).execute();

            return res.status(200).json({message: 'user deleted'})
        }

    } catch (error: any) {
        res.status(500).json({message: error.message});
    }
}

const userIsExist = async (id: string) => {
    const user = await getRepository(User)
        .createQueryBuilder("user")
        .where("user.id = :id", { id: id })
        .getOne();

    return user;
}