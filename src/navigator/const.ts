import Home from "../page/home";
import Login from "../page/login";


export const SCREENS_NAME = {
    LOGIN: {
        MAIN: 'Main Login',
    },
    HOME: {
        MAIN: 'Main Home',
    }
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

const SCREENS_STACK = [
    ...SCREENS_STACK_HOME,
    ...SCREENS_STACK_LOGIN

];
export { SCREENS_STACK };
