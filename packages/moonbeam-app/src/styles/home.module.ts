import {StyleSheet} from "react-native";

// styles to be used within the Dashboard component
export const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignContent: 'center',
        backgroundColor: '#f2f2f2',
    },
    topBarView: {
        flex: 0.50,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
        shadowColor: '#313030',
        shadowOffset: {width: -2, height: 15},
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 15,
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60
    },
    dashboardTopViewRight: {
        flex: 1,
        alignSelf: 'flex-end',
    },
    dashboardTopViewRightImage: {
        flex: 0.9,
        resizeMode: 'contain'
    }
});
