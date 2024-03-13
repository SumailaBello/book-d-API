//importing the auth strategy from passport
import '../config/passport.js';

const errorMsg = 'Invalid Credential'

//404 CONTROLLER
export const notFoundHandler = async (req, res) => {
    return res.status(404).send({
        success: false,
        message: 'Route cannot be found',
    })
}
