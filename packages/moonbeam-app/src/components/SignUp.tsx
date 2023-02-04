import React, {useState} from "react";
import {ImageBackground, KeyboardAvoidingView, Platform, Text, View} from "react-native";
import {SignUpProps} from "../models/PageProps";
import {commonStyles} from '../styles/common.module';
import {styles} from '../styles/signup.module';
// @ts-ignore
import {ProgressStep, ProgressSteps} from 'react-native-progress-steps';
import {Button, TextInput} from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import {dutyDropdownItems} from "../common/Common";
import moment from "moment";
// @ts-ignore
import {useValidation} from 'react-native-form-validator';

/**
 * Sign Up component.
 */
export const SignUpComponent = ({navigation, route}: SignUpProps) => {
    console.log(route);
    console.log(navigation);

    // state driven key-value pairs for UI related elements
    const [emailFocus, setIsEmailFocus] = useState<boolean>(false);
    const [nameFocus, setIsNameFocus] = useState<boolean>(false);
    const [dateLocationFocus, setIsDateLocationFocus] = useState<boolean>(false);
    const [phoneFocus, setIsPhoneFocus] = useState<boolean>(false);
    const [dutyOpen, setIsDutyOpen] = useState(false);
    const [dutyItems, setDutyItems] = useState(dutyDropdownItems);
    const [rankFocus, setIsRankFocus] = useState<boolean>(false);
    const [dutyStationFocus, setIsDutyStationFocus] = useState<boolean>(false);
    const [passwordFocus, setIsPasswordFocus] = useState<boolean>(false);
    const [confirmPasswordFocus, setIsConfirmPasswordFocus] = useState<boolean>(false);
    const [registerButtonShown, setIsRegisterButtonShown] = useState<boolean>(false);
    // state driven key-value pairs for signup form values
    const [progressStepsMainError, setProgressStepMainError] = useState<boolean>(false);
    const [progressStepsErrors, setProgressStepsErrors] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [emailErrors, setEmailErrors] = useState<any[]>([]);

    const [name, setName] = useState<string>("");
    const [birthDate, setBirthDate] = useState<Date>(new Date());
    const [duty, setDuty] = useState(null);
    const [rank, setRank] = useState<string>("");
    const [dutyStation, setDutyStation] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<number>("");

    // calculates the maximum value for the input dates (minimum 17 to sign-up, maximum 100)
    const minimumDate = moment().subtract(100, "years").toDate();
    const maximumDate = moment().subtract(17, "years").toDate();

    // Constants used for easy field validation, to validate, check if field is invalid or get errors for invalid field
    const {validate, isFieldInError, getErrorsInField} =
        useValidation({
            state: {
                name: name,
                email: email,
                birthDate: birthDate,
                duty: duty,
                rank: rank,
                dutyStation: dutyStation,
                password: password,
                confirmPassword: confirmPassword,
                phoneNumber: phoneNumber},
        });

    return (
        <ImageBackground
            imageStyle={{
                resizeMode: 'stretch'
            }}
            style={commonStyles.image}
            source={require('../../assets/signup-background.png')}>
            <KeyboardAvoidingView
                behavior={Platform.OS !== 'ios' ? 'position' : 'position'}
                style={commonStyles.container}>
                <View style={[commonStyles.container, {marginTop: '30%'}]}>
                    <View>
                        <Text style={styles.signupTitle}>Welcome</Text>
                        <Text style={styles.signupSubtitle}>Let's set up an account</Text>
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
                            label="Contact"
                            nextBtnStyle={styles.initialNextBtnStyle}
                            nextBtnTextStyle={styles.btnStyleText}
                            onNext={() => {
                                if (email === "" || name === "" || birthDate.toDateString() === "") {
                                    setProgressStepMainError(true);
                                    setProgressStepsErrors(true);
                                }
                                dutyOpen && setIsDutyOpen(false);
                            }}
                            errors={progressStepsErrors}>
                            <Text style={styles.contactProgressTitle}>Contact Information</Text>
                            {progressStepsMainError && <Text style={styles.errorMessageMain}>Please fill out the information below!</Text>}
                            <TextInput
                                onEndEditing={() => {
                                    validate({
                                        email: {minLength: 7, email: true, required: true},
                                    });
                                    if (isFieldInError('email')) {
                                        setProgressStepsErrors(true);
                                        setEmailErrors(getErrorsInField('email'));
                                    } else {
                                        setProgressStepsErrors(false);
                                        setEmailErrors([]);
                                    }
                                }}
                                onChangeText={(value) => {
                                    setProgressStepMainError(false);
                                    validate({
                                        email: {minLength: 7, email: true, required: true},
                                    });
                                    if (isFieldInError('email')) {
                                        setProgressStepsErrors(true);
                                        setEmailErrors(getErrorsInField('email'));
                                    } else {
                                        console.log('here mofo 2');
                                        setProgressStepsErrors(false);
                                        setEmailErrors([]);
                                    }
                                    setEmail(value)
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
                            {emailErrors.length > 0 && !progressStepsMainError ? <Text style={styles.errorMessage}>{emailErrors[0]}</Text> : <></>}

                            <TextInput
                                style={nameFocus ? styles.textInputFocus : styles.textInput}
                                onFocus={() => {
                                    setIsNameFocus(true);
                                }}
                                label="Full Name"
                                textColor={"#313030"}
                                underlineColor={"#f2f2f2"}
                                activeUnderlineColor={"#313030"}
                                left={<TextInput.Icon icon="account" iconColor="#313030"/>}
                            />
                            <TextInput
                                style={dateLocationFocus ? styles.textInputFocus : styles.textInput}
                                onFocus={() => {
                                    setIsDateLocationFocus(true);
                                }}
                                label="Birthday (DD/MM/YYY)"
                                textColor={"#313030"}
                                underlineColor={"#f2f2f2"}
                                activeUnderlineColor={"#313030"}
                                left={<TextInput.Icon icon="calendar" iconColor="#313030"/>}
                            />
                        </ProgressStep>
                        <ProgressStep
                            // note do not enable this unless we need more space for content
                            scrollable={false}
                            label="Military"
                            nextBtnStyle={styles.nextBtnStyle}
                            nextBtnTextStyle={styles.btnStyleText}
                            nextBtnText={"Next"}
                            previousBtnText={"Back"}
                            previousBtnStyle={styles.prevBtnStyle}
                            previousBtnTextStyle={styles.btnStyleText}
                            onNext={() => {
                                setIsRegisterButtonShown(true);
                                dutyOpen && setIsDutyOpen(false);
                            }}
                            errors={progressStepsErrors}
                            onPrevious={() => {
                                setIsRegisterButtonShown(false);
                                dutyOpen && setIsDutyOpen(false);
                            }}>
                            <Text style={styles.militaryProgressTitle}>Military Information</Text>
                            <DropDownPicker
                                zIndex={1000}
                                zIndexInverse={3000}
                                placeholder={"Duty Status"}
                                dropDownContainerStyle={styles.dropdownContainer}
                                dropDownDirection={"BOTTOM"}
                                style={styles.initialDropdownPicker}
                                textStyle={{fontFamily: 'Raleway-Regular'}}
                                open={dutyOpen}
                                value={duty}
                                items={dutyItems}
                                setOpen={setIsDutyOpen}
                                setValue={setDuty}
                                setItems={setDutyItems}
                            />
                            <TextInput
                                style={rankFocus ? styles.textInputFocus : styles.textInput}
                                onFocus={() => {
                                    setIsRankFocus(true);
                                }}
                                label="Rank"
                                textColor={"#313030"}
                                underlineColor={"#f2f2f2"}
                                activeUnderlineColor={"#313030"}
                                left={<TextInput.Icon icon="chevron-triple-up" iconColor="#313030"/>}
                            />
                            <TextInput
                                style={dutyStationFocus ? styles.textInputFocus : styles.textInput}
                                onFocus={() => {
                                    setIsDutyStationFocus(true);
                                }}
                                label="Duty Station"
                                textColor={"#313030"}
                                underlineColor={"#f2f2f2"}
                                activeUnderlineColor={"#313030"}
                                left={<TextInput.Icon icon="office-building-marker" iconColor="#313030"/>}
                            />
                        </ProgressStep>
                        <ProgressStep
                            // note do not enable this unless we need more space for content
                            scrollable={false}
                            label="Security"
                            nextBtnText={"Next"}
                            previousBtnText={"Back"}
                            finishBtnText={""}
                            previousBtnStyle={styles.lastPrevBtnStyle}
                            previousBtnTextStyle={styles.btnStyleText}
                            onPrevious={() => setIsRegisterButtonShown(false)}
                            errors={progressStepsErrors}>
                            <Text style={styles.securityProgressTitle}>Account Security</Text>
                            <TextInput
                                style={passwordFocus ? styles.initialTextInputFocus : styles.initialTextInput}
                                onFocus={() => {
                                    setIsPasswordFocus(true);
                                }}
                                label="Password"
                                secureTextEntry
                                textColor={"#313030"}
                                underlineColor={"#f2f2f2"}
                                activeUnderlineColor={"#313030"}
                                right={<TextInput.Icon icon="eye" iconColor="#313030"/>}
                                left={<TextInput.Icon icon="lock" iconColor="#313030"/>}
                            />
                            <TextInput
                                style={confirmPasswordFocus ? styles.textInputFocus : styles.textInput}
                                onFocus={() => {
                                    setIsConfirmPasswordFocus(true);
                                }}
                                label="Confirm Password"
                                secureTextEntry
                                textColor={"#313030"}
                                underlineColor={"#f2f2f2"}
                                activeUnderlineColor={"#313030"}
                                right={<TextInput.Icon icon="eye" iconColor="#313030"/>}
                                left={<TextInput.Icon icon="lock" iconColor="#313030"/>}
                            />
                            <TextInput
                                style={phoneFocus ? styles.textInputFocus : styles.textInput}
                                onFocus={() => {
                                    setIsPhoneFocus(true);
                                }}
                                label="Phone Number"
                                textColor={"#313030"}
                                underlineColor={"#f2f2f2"}
                                activeUnderlineColor={"#313030"}
                                left={<TextInput.Icon icon="phone" iconColor="#313030"/>}
                            />
                        </ProgressStep>
                    </ProgressSteps>
                </View>
                {
                    registerButtonShown &&
                    <View style={styles.signUpView}>
                        <Button
                            style={styles.signUpFooterButton}
                            textColor={"#f2f2f2"}
                            buttonColor={"#2A3779"}
                            mode="outlined"
                            labelStyle={{fontSize: 18}}>
                            Register
                        </Button>
                        <Text style={styles.disclaimerText}>
                            By creating an account with us, you agree to our <Text style={styles.termsFooter}>Terms
                            and Conditions</Text> and to our <Text style={styles.termsFooter}>Privacy Policy</Text>.
                        </Text>
                    </View>
                }
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};
