import {Image, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {HomeTabProps} from '../models/BottomBarProps';
import {styles} from "../styles/home.module";
// @ts-ignore
import DashboardTopViewRight from '../../assets/dashboard-top-view-right.png';

/**
 * Home component.
 */
export const Home = ({navigation, route}: HomeTabProps) => {
    // state driven key-value pairs for UI related elements

    // state driven key-value pairs for forgot password form values

    return <KeyboardAwareScrollView
        contentContainerStyle={styles.topContainer}>
        <View style={styles.topBarView}>
            <View style={styles.dashboardTopViewRight}>
                <Image source={DashboardTopViewRight} style={styles.dashboardTopViewRightImage}/>
            </View>
        </View>
    </KeyboardAwareScrollView>;
}
