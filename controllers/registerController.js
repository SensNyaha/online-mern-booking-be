import User from "../models/userModel.js";

async function registerUser(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res
            .status(400)
            .json({ status: 400, message: "Fullfill all the fields" });
    }

    if (await User.findOne({ email }))
        return res.status(400).json({
            status: 400,
            message: "User with the same email already exists",
        });

    try {
        const newUser = new User({ name, email, password });

        const addedUser = await newUser.save();
        res.json(addedUser);
    } catch (e) {
        return res.status(500).json({
            status: 500,
            message: e.message,
        });
    }
}

export default registerUser;
