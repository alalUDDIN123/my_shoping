const userModal = require("../modals/user.modal");
const bcrypt=require("bcrypt")
// register user 👍

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
        res.status(201).json({ "message":"Register successful" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports={
    createUser
}