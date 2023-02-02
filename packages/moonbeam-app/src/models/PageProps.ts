import type {NativeStackScreenProps} from '@react-navigation/native-stack';

/**
 * The default list of params, to be used across all props.
 */
export type RootStackParamList = {
    SignIn: {
        onLayoutRootView?: () => Promise<void>;
    },
    SignUp: {

    }
};

// the SignIn component props
export type SignInProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>
// the SignUp component props
export type SignUpProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>

