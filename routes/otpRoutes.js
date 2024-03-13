const otpController = require('../controllers/otpController');
import otpController from '../controllers/otpController';
const router = express.Router();

router.post('/send-otp', otpController);

export default router;