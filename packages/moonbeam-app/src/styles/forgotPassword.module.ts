import {StyleSheet} from "react-native";

// styles to be used within the ForgotPassword component
export const styles = StyleSheet.create({
    initialNextBtnStyle: {
        paddingRight: 90
    },
    btnStyleText: {
        color: '#2A3779',
        fontFamily: 'Raleway-Medium',
        fontSize: 20
    },
    usernameProgressTitle: {
        marginLeft: '22%',
        marginTop: '5%',
        fontFamily: 'Raleway-Regular',
        fontSize: 25,
        color: '#2A3779',
    },
    codeVerificationProgressTitle: {
        marginLeft: '22%',
        marginTop: '5%',
        fontFamily: 'Raleway-Regular',
        fontSize: 25,
        color: '#2A3779',
    },
    errorMessageMain: {
        alignSelf: 'center',
        fontFamily: 'Raleway-Bold',
        fontSize: 12,
        color: 'red'
    },
    initialTextInput: {
        marginTop: 10,
        width: 350,
        backgroundColor: '#f2f2f2',
        shadowColor: '#313030',
        shadowOffset: {width: -2, height: 5},
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8
    },
    initialTextInputFocus: {
        marginTop: 10,
        width: 350,
        backgroundColor: '#f2f2f2',
        shadowColor: '#313030',
        shadowOffset: {width: -2, height: 5},
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8
    },
    errorMessage: {
        width: 350,
        marginTop: 5,
        fontFamily: 'Raleway-Bold',
        fontSize: 12,
        color: 'red'
    },
    nextBtnStyle: {},
    prevBtnStyle: {},
    lastPrevBtnStyle: {
        paddingLeft: 90
    },
    forgotPasswordTitle: {
        fontFamily: 'Raleway-Medium',
        fontSize: 49,
        color: 'black',
    },
    forgotPasswordSubtitle: {
        marginTop: '1%',
        fontFamily: 'Raleway-Medium',
        fontSize: 22,
        color: '#A2B000',
        width: 300
    },
    bottomView: {
        marginBottom: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    forgotPasswordLogo: {
        height: 90,
        width: 200
    },
    forgotPasswordFooter: {
        fontFamily: 'Raleway-Medium',
        fontSize: 20,
        color: '#313030',
        textAlign: 'center',
        width: 380
    },
    forgotPasswordFooterButton: {
        fontFamily: 'Raleway-Bold',
        fontSize: 20,
        color: '#2A3779',
        textAlign: 'center'
    },
    resetPasswordButton: {
        marginBottom: '8%',
        borderRadius: 25,
        borderColor: '#313030',
        height: 50,
        width: 350
    },
    textInput: {
        marginTop: 30,
        width: 350,
        backgroundColor: '#f2f2f2',
        shadowColor: '#313030',
        shadowOffset: {width: -2, height: 5},
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8
    },
    textInputFocus: {
        marginTop: 30,
        width: 350,
        backgroundColor: '#f2f2f2',
        shadowColor: '#313030',
        shadowOffset: {width: -2, height: 5},
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8
    },
    modelTitle: {
        marginBottom: '5%',
        fontFamily: 'Raleway-Medium',
        fontSize: 55,
        width: 350,
        color: '#313030',
    },
    modalParagraph: {
        textAlign: 'center',
        alignSelf: 'flex-start',
        fontFamily: 'Raleway-Regular',
        fontSize: 16,
        width: 350,
        color: '#313030'
    },
    modalContainer: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: 400,
        borderRadius: 15,
        padding: 20,
        borderWidth: 1,
    },
    modalButton: {
        borderRadius: 25,
        height: 40,
        width: 350,
        marginTop: '10%'
    },
});
