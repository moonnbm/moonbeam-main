import type {NativeStackScreenProps} from '@react-navigation/native-stack';

/**
 * The default list of params, to be used across all bottom bar stack props.
 */
export type BottomBarStackParamList = {
    Home: {

    },
    Membership: {

    }
    Account: {

    }
};

// the Home component props, within the bottom bar stack
export type HomeTabProps = NativeStackScreenProps<BottomBarStackParamList, 'Home'>

