
const isValidEmail = (email) => {
    // Regular expression to validate email format and domain
    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|mil|info|biz)$/i;
    return emailRegex.test(email);
}


const validateUserFields = (req, res, next) => {
    const { name, email, password, mobile, role } = req.body;

    // Validate name field
    if (!name) {
        return res.status(400).json({ error: "Please provide name" });
    }

    // Validate email field
    if (!email) {
        return res.status(400).json({ error: "Please provide email" });
    } else if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Please provide a valid email address" });
    }

    // Validate password field
    if (!password) {
        return res.status(400).json({ error: "Please provide password" });
    }
    if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters long" });
    }
    if (!/[A-Z]/.test(password)) {
        return res.status(400).json({ error: "Password must contain at least one uppercase letter" });
    }
    if (!/[a-z]/.test(password)) {
        return res.status(400).json({ error: "Password must contain at least one lowercase letter" });
    }
    if (!/\d/.test(password)) {
        return res.status(400).json({ error: "Password must contain at least one digit" });
    }
    if (!/[@#%&^()/?!]/.test(password)) {
        return res.status(400).json({ error: "Password must contain at least one special character (@,#,%,&,^,(,),/?) " });
    }



    // Validate mobile field

    // console.log(mobile.toString().length)
    if (!mobile) {
        return res.status(400).json({ error: "Please provide mobile number" });
    } else if (typeof mobile !== 'number') {
        return res.status(400).json({ error: "Mobile number must be a number" });
    } else if (mobile.toString().length < 10 || mobile.toString().length > 10) {
        return res.status(400).json({ error: "Mobile number cannot less 10 digits or greater then 10 digits" });
    }

    // Validate role field
    if (role && !["user", "admin", "superAdmin"].includes(role)) {
        return res.status(400).json({ error: "Invalid role, please provide user, admin, or superAdmin" });
    }

    next(); // Call the next middleware function
}

module.exports = validateUserFields
