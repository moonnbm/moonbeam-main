import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
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
        backgroundColor: 'gray'
    },
    textInputFocus: {
        marginTop: 50,
        width: 350,
        backgroundColor: 'gray'
    },
    loginTitle: {
        marginTop: '10%',
        fontFamily: 'Raleway-Medium',
        fontSize: 60,
        color: '#F2FF5D',
    },
    loginSubtitle: {
        fontFamily: 'Raleway-Regular',
        fontSize: 30,
        color: 'white'
    },
    loginFooter: {
        fontFamily: 'Raleway-Regular',
        fontSize: 20,
        color: 'white'
    },
    loginFooterButton: {
        fontFamily: 'Raleway-Regular',
        fontSize: 20,
        color: '#F2FF5D',
    },
    loginFooterButtonPressed: {
        fontFamily: 'Raleway-Regular',
        fontSize: 20,
        color: '#F2FF5D',
        backgroundColor: '#313030'
    },
    signInFooterButon: {
        height: 40,
        width: '40%',
        position: 'relative',
        marginTop: '10%'
    }
});

export default styles;
