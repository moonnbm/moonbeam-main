import type {NativeStackScreenProps} from '@react-navigation/native-stack';

/**
 * The default list of params, to be used across all props.
 */
export type RootStackParamList = {
    SignIn: {
        onLayoutRootView?: () => Promise<void>;
    },
    SignUp: {
        initialRender: boolean;
    },
    EmailVerify: {
        username: string;
    },
    ForgotPassword: {
        initialRender: boolean;
    }
};

// the SignIn component props
export type SignInProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>
// the SignUp component props
export type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>
// the EmailVerify component props
export type EmailVerifyProps = NativeStackScreenProps<RootStackParamList, 'EmailVerify'>
// the ForgotPassword component props
export type ForgotPasswordProps = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>
