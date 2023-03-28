const userModal = require("../modals/user.modal");
const bcrypt = require("bcrypt");
const generateToken = require("../generateToken");

// register user 👍👍👍👍👍

const createUser = async (req, res) => {
    try {
        const { name, email, password, mobile, avator, role } = req.body;

        // userExits

        const userExits = await userModal.findOne({ email })

        if (userExits) {
            return res.status(400).send({ msg: `This email : ${email} already exits, try with different email or login` })
        }

        const gensalt = 5;
        const salt = bcrypt.genSaltSync(gensalt);
        const hashPassword = bcrypt.hashSync(password, salt)

        const user = new userModal({
            name,
            email,
            password: hashPassword,
            mobile,
            avator,
            role
        });
        await user.save();
        res.status(201).json({ "message": "Register successful" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// login user 👍👍👍👍👍

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: "email and password required" })
    }
    const user = await userModal.findOne({ email });

    if (!user) {
        return res.status(404).send({ message: `This email : ${email} is not found in our database` })
    }

    //   res.send(user)

    const passWordMatch = bcrypt.compareSync(password, user.password)
    if (!passWordMatch) {
        res.status(400).send({ message: `Wrong password` })
    }
    else {
        try {
            // res.send(passWordMatch)
            const token = generateToken(user);

            res.cookie("myToken", token, {
                // for one day expiration
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            })

            res.status(200).send({
                messssage: "Login Successful",
                token: token,
                role: user.role,
                name: user.name
            })

        } catch (error) {
            res.status(500).send({ message: "Internel server error", error: `${error}` })
        }
    }
}


// get all users (superAdmin) 👍👍👍👍👍

const getAllUsers = async (req, res) => {
    try {
        const { userId } = req.body;
        // $ne will neglect who is making request and others users will give
        const users = await userModal.find({ _id: { $ne: userId } });

        if (users.length === 0) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({ err: error.message });
    }
};

// get all users (superAdmin) 👍👍👍👍👍
const addUser = async (req, res) => {
    try {
        const { email, password} = req.body;

        // userExits

        const userExits = await userModal.findOne({ email })

        if (userExits) {
            return res.status(400).send({ msg: `This email : ${email} already exits, try with different email or login` })
        }

        const gensalt = 5;
        const salt = bcrypt.genSaltSync(gensalt);
        const hashPassword = bcrypt.hashSync(password, salt)

        const user = new userModal({
            ...req.body,
            email,
            password: hashPassword,
        });
        await user.save();
        res.status(201).json({ "message": "Register successful" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
// change role   



module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    addUser

}