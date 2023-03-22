import {NextFunction, Request, Response} from "express";
import {ROLE} from "../data/user.role";
import {verify} from "jsonwebtoken";

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