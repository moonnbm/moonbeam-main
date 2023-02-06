import React, {useEffect, useState} from "react";
import {EmailVerifyProps} from "../models/PageProps";
import {Image, ImageBackground, KeyboardAvoidingView, Platform, Text, View} from "react-native";
import { commonStyles } from "../styles/common.module";
import { styles } from "../styles/emailVerify.module";
// @ts-ignore
import CongratulationsSplash from '../../assets/congratulations.png';
import {Button, Modal, Portal, TextInput } from "react-native-paper";
import { Auth } from "aws-amplify";

/**
 * Sign In component.
 */
export const EmailVerify = ({navigation, route}: EmailVerifyProps) => {
    // state driven key-value pairs
    const [confirmationCodeFocus, setIsConfirmationCodeFocus] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [isErrorModal, setIsErrorModal] = useState<boolean>(false);

    /**
     * Entrypoint UseEffect will be used as a block of code where we perform specific tasks (such as
     * auth-related functionality for example), as well as any afferent API calls.
     *
     * Generally speaking, any functionality imperative prior to the full page-load should be
     * included in here.
     */
    useEffect(() => {
    }, []);

    /**
     * Function used to capture the confirmation button press
     *
     * @param code verification code inputted by the user
     */
    const onConfirmPressed = async (code: string) => {
        try {
            await Auth.confirmSignUp(route.params.username, code);
            setModalMessage("Thanks for confirming the code! Your email address is now verified!");
            setModalVisible(true);
            setIsErrorModal(false);
        } catch (error) {
            // @ts-ignore
            setModalMessage(error.message);
            setModalVisible(true);
            setIsErrorModal(true);
            console.log(`Error confirming sign up code :, ${error}`);
        }
    }

    /**
     * Function used to capture the confirmation button press
     */
    const onResendCodePressed = async () => {
        console.log("lala")
    }

    // return the component for the EmailVerification page
    return (
        <ImageBackground
            imageStyle={{
                resizeMode: 'stretch'
            }}
            style={commonStyles.image}
            source={require('../../assets/login-background.png')}>
            <Portal>
                <Modal dismissable={false} visible={modalVisible} onDismiss={() => setModalVisible(false)}
                       contentContainerStyle={[styles.modalContainer, isErrorModal ? {borderColor: 'red'} : {borderColor: 'green'}]}>
                    <Text style={styles.modalParagraph}>{modalMessage}</Text>
                    <Button
                        style={[styles.modalButton, isErrorModal ? {borderColor: 'red'} : {borderColor: 'green'}]}
                        {...!isErrorModal && {
                            textColor: 'green',
                            buttonColor: '#f2f2f2'
                        }}
                        {...isErrorModal && {
                            icon: 'redo-variant',
                            textColor: 'red',
                            buttonColor: '#f2f2f2'
                        }}
                        mode="outlined"
                        labelStyle={{fontSize: 15}}
                        onPress={() => {!isErrorModal ? navigation.navigate('SignIn', {}): setModalVisible(false)}}>
                        {isErrorModal ? `Try Again` : `Sign In`}
                    </Button>
                </Modal>
            </Portal>
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'height' : 'height'}
                keyboardVerticalOffset={Platform.OS == 'ios' ? -350 : -130}
                style={commonStyles.container}>
                <View style={styles.mainView}>
                    <View style={styles.topView}>
                        <Image source={CongratulationsSplash} style={styles.congratulationsSplash}/>
                    </View>
                    <View>
                        <Text style={styles.emailVerifyTitle}>Congratulations</Text>
                        <Text style={styles.emailVerifySubtitle}>Verify your email to login</Text>
                    </View>
                    <TextInput
                        onChangeText={(value) => {
                            setCode(value);
                        }}
                        value={code}
                        style={confirmationCodeFocus ? styles.textInputFocus : styles.textInput}
                        onFocus={() => {
                            setIsConfirmationCodeFocus(true);
                        }}
                        label="Confirmation Code"
                        textColor={"#313030"}
                        underlineColor={"#f2f2f2"}
                        activeUnderlineColor={"#313030"}
                    />
                    <Button
                        onPress={() => onConfirmPressed(code)}
                        style={styles.confirmButton}
                        textColor={"#f2f2f2"}
                        buttonColor={"#2A3779"}
                        mode="outlined"
                        labelStyle={{fontSize: 18}}>
                        Confirm
                    </Button>
                    <Button
                        onPress={(_) => onResendCodePressed()}
                        style={styles.resendCodeButton}
                        textColor={"#f2f2f2"}
                        buttonColor={"#2A3779"}
                        mode="outlined"
                        labelStyle={{fontSize: 18}}>
                        Resend Code
                    </Button>
                    <View style={styles.bottomView}>
                        <Text style={styles.backToSignInFooter}>Back to
                            <Text style={styles.backToSignInButton}
                                  onPress={() => {navigation.navigate('SignIn', {})}}> Sign in</Text>
                        </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

