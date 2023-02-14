import type {NativeStackScreenProps} from '@react-navigation/native-stack';

/**
 * The default list of params, to be used across all bottom bar stack props.
 */
export type BottomBarStackParamList = {
    Home: {

    },
    Membership: {

    }
    Settings: {

    }
};

// the Home component props, within the bottom bar stack
export type HomeTabProps = NativeStackScreenProps<BottomBarStackParamList, 'Home'>
// the Membership component props, within the bottom bar stack
export type MemerbshipTabProps = NativeStackScreenProps<BottomBarStackParamList, 'Membership'>
