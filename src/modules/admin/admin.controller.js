const Admin = require("./admin.model");
const jwt = require("jsonwebtoken");
const registerSchema = require('../register.schema')


const checkIfAdminExists = async (email) => {
    try {
        const existingAdmin = await Admin.findOne({
            where: {
                email: email,
            },
        });
        return existingAdmin;
    } catch (error) {
        console.log(error);
        return null
    }
};
const login = async (req, res) => {
    const { email, password } = req.body
    const promise = Admin.findOne({
        where: {
            email: email,
            password: password
        }
    })
    function success(user) {
        if (user) {
            //create a token and send it
            const access_token = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                },
                "jwt-secret",
                {
                    expiresIn: "1h",
                    issuer: user.id.toString(),
                }
            );

            res.cookie("access_token", access_token, {
                httpOnly: true,
                signed: true,
            });

            res.status(200).json({
                message: "Login to admin dashboard successful !",
                user: user
            });
        } else {
            res.status(404).send("Invalid credentials !");
        }
    }

    function error(err) {
        console.log(err);
        res.status(500).send("Internal server error.");
    }

    promise.then(success).catch(error);
}


const register = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body
    const admin = { firstName, lastName, email, password, confirmPassword }
    /**
        1. valid email
           a. string
           b. @ sign
           c. .com string
        2. password
           a. string
           b. at least one capital letter, one small letter, one number, one special char. 
     */
    try {
        await registerSchema.validate({ email, password, confirmPassword }, { abortEarly: false });
        const existingAdmin = await checkIfAdminExists(admin.email)
        if (!existingAdmin) {
            try {
                const registerAdmin = await Admin.create(admin)
                res.status(201).json({
                    message: "Admin registration successful ! Please check email for active account.",
                    data: registerAdmin.dataValues
                });
            } catch (error) {
                console.log(error);
                res.status(500).json({ err: 'Internal server error' })
            }
        } else {
            res.send({ error: "An account already exists with this email." });
        }
    } catch (error) {
        const errors = [];

        error.inner.forEach((e) => {
            errors.push({ path: e.path, message: e.message })
        });

        res.status(400).json({ err: errors })
    }

    /* 
    const promise = registerSchema.validate({ email, password, confirmPassword }, { abortEarly: false });

    promise.then(async () => {
        //check email exist or not
        const existingAdmin = await checkIfAdminExists(admin.email)
        if (!existingAdmin) {
            try {
                const registerAdmin = await Admin.create(admin)
                res.status(201).json({
                    message: "Admin registration successful ! Please check email for active account.",
                    data: registerAdmin.dataValues
                });
            } catch (error) {
                console.log(error);
                res.status(500).json({ err: 'Internal server error' })
            }
        } else {
            res.send({ error: "An account already exists with this email." });
        }
    }).catch((err) => {
        const errors = [];

        err.inner.forEach((e) => {
            errors.push({ path: e.path, message: e.message })
        });

        res.status(400).json({ err: errors })
    })

   */
}


const forgotPassword = async (req, res) => {
    const email = req.body.email;

    //check email exist or not
    const response = await checkIfAdminExists(email);
    try {
        if (response) {
            res.status(200).json({ message: `Password reset link sent to ${response.email}` });
        } else {
            res.status(404).json({ error: "Admin with this email not found" });
        }
    } catch (error) {
        console.log(error);
    }
};

const resetPassword = async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    //check email exist or not
    const response = await checkIfAdminExists(email);

    if (!response) {
        res.status(404).json({ error: "No admin account found with this email" });
    } else {
        if (password == confirmPassword) {
            try {
                await Admin.update(
                    {
                        password: password
                    },
                    {
                        where: { email }
                    }
                )
                res.status(200).json({
                    message: "Password updated successfully.",
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            res.status(400).json({ error: "Passwords didn't match" });
        }
    }
}

const getSignedInAdminProfile = async (req, res) => {
    const token = req.signedCookies["access_token"];
    if (!token) {
        return res.status(400).send("Bad request.");
    }
    const payload = jwt.verify(token, "jwt-secret");
    const { id, email } = payload

    if (id) {
        const promise = Admin.findOne({
            where: { id }
        })

        function success(user) {
            if (user) {
                res.status(200).json({
                    message: 'User Found',
                    user: user
                })
            } else {
                res.status(404).json({
                    message: 'User Not Found',
                })
            }
        }

        function error(err) {
            console.log(err);
            res.status(500).send("Internal server error.");
        }

        promise.then(success).catch(error)

    } else {
        res.status(500).send("Payload not found");
    }


}

const logout = (req, res) => {
    res.clearCookie("access_token");
    res.status(200).json({ message: "Logged out" });
};

module.exports.login = login;
module.exports.register = register;
module.exports.forgotPassword = forgotPassword;
module.exports.resetPassword = resetPassword;
module.exports.getSignedInAdminProfile = getSignedInAdminProfile
module.exports.logout = logout


