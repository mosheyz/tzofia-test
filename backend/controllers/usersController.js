import { fail, success } from "../utils/resFormater.js";
import { usersRepo } from "../DAL/usersRepo.js";
import bcrypt from "bcrypt";
import { generateToken } from "../services/generateToken.js";

export const register = async (req, res) => {
    const data = req.body;
    const users = await usersRepo.getAll();
    const isExist = users.find((user) => user.email === data.email);
    if (isExist) {
        const err = new Error("User already exist");
        err.status = 409;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);
    data.password = hashedPassword;

    const newUser = await usersRepo.create(data);
    delete newUser.password;

    res.status(201).send(success({ user: newUser }));
};

export const login = async (req, res) => {
    const data = req.body;
    const users = await usersRepo.getAll();
    const user = users.find((user) => user.email === data.email);
    if (!user) {
        const err = new Error("Incorrect email or password");
        err.status = 404;
        throw err;
    }

    const isEqual = await bcrypt.compare(data.password, user.password);
    if (!isEqual) {
        const err = new Error("Incorrect email or password");
        err.status = 401;
        throw err;
    }

    delete user.password;

    const token = generateToken(user);
    res.status(200).send(success({ user, token }));
};

export const getAllUsers = async (req, res) => {
    const users = await usersRepo.getAll();

    res.status(200).send(success(users));
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await usersRepo.getById(id);
    if (!user) {
        const err = new Error("Incorrect email or password");
        err.status = 404;
        throw err;
    }

    delete user.password;

    res.status(200).send(success(user));
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    const user = await getUserById(id);
    if (!user) {
        const err = new Error("Incorrect email or password");
        err.status = 404;
        throw err;
    }
    const result = await usersRepo.delete(user.id);
    res.status(200).send(
        result ? success("deleted successfully") : fail("Something went wrong"),
    );
};
