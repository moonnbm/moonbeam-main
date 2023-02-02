import {StyleSheet} from "react-native";

// styles to be used within the SignIn component
export const styles = StyleSheet.create({
    container: {
        marginTop: '5%',
        alignItems: 'center'
    },
    loginLogo: {
        height: 150,
        width: '50%'
    },
    textInput: {
        marginTop: 50,
        width: 350,
        backgroundColor: '#f2f2f2',
        shadowColor: '#313030',
        shadowOffset: {width: -2, height: 10},
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 15
    },
    textInputFocus: {
        marginTop: 50,
        width: 350,
        backgroundColor: '#f2',
        shadowColor: '#313030',
        shadowOffset: {width: -2, height: 10},
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 15
    },
    loginTitle: {
        marginRight: '43%',
        marginTop: '25%',
        fontFamily: 'Raleway-Medium',
        fontSize: 80,
        color: 'black',
    },
    loginSubtitle: {
        marginRight: '22%',
        fontFamily: 'Raleway-Medium',
        fontSize: 25,
        color: 'black'
    },
    loginFooter: {
        fontFamily: 'Raleway-Regular',
        fontSize: 20,
        color: '#313030'
    },
    forgotPasswordButton: {
        marginTop: '5%',
        marginLeft: '55%',
        fontFamily: 'Raleway-Bold',
        fontSize: 16,
        color: '#313030',
        textDecorationLine: 'underline'
    },
    loginFooterButton: {
        fontFamily: 'Raleway-Bold',
        fontSize: 20,
        color: '#2A3779',
    },
    signInFooterButton: {
        borderRadius: 25,
        borderColor: '#313030',
        height: 50,
        width: '50%',
        marginTop: '10%'
    }
});
