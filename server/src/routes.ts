import {Router} from "express";
import {AuthenticatedUser, Login, Logout, Refresh, Register} from "./controller/auth.controller";
import {authRole, UpdateRole} from "./controller/role.controller";
import {ROLE} from "./data/user.role";

export const routes = (router: Router) => {
    router.post('/api/register', Register);
    router.post('/api/login', Login);
    router.get('/api/user', authRole(ROLE.USER), AuthenticatedUser);
    router.post('/api/refresh', Refresh);
    router.post('/api/logout', Logout);

    //menage users
    router.put('/api/role/:id', UpdateRole);

}