const User = require('./user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = [
    {
        email: "ashik@gmail.com",
        password: "ashik"
    }
]

function getUser(req, res) {
    // res.send(users)
    User.findAll()
        .then(users => {
            res.send(users)
        })
        .catch(err => console.log(err))
}

exports.createUser = (req, res) => {
    User.findOne({
        where: { email: req.body.email }
    })
        .then((user) => {
            if (user) {
                return res.status(400).json({ message: 'user already exists' });
            }
            const userInfo = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                fullName: req.body.fullName,
                email: req.body.email,
                password: req.body.password
            }
            User.create(userInfo)
                .then((data) => {
                    // console.log(data);
                    return res.status(201).json({ user: data })
                })
                .catch((err) => {
                    console.log(err);
                    return res.status(400).json({ message: err })

                })

        })
        .catch((err) => {
            return res.status(400).json({ message: "User Already Exist" })

        })



}


exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        // Check to see if user is in db
        if (!user) {
            res.status(403).send({
                error: 'the login information was incorrect / Not Found'
            })
        }
        // Check to see if password is valid
        const isPasswordValid = await user.comparePassword(req.body.password)
        if (!isPasswordValid) {
            return res.status(403).send({
                error: 'The login information was incorrect'
            })
        }

        const token = jwt.sign({ email: user.email, role: user.role }, 'secret')
        const { firstName, lastName, email, role, fullName } = user
        return res.status(200).json({
            token,
            user: {
                firstName, lastName, email, role, fullName
            }
        });
    } catch (e) {
        res.status(500).send({ error: 'An error occured attempting to login' })
        console.log(e)
    }
}



/* working
 module.exports.createUser = (req, res) => {
    console.log(req.body);
    users.push(req.body)
    res.send(users)
}
 */



module.exports.updateUser = (req, res) => {
    const user = users.find((data) => data.email == req.params.email)
    console.log(user);
    user.email = "jamal@gmail.com"
    user.password = "jamal"
    res.send(user)

}

module.exports.getUser = getUser
// module.exports.createUser = createUser


/**
    module={
        __filename:f(){},
        exports:{} bt we passed new object
        exports:{
            getUser:getUser,
            createUser:createUser
        }
    }
 */