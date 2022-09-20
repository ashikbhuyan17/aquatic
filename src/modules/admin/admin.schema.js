const { string, ref, object } = require('yup')

const registerSchema = object().shape({
    email: string()
        .max(100, 'This is field must be at most 100 characters long.')
        .required('This field must not be empty'),

    password: string()
        .min(8, 'This is field must be at most 8 characters long.')
        .max(50, 'This is field must be at most 50 characters long.')
        .required('This field must not be empty'),
    confirmPassword: string()
        .oneOf([ref('password'), null], 'Password must be match')
        .required('This field must not be empty')
}
)

const loginSchema = object().shape({
    email: string()
        .max(100, 'This is field must be at most 100 characters long.')
        .required('This field must not be empty'),

    password: string()
        .min(8, 'This is field must be at most 8 characters long.')
        .max(50, 'This is field must be at most 50 characters long.')
        .required('This field must not be empty')
}
)

module.exports.registerSchema = registerSchema
module.exports.loginSchema = loginSchema
