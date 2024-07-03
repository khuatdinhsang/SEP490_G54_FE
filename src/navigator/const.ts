import ForgotPassword from '../page/forgotPassword';
import ForgotSuccess from '../page/forgotPassword/ForgotSuccess';
import VerifyEmail from '../page/forgotPassword/VerifyEmail';
import Home from '../page/home';
import Login from '../page/login';
import PlanManagement from '../page/planManagement';
import AddMedication from '../page/planManagement/AddMedication';
import FoodIntake from '../page/planManagement/FoodIntake';
import ListRegisterMedication from '../page/planManagement/ListRegisterMedication';
import NumberSteps from '../page/planManagement/NumberSteps';
import PlanSuccess from '../page/planManagement/PlanSuccess';
import PositiveMind from '../page/planManagement/PositiveMind';
import RegisterMedication from '../page/planManagement/RegisterMedication';
import WorkOut from '../page/planManagement/WorkOut';
import Profile from '../page/profile';
import ProfileMakeHospitalSchedule from '../page/profile/ProfileMakeHospitalSchedule';
import ProfileNewHospitalSchedule from '../page/profile/ProfileNewHospitalSchedule';
import Question from '../page/question';
import AddQuestion from '../page/question/AddQuestion';
import QuestionDetail from '../page/question/QuestionDetail';
import RegularQuestion from '../page/question/RegularQuestion';
import RecordHealthData from '../page/recordHealthData';
import FillRecord from '../page/recordHealthData/pages/HBA1C/FillRecord';
import NumericalRecord from '../page/recordHealthData/pages/HBA1C/NumericalRecord';
import Register from '../page/register';
import RegisterRules from '../page/register/RegisterRules';
import RegisterStep2 from '../page/register/RegisterStep2';
import RegisterStep3 from '../page/register/RegisterStep3';
import RegisterStep4 from '../page/register/RegisterStep4';
import RegisterSuccess from '../page/register/RegisterSuccess';
import Setting from '../page/setting';
import SettingChangePassword from '../page/setting/SettingChangePasswd';
import SettingLogout from '../page/setting/SettingLogout';
import SettingNotification from '../page/setting/SettingNotification';
import BloodPressure from '../page/recordHealthData/pages/BloodPressure';
import NumericalRecordChart from '../page/recordHealthData/pages/HBA1C/NumericalRecordChart';
import BloodPressureChart from '../page/recordHealthData/pages/BloodPressure/Chart';
import Weight from '../page/recordHealthData/pages/Weight';
import WeightChart from '../page/recordHealthData/pages/Weight/Chart';
import PositiveMindRecord from '../page/recordHealthData/pages/PositiveMind';
import PositiveMindChart from '../page/recordHealthData/pages/PositiveMind/Chart';
import WorkOutRecord from '../page/recordHealthData/pages/WorkOut';
import WorkOutChart from '../page/recordHealthData/pages/WorkOut/Chart';
import MedicationRecord from '../page/recordHealthData/pages/Medication';
import MedicationChart from '../page/recordHealthData/pages/Medication/Chart';
import NumberStepsChart from '../page/recordHealthData/pages/NumberSteps/Chart';
import FoodIntakeRecord from '../page/recordHealthData/pages/FoodIntake';
import FoodInTakeChart from '../page/recordHealthData/pages/FoodIntake/Chart';
import WeeklyEvaluate from '../page/evaluate/WeeklyEvaluate';
import WeeklyEvaluateDetail from '../page/evaluate/WeeklyEvaluateDetail';
import MonthlyEvaluate from '../page/evaluate/MonthlyEvaluate';
import SAT_SF_C from '../page/evaluate/SAT_SF_C';
import SAT_SF_I from '../page/evaluate/SAT_SF_I';
import SAT_SF_P from '../page/evaluate/SAT_SF_P';
import BEHAVIORAL from '../page/evaluate/BEHAVIORAL';
import SuccessSurvey from '../page/evaluate/SuccessSurvey';
import MainWeight from '../page/recordHealthData/pages/Weight/main';
import MainWorkOut from '../page/recordHealthData/pages/WorkOut/main';
import MainPositiveMind from '../page/recordHealthData/pages/PositiveMind/main';
import MainFoodIntake from '../page/recordHealthData/pages/FoodIntake/main';
import MainMedication from '../page/recordHealthData/pages/Medication/main';

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
    SETTING: {
        MAIN: 'Main Setting',
        SETTING_NOTIFICATION: 'Setting Notification',
        SETTING_LOGOUT: 'Setting Logout',
        CHANGE_PASSWORD: 'Change Password',
    },
    PROFILE: {
        MAIN: 'Main Profile',
        MAKE_HOSPITAL_SCHEDULE: 'Make Hospital Schedule',
        NEW_HOSPITAL_SCHEDULE: 'New Hospital Schedule',
    },
    FORGOT_PASSWORD: {
        VERIFY_EMAIL: 'Verify ForgotPassword',
        MAIN: 'Main ForgotPassword',
        SUCCESS: 'Forgot Password Success',
    },
    PLAN_MANAGEMENT: {
        MAIN: 'Main Plan Management',
        POSITIVE_MIND: 'Positive Mind',
        WORK_OUT: 'Work Out',
        FOOD_INTAKE: 'Food Intake',
        REGISTER_MEDICATION: 'Register Medication',
        ADD_MEDICATION: 'Add Medication',
        LIST_REGISTER_MEDICATION: 'List Register Medication',
        NUMBER_STEPS: 'Number Steps',
        SUCCESS: 'Plan Success',
    },
    QUESTION: {
        MAIN: 'Main Question',
        ADD: 'Add Question',
        DETAIL: 'Detail Question',
        REGULAR: 'Regular Question',
    },
    RECORD_HEALTH_DATA: {
        MAIN: 'Main Record Health',
        NUMERICAL_RECORD: 'Numerical Record',
        FILL_RECORD: 'Fill Record',
        NUMERICAL_RECORD_CHART: 'Number Record Chart',
        BLOOD_PRESSURE: 'Blood Pressure',
        BLOOD_PRESSURE_CHART: 'Blood Pressure Chart',
        MAIN_WEIGHT: 'Main Weight',
        WEIGHT: 'Weight',
        WEIGHT_CHART: 'Weight Chart',
        MAIN_POSITIVE_MIND: 'Main Positive Mind',
        POSITIVE_MIND_RECORD: 'Positive Mind Record',
        POSITIVE_MIND_CHART: 'Positive Mind Chart',
        MAIN_WORK_OUT: 'Main Work Out',
        WORK_OUT_RECORD: 'Work Out Record',
        WORD_OUT_CHART: 'Word Out Chart',
        MAIN_MEDICATION: 'Main Medication',
        MEDICATION_RECORD: 'Medication Record',
        MEDICATION_CHART: 'Medication Chart',
        NUMBER_STEPS_CHART: 'Number Steps Chart',
        MAIN_FOOD_INTAKE: 'Main Food Intake',
        FOOD_INTAKE_RECORD: 'Food Injection Record',
        FOOD_INTAKE_CHART: 'Food Injection Chart',
    },
    EVALUATE: {
        WEEKLY: 'Evaluate Week',
        DETAIL_WEEKLY: 'Evaluate Detail Week',
        MONTHLY: 'Evaluate Month',
        SAT_SF_C: 'Survey SAT_SF_C',
        SAT_SF_P: 'Survey SAT_SF_P',
        SAT_SF_I: 'Survey SAT_SF_I',
        BEHAVIORAL_MODEL: 'Behavioral Model',
        SUCCESS_SURVEY: 'Success Survey'
    }
};

const SCREENS_STACK_LOGIN = [
    {
        // Màn 1 của login, sau thêm màn sửa
        name: SCREENS_NAME.LOGIN.MAIN,
        component: Login,
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
const SCREENS_STACK_HOME = [
    {
        name: SCREENS_NAME.HOME.MAIN,
        component: Home,
    },
];
const SCREENS_STACK_SETTING = [
    {
        name: SCREENS_NAME.SETTING.MAIN,
        component: Setting,
    },
    {
        name: SCREENS_NAME.SETTING.SETTING_NOTIFICATION,
        component: SettingNotification,
    },
    {
        name: SCREENS_NAME.SETTING.SETTING_LOGOUT,
        component: SettingLogout,
    },
    {
        name: SCREENS_NAME.SETTING.CHANGE_PASSWORD,
        component: SettingChangePassword,
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
const SCREENS_STACK_PLAN_MANAGEMENT = [
    {
        name: SCREENS_NAME.PLAN_MANAGEMENT.MAIN,
        component: PlanManagement,
    },
    {
        name: SCREENS_NAME.PLAN_MANAGEMENT.POSITIVE_MIND,
        component: PositiveMind,
    },
    {
        name: SCREENS_NAME.PLAN_MANAGEMENT.WORK_OUT,
        component: WorkOut,
    },
    {
        name: SCREENS_NAME.PLAN_MANAGEMENT.FOOD_INTAKE,
        component: FoodIntake,
    },
    {
        name: SCREENS_NAME.PLAN_MANAGEMENT.REGISTER_MEDICATION,
        component: RegisterMedication,
    },
    {
        name: SCREENS_NAME.PLAN_MANAGEMENT.ADD_MEDICATION,
        component: AddMedication,
    },
    {
        name: SCREENS_NAME.PLAN_MANAGEMENT.LIST_REGISTER_MEDICATION,
        component: ListRegisterMedication,
    },
    {
        name: SCREENS_NAME.PLAN_MANAGEMENT.NUMBER_STEPS,
        component: NumberSteps,
    },
    {
        name: SCREENS_NAME.PLAN_MANAGEMENT.SUCCESS,
        component: PlanSuccess,
    },
];
const SCREENS_STACK_PROFILE = [
    {
        name: SCREENS_NAME.PROFILE.MAIN,
        component: Profile,
    },
    {
        name: SCREENS_NAME.PROFILE.MAKE_HOSPITAL_SCHEDULE,
        component: ProfileMakeHospitalSchedule,
    },
    {
        name: SCREENS_NAME.PROFILE.NEW_HOSPITAL_SCHEDULE,
        component: ProfileNewHospitalSchedule,
    },
];
const SCREENS_STACK_QUESTION = [
    {
        name: SCREENS_NAME.QUESTION.MAIN,
        component: Question,
    },
    {
        name: SCREENS_NAME.QUESTION.ADD,
        component: AddQuestion,
    },
    {
        name: SCREENS_NAME.QUESTION.DETAIL,
        component: QuestionDetail,
    },
    {
        name: SCREENS_NAME.QUESTION.REGULAR,
        component: RegularQuestion,
    },
];
const SCREENS_STACK_RECORD_DATA = [
    {
        name: SCREENS_NAME.RECORD_HEALTH_DATA.MAIN,
        component: RecordHealthData,
    },
    {
        name: SCREENS_NAME.RECORD_HEALTH_DATA.NUMERICAL_RECORD,
        component: NumericalRecord,
    },
    {
        name: SCREENS_NAME.RECORD_HEALTH_DATA.FILL_RECORD,
        component: FillRecord,
    },
    {
        name: SCREENS_NAME.RECORD_HEALTH_DATA.NUMERICAL_RECORD_CHART,
        component: NumericalRecordChart,
    },
    {
        name: SCREENS_NAME.RECORD_HEALTH_DATA.BLOOD_PRESSURE,
        component: BloodPressure,
    },
    {
        name: SCREENS_NAME.RECORD_HEALTH_DATA.BLOOD_PRESSURE_CHART,
        component: BloodPressureChart,
    },
    {
        name: SCREENS_NAME.RECORD_HEALTH_DATA.MAIN_WEIGHT,
        component: MainWeight,
    },
    {
        name: SCREENS_NAME.RECORD_HEALTH_DATA.WEIGHT,
        component: Weight,
    },
    {
        name: SCREENS_NAME.RECORD_HEALTH_DATA.WEIGHT_CHART,
        component: WeightChart,
    },
    {
        name: SCREENS_NAME.RECORD_HEALTH_DATA.MAIN_POSITIVE_MIND,
        component: MainPositiveMind,
    },
    {
        name: SCREENS_NAME.RECORD_HEALTH_DATA.POSITIVE_MIND_RECORD,
        component: PositiveMindRecord,
    },
    {
        name: SCREENS_NAME.RECORD_HEALTH_DATA.POSITIVE_MIND_CHART,
        component: PositiveMindChart,
    },
    {
        name: SCREENS_NAME.RECORD_HEALTH_DATA.MAIN_WORK_OUT,
        component: MainWorkOut,
    },
    {
        name: SCREENS_NAME.RECORD_HEALTH_DATA.WORK_OUT_RECORD,
        component: WorkOutRecord,
    },
    {
        name: SCREENS_NAME.RECORD_HEALTH_DATA.WORD_OUT_CHART,
        component: WorkOutChart,
    },
    {
        name: SCREENS_NAME.RECORD_HEALTH_DATA.MAIN_MEDICATION,
        component: MainMedication,
    },
    {
        name: SCREENS_NAME.RECORD_HEALTH_DATA.MEDICATION_RECORD,
        component: MedicationRecord,
    },
    {
        name: SCREENS_NAME.RECORD_HEALTH_DATA.MEDICATION_CHART,
        component: MedicationChart,
    },
    {
        name: SCREENS_NAME.RECORD_HEALTH_DATA.NUMBER_STEPS_CHART,
        component: NumberStepsChart,
    },
    {
        name: SCREENS_NAME.RECORD_HEALTH_DATA.MAIN_FOOD_INTAKE,
        component: MainFoodIntake,
    },
    {
        name: SCREENS_NAME.RECORD_HEALTH_DATA.FOOD_INTAKE_RECORD,
        component: FoodIntakeRecord,
    },
    {
        name: SCREENS_NAME.RECORD_HEALTH_DATA.FOOD_INTAKE_CHART,
        component: FoodInTakeChart,
    },
];

const SCREENS_STACK_EVALUATE = [
    {
        name: SCREENS_NAME.EVALUATE.WEEKLY,
        component: WeeklyEvaluate,
    },
    {
        name: SCREENS_NAME.EVALUATE.DETAIL_WEEKLY,
        component: WeeklyEvaluateDetail,
    },
    {
        name: SCREENS_NAME.EVALUATE.MONTHLY,
        component: MonthlyEvaluate,
    },
    {
        name: SCREENS_NAME.EVALUATE.SAT_SF_C,
        component: SAT_SF_C,
    },
    {
        name: SCREENS_NAME.EVALUATE.SAT_SF_I,
        component: SAT_SF_I,
    },
    {
        name: SCREENS_NAME.EVALUATE.SAT_SF_P,
        component: SAT_SF_P,
    },
    {
        name: SCREENS_NAME.EVALUATE.BEHAVIORAL_MODEL,
        component: BEHAVIORAL,
    },
    {
        name: SCREENS_NAME.EVALUATE.SUCCESS_SURVEY,
        component: SuccessSurvey,
    },
]


const SCREENS_STACK = [
    ...SCREENS_STACK_SETTING,
    ...SCREENS_STACK_LOGIN,
    ...SCREENS_STACK_HOME,
    ...SCREENS_STACK_REGISTER,
    ...SCREENS_STACK_FORGOT_PASSWORD,
    ...SCREENS_STACK_PLAN_MANAGEMENT,
    ...SCREENS_STACK_PROFILE,
    ...SCREENS_STACK_QUESTION,
    ...SCREENS_STACK_RECORD_DATA,
    ...SCREENS_STACK_EVALUATE
];
export { SCREENS_STACK };
