import {Router} from 'express';
import {createAuth, getAuth, setAuth} from "../controls/auth.control";

const router = Router();

router.route('/status').get(getAuth);
router.route('/signIn').post(setAuth);
router.route('/signUp').post(createAuth);

export default router;