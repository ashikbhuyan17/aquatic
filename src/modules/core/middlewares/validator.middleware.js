function validate(schema) {
    console.log('..............................')
    return async function (req, res, next) {
        try {
            await schema.validate(
                req.body,
                { abortEarly: false }
            );
            next();
        } catch (error) {
            const errors = [];
            error.inner.forEach((e) => {
                errors.push({ path: e.path, message: e.message })
            });

            res.status(400).json({ err: errors })
        }
    }
}

module.exports = validate