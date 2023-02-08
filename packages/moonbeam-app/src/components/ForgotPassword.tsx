import React, {useEffect, useState} from "react";
import {Image, ImageBackground, View} from "react-native";
import {ForgotPasswordProps} from "../models/PageProps";
import {commonStyles} from "../styles/common.module";
// @ts-ignore
import {ProgressStep, ProgressSteps} from 'react-native-progress-steps';
import {Button, Modal, Portal, Text, TextInput} from "react-native-paper";
import {styles} from "../styles/forgotPassword.module";
// @ts-ignore
import {useValidation} from 'react-native-form-validator';
// @ts-ignore
import ForgotPasswordLogo from '../../assets/login-logo.png';
import {Auth} from 'aws-amplify';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

/**
 * Email Verification component.
 */
export const ForgotPassword = ({navigation, route}: ForgotPasswordProps) => {
    // state driven key-value pairs for UI related elements
    const [emailFocus, setIsEmailFocus] = useState<boolean>(false);
    const [isInitialRender, setIsInitialRender] = useState<boolean>(route.params.initialRender);
    const [resetPasswordShown, setResetPasswordShown] = useState<boolean>(false);
    const [resetPasswordDisclaimerShown, setResetPasswordDisclaimerShown] = useState<boolean>(false);
    const [passwordFocus, setIsPasswordFocus] = useState<boolean>(false);
    const [confirmPasswordFocus, setIsConfirmPasswordFocus] = useState<boolean>(false);
    const [codeFocus, setIsCodeFocus] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalMessage, setModalMessage] = useState<string>("");
    const [isErrorModal, setIsErrorModal] = useState<boolean>(false);
    // state driven key-value pairs for forgot password form values
    const [profileStepProgressError, setProfileStepProgressError] = useState<boolean>(false);
    const [pwResetStepProgressError, setPwResetStepProgressError] = useState<boolean>(false);
    const [codeVerificationStepProgressError, setCodeVerificationStepProgressError] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [emailErrors, setEmailErrors] = useState<any[]>([]);
    const [progressStepsErrors, setProgressStepsErrors] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [passwordShown, setIsPasswordShown] = useState<boolean>(false);
    const [passwordErrors, setPasswordErrors] = useState<any[]>([]);
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [confirmPasswordShown, setIsConfirmPasswordShown] = useState<boolean>(false);
    const [confirmPasswordErrors, setConfirmPasswordErrors] = useState<any[]>([]);
    const [code, setCode] = useState<string>("");
    const [codeErrors, setCodeErrors] = useState<any[]>([]);

    /**
     * Entrypoint UseEffect will be used as a block of code where we perform specific tasks (such as
     * auth-related functionality for example), as well as any afferent API calls.
     *
     * Generally speaking, any functionality imperative prior to the full page-load should be
     * included in here.
     */
    useEffect(() => {
        // if it's an initial render, set all validation errors to empty
        if (!isInitialRender) {
            // perform field validations on every state change, for the specific field that is being validated
            if (emailFocus && email !== "") {
                fieldValidation("email");
            }
            email === "" && setEmailErrors([]);

            if (codeFocus && code !== "") {
                fieldValidation("code");
            }
            code === "" && setCodeErrors([]);

            if (passwordFocus && password !== "") {
                fieldValidation("password");
            }
            if (confirmPasswordFocus) {
                fieldValidation("confirmPassword");
            }
            password === "" && setPasswordErrors([]);
            (confirmPassword === "" && password === "") && setConfirmPasswordErrors([]);
        } else {
            setIsInitialRender(false);
        }
    }, [email, emailFocus,
        code, codeFocus,
        password, passwordFocus,
        confirmPassword, confirmPasswordFocus]);

    // Constants used for easy field validation, to validate, check if field is invalid or get errors for invalid field
    const {validate, isFieldInError, getErrorsInField} =
        useValidation({
            state: {
                email: email,
                code: code,
                password: password,
                confirmPassword: confirmPassword
            },
        });

    /**
     * Helper function used to validate fields
     *
     * @param fieldName name of the field to validate
     */
    const fieldValidation = (fieldName: string) => {
        switch (fieldName) {
            case 'email':
                validate({
                    ...({[fieldName]: {minLength: 7, email: true, required: true}}),
                });
                // this is done because the in-built library for emails, does not fully work properly
                if (isFieldInError('email') || !/^([^\s@]+@[^\s@]+\.[^\s@]+)$/.test(email)) {
                    setProgressStepsErrors(true);
                    setEmailErrors([...getErrorsInField('email'), "Invalid email address."]);
                } else {
                    setProgressStepsErrors(false);
                    setEmailErrors([]);
                }
                break;
            case 'code':
                validate({
                    ...({[fieldName]: {minLength: 6, maxLength: 6, required: true}}),
                });
                // this is done because the in-built library for emails, does not fully work properly
                if (isFieldInError('code') || !/^\d{6,6}$/.test(code)) {
                    setProgressStepsErrors(true);
                    setCodeErrors([...getErrorsInField('code'), "Invalid verification code format (######)."]);
                } else {
                    setProgressStepsErrors(false);
                    setCodeErrors([]);
                }
                break;
            case 'password':
                validate({
                    ...({
                        [fieldName]: {
                            minLength: 12,
                            maxLength: 72,
                            required: true,
                        }
                    }),
                });
                if (isFieldInError('password') || !/^((?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{12,72})$/.test(password)) {
                    setProgressStepsErrors(true);
                    setPasswordErrors([...getErrorsInField('password'), "Invalid Password - max 72 chars, min: 12 chars, 1 special character, 1 number, 1 lowerCase, 1 UpperCase."]);
                } else {
                    setProgressStepsErrors(false);
                    setPasswordErrors([]);
                }
                break;
            case 'confirmPassword':
                if (password !== confirmPassword) {
                    setProgressStepsErrors(true);
                    setConfirmPasswordErrors([...getErrorsInField('confirmPassword'), "Passwords do not match."]);
                } else {
                    setProgressStepsErrors(false);
                    setConfirmPasswordErrors([]);
                }
                break;
            default:
                console.log('Unexpected field name!');
        }
    };

    /**
     * Function used to capture the password reset code action
     *
     * @param username username inputted by the user
     * @return {@link Boolean} a flag representing whether the code retrieval was successful or not
     */
    const passwordCodeRetrieval = async (username: string): Promise<boolean> => {
        try {
            await Auth.forgotPassword(username);
            return true;
        } catch (error) {
            console.log(`Unexpected error while confirming identity: ${error}`);
            // @ts-ignore
            setEmailErrors([error.message]);
            return false;
        }
    };

    /**
     * Function used to capture the password reset code action
     *
     * @param username username inputted by the user
     * @param password new password inputted by the user
     * @param code verification code inputted by the user
     */
    const passwordReset = async (username: string, password: string, code: string) => {
        try {
            await Auth.forgotPasswordSubmit(username, code, password);
            setModalVisible(true);
            setIsErrorModal(false);
            setModalMessage("Thanks for confirming the code! Your password is now changed!");
        } catch (error) {
            console.log(`Unexpected error while resetting password: ${error}`);
            setModalVisible(true);
            setIsErrorModal(true);
            // @ts-ignore
            setModalMessage(error.message);
        }
    };

    // return the component for the Forgot Password page
    return (
        <ImageBackground
            imageStyle={{
                resizeMode: 'stretch'
            }}
            style={commonStyles.image}
            source={require('../../assets/forgot-password-background.png')}>
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
                        onPress={() => {
                            isErrorModal ? setModalVisible(false) : navigation.navigate('SignIn', {})
                        }}>
                        {isErrorModal ? `Try Again` : `Sign In`}
                    </Button>
                </Modal>
            </Portal>
            <KeyboardAwareScrollView
                contentContainerStyle={commonStyles.container}>
                <View style={[commonStyles.container, {marginTop: '35%'}]}>
                    <View>
                        <Text style={styles.forgotPasswordTitle}>
                            {resetPasswordDisclaimerShown ? 'Great' : (!resetPasswordShown ? 'Welcome' : 'Thanks') }
                        </Text>
                        <Text style={styles.forgotPasswordSubtitle}>
                            {resetPasswordDisclaimerShown ? 'We just sent you a code' : (!resetPasswordShown ? 'Let\'s reset your password': 'Input your new password') }
                        </Text>
                    </View>
                    <ProgressSteps
                        progressBarColor={"grey"}
                        disabledStepIconColor={"grey"}
                        labelColor={"#313030"}
                        activeLabelColor={"#2A3779"}
                        activeStepIconBorderColor={"#2A3779"}
                        completedStepIconColor={"#2A3779"}
                        completedProgressBarColor={"#2A3779"}
                        completedLabelColor={"#2A3779"}
                        labelFontSize={16}
                        labelFontFamily={"Raleway-Medium"}>
                        <ProgressStep
                            // note do not enable this unless we need more space for content
                            scrollable={false}
                            label="Username"
                            nextBtnStyle={styles.initialNextBtnStyle}
                            nextBtnTextStyle={styles.btnStyleText}
                            onNext={async () => {
                                if (email === "") {
                                    setProfileStepProgressError(true);
                                    setProgressStepsErrors(true);
                                } else {
                                    fieldValidation("email");
                                    if (emailErrors.length !== 0) {
                                        setProgressStepsErrors(true);
                                    } else if (emailErrors.length === 0) {
                                        const codeRetrievedFlag = await passwordCodeRetrieval(email);
                                        if (codeRetrievedFlag) {
                                            setProfileStepProgressError(false);
                                            setResetPasswordShown(true);
                                            setProgressStepsErrors(false);
                                        } else {
                                            setProgressStepsErrors(true);
                                        }
                                    }
                                }
                            }}
                            errors={progressStepsErrors}>
                            <Text style={styles.usernameProgressTitle}>Username Information</Text>
                            {profileStepProgressError &&
                                <Text style={styles.errorMessageMain}>Please fill out the information below!</Text>}
                            {/* @ts-ignore */}
                            <TextInput
                                onChangeText={(value: React.SetStateAction<string>) => {
                                    setIsEmailFocus(true);
                                    setProfileStepProgressError(false);
                                    setEmail(value);
                                }}
                                value={email}
                                style={emailFocus ? styles.initialTextInputFocus : styles.initialTextInput}
                                onFocus={() => {
                                    setIsEmailFocus(true);
                                }}
                                label="Email"
                                textColor={"#313030"}
                                underlineColor={"#f2f2f2"}
                                activeUnderlineColor={"#313030"}
                                left={<TextInput.Icon icon="email" iconColor="#313030"/>}
                            />
                            {(emailErrors.length > 0 && !profileStepProgressError) ?
                                <Text style={styles.errorMessage}>{emailErrors[0]}</Text> : <></>}
                        </ProgressStep>

                        <ProgressStep
                            // note do not enable this unless we need more space for content
                            scrollable={false}
                            label="New Password"
                            nextBtnStyle={styles.nextBtnStyle}
                            nextBtnTextStyle={styles.btnStyleText}
                            nextBtnText={"Next"}
                            previousBtnText={"Back"}
                            previousBtnStyle={styles.prevBtnStyle}
                            previousBtnTextStyle={styles.btnStyleText}
                            onNext={() => {
                                if (password === "" || confirmPassword === "") {
                                    setPwResetStepProgressError(true);
                                    setProgressStepsErrors(true);
                                } else {
                                    fieldValidation("password");
                                    fieldValidation("confirmPassword");
                                    if (passwordErrors.length !== 0 || confirmPasswordErrors.length !== 0) {
                                        setProgressStepsErrors(true);
                                    } else {
                                        setPwResetStepProgressError(false);
                                        setProgressStepsErrors(false);
                                        setIsPasswordShown(false);
                                        setResetPasswordDisclaimerShown(true);
                                    }
                                }
                            }}
                            errors={progressStepsErrors}
                            onPrevious={() => {
                                setPwResetStepProgressError(false);
                                setResetPasswordShown(false);
                            }}>
                            <Text style={styles.pwResetProgressTitle}>New Password Information</Text>
                            {pwResetStepProgressError &&
                                <Text style={styles.errorMessageMain}>Please fill out the information below!</Text>}
                            {/* @ts-ignore */}
                            <TextInput
                                onChangeText={(value: React.SetStateAction<string>) => {
                                    setIsPasswordFocus(true);
                                    setPwResetStepProgressError(false);
                                    setPassword(value);
                                }}
                                value={password}
                                style={passwordFocus ? styles.initialTextInputFocus : styles.initialTextInput}
                                onFocus={() => {
                                    setIsPasswordFocus(true);
                                }}
                                label="Password"
                                secureTextEntry={!passwordShown}
                                textColor={"#313030"}
                                underlineColor={"#f2f2f2"}
                                activeUnderlineColor={"#313030"}
                                right={<TextInput.Icon icon="eye" iconColor={passwordShown ? "#A2B000" : "#313030"}
                                                       onPress={() => setIsPasswordShown(!passwordShown)}/>}
                                left={<TextInput.Icon icon="lock" iconColor="#313030"/>}
                            />
                            {(passwordErrors.length > 0 && !pwResetStepProgressError) ?
                                <Text style={styles.errorMessage}>{passwordErrors[0]}</Text> : <></>}
                            {/* @ts-ignore */}
                            <TextInput
                                onChangeText={(value: React.SetStateAction<string>) => {
                                    setIsConfirmPasswordFocus(true);
                                    setPwResetStepProgressError(false);
                                    setConfirmPassword(value);
                                }}
                                value={confirmPassword}
                                style={confirmPasswordFocus ? styles.textInputFocus : styles.textInput}
                                onFocus={() => {
                                    setIsConfirmPasswordFocus(true);
                                }}
                                label="Confirm Password"
                                secureTextEntry={!confirmPasswordShown}
                                textColor={"#313030"}
                                underlineColor={"#f2f2f2"}
                                activeUnderlineColor={"#313030"}
                                right={<TextInput.Icon icon="eye" iconColor={confirmPasswordShown ? "#A2B000" : "#313030"}
                                                       onPress={() => setIsConfirmPasswordShown(!confirmPasswordShown)}/>}
                                left={<TextInput.Icon icon="lock" iconColor="#313030"/>}
                            />
                            {(confirmPasswordErrors.length > 0 && !pwResetStepProgressError) ?
                                <Text style={styles.errorMessage}>{confirmPasswordErrors[0]}</Text> : <></>}
                        </ProgressStep>

                        <ProgressStep
                            // note do not enable this unless we need more space for content
                            scrollable={false}
                            label="Verification"
                            nextBtnStyle={styles.nextBtnStyle}
                            nextBtnTextStyle={styles.btnStyleText}
                            finishBtnText={""}
                            previousBtnText={"Back"}
                            previousBtnStyle={styles.lastPrevBtnStyle}
                            previousBtnTextStyle={styles.btnStyleText}
                            errors={progressStepsErrors}
                            onPrevious={() => {
                                setCodeVerificationStepProgressError(false);
                                setResetPasswordDisclaimerShown(false);
                                setIsPasswordShown(true);
                            }}>
                            <Text style={styles.codeVerificationProgressTitle}>Code Verification</Text>
                            {codeVerificationStepProgressError &&
                                <Text style={styles.errorMessageMain}>Please fill out the information below!</Text>}
                            {/* @ts-ignore */}
                            <TextInput
                                onChangeText={(value: React.SetStateAction<string>) => {
                                    setIsCodeFocus(true);
                                    setCodeVerificationStepProgressError(false);
                                    setCode(value);
                                }}
                                value={code}
                                style={codeFocus ? styles.initialTextInputFocus : styles.initialTextInput}
                                onFocus={() => {
                                    setIsCodeFocus(true);
                                }}
                                label="Verification Code"
                                textColor={"#313030"}
                                underlineColor={"#f2f2f2"}
                                activeUnderlineColor={"#313030"}
                                left={<TextInput.Icon icon="dialpad" iconColor="#313030"/>}
                            />
                            {(codeErrors.length > 0 && !codeVerificationStepProgressError) ?
                                <Text style={styles.errorMessage}>{codeErrors[0]}</Text> : <></>}
                        </ProgressStep>
                    </ProgressSteps>
                </View>
                <View style={[styles.bottomView, !resetPasswordShown && {marginBottom: '30%'}]}>
                    {resetPasswordDisclaimerShown &&
                        <Button
                            style={styles.resetPasswordButton}
                            textColor={"#f2f2f2"}
                            buttonColor={"#2A3779"}
                            mode="outlined"
                            labelStyle={{fontSize: 18}}
                            onPress={() => {
                                if (code === "") {
                                    setCodeVerificationStepProgressError(true);
                                    setProgressStepsErrors(true);
                                } else {
                                    fieldValidation("code");
                                    if (codeErrors.length !== 0) {
                                        setProgressStepsErrors(true);
                                    } else if (codeErrors.length === 0) {
                                        setCodeVerificationStepProgressError(false);
                                        setProgressStepsErrors(false);
                                        passwordReset(email, password, code);
                                    }
                                }
                            }}>
                            Reset Password
                        </Button>
                    }
                    <Image source={ForgotPasswordLogo} style={styles.forgotPasswordLogo}/>
                    <Text style={styles.forgotPasswordFooter}>
                        Remember your password ?
                        <Text style={styles.forgotPasswordFooterButton}
                              onPress={() => {
                                  navigation.navigate('SignIn', {})
                              }}> Sign in</Text>
                    </Text>
                </View>
            </KeyboardAwareScrollView>
        </ImageBackground>
    );
}
