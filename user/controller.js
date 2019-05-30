import Users from "./model";

export const list = async (req, res) => {
    const users = await Users.find();
    res.json(users);
};

export const create = async (req, res) => {
    const user = await Users.create(req.body);
    res.json(user);
};