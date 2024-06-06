import ForgotPassword from "../page/forgotPassword";
import ForgotSuccess from "../page/forgotPassword/ForgotSuccess";
import VerifyEmail from "../page/forgotPassword/VerifyEmail";
import Home from "../page/home";
import Login from "../page/login";
import Register from '../page/register';
import RegisterRules from "../page/register/RegisterRules";
import RegisterStep2 from "../page/register/RegisterStep2";
import RegisterStep3 from "../page/register/RegisterStep3";
import RegisterStep4 from "../page/register/RegisterStep4";
import RegisterSuccess from "../page/register/RegisterSuccess";

export const SCREENS_NAME = {
    LOGIN: {
        MAIN: 'Main Login',
    },
    REGISTER: {
        STEP1: 'Register Step 1',
        STEP2: 'Register Step 2',
        STEP3: 'Register Step 3',
        STEP4: 'Register Step 4',
        RULES: 'Register Rules',
        SUCCESS: 'Register Success',
    },
    HOME: {
        MAIN: 'Main Home',
    },
    FORGOT_PASSWORD: {
        VERIFY_EMAIL: 'Verify ForgotPassword',
        MAIN: 'Main ForgotPassword',
        SUCCESS: 'Forgot Password Success',
    },
}

const SCREENS_STACK_LOGIN = [
    {
        // Màn 1 của login, sau thêm màn sửa
        name: SCREENS_NAME.LOGIN.MAIN,
        component: Login,
    },
];
const SCREENS_STACK_HOME = [
    {
        name: SCREENS_NAME.HOME.MAIN,
        component: Home,
    },
];
const SCREENS_STACK_REGISTER = [
    {
        name: SCREENS_NAME.REGISTER.STEP1,
        component: Register,
    },
    {
        name: SCREENS_NAME.REGISTER.STEP2,
        component: RegisterStep2,
    },
    {
        name: SCREENS_NAME.REGISTER.STEP3,
        component: RegisterStep3,
    },
    {
        name: SCREENS_NAME.REGISTER.STEP4,
        component: RegisterStep4,
    },
    {
        name: SCREENS_NAME.REGISTER.RULES,
        component: RegisterRules,
    },
    {
        name: SCREENS_NAME.REGISTER.SUCCESS,
        component: RegisterSuccess,
    },
];
const SCREENS_STACK_FORGOT_PASSWORD = [
    {
        name: SCREENS_NAME.FORGOT_PASSWORD.VERIFY_EMAIL,
        component: VerifyEmail,
    },
    {
        name: SCREENS_NAME.FORGOT_PASSWORD.MAIN,
        component: ForgotPassword,
    },
    {
        name: SCREENS_NAME.FORGOT_PASSWORD.SUCCESS,
        component: ForgotSuccess,
    },
];

const SCREENS_STACK = [
    ...SCREENS_STACK_HOME,
    ...SCREENS_STACK_LOGIN,
    ...SCREENS_STACK_REGISTER,
    ...SCREENS_STACK_FORGOT_PASSWORD,

];
export { SCREENS_STACK };
