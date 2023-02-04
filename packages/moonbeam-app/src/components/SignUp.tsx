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
import dayjs from 'dayjs';
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
    const [birthDateFocus, setIsBirthDateFocus] = useState<boolean>(false);
    const [phoneFocus, setIsPhoneFocus] = useState<boolean>(false);
    const [dutyOpen, setIsDutyOpen] = useState(false);
    const [dutyItems, setDutyItems] = useState(dutyDropdownItems);
    const [rankFocus, setIsRankFocus] = useState<boolean>(false);
    const [dutyStationFocus, setIsDutyStationFocus] = useState<boolean>(false);
    const [passwordFocus, setIsPasswordFocus] = useState<boolean>(false);
    const [confirmPasswordFocus, setIsConfirmPasswordFocus] = useState<boolean>(false);
    const [registerButtonShown, setIsRegisterButtonShown] = useState<boolean>(false);
    // state driven key-value pairs for signup form values
    const [progressStepsContactError, setProgressStepsContactError] = useState<boolean>(false);
    const [progressStepsMilitaryError, setProgressStepsMilitaryError] = useState<boolean>(false);
    const [progressStepsErrors, setProgressStepsErrors] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [emailErrors, setEmailErrors] = useState<any[]>([]);
    const [name, setName] = useState<string>("");
    const [nameErrors, setNameErrors] = useState<any[]>([]);
    const [birthDate, setBirthDate] = useState<string>("");
    const [dateErrors, setDateErrors] = useState<any[]>([]);
    const [duty, setDuty] = useState<string | null>(null);
    const [dutyErrors, setDutyErrors] = useState<any[]>([]);
    const [rank, setRank] = useState<string>("");
    const [rankErrors, setRankErrors] = useState<any[]>([]);
    const [dutyStation, setDutyStation] = useState<string>("");
    const [dutyStationErrors, setDutyStationErrors] = useState<any[]>([]);
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");

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
                phoneNumber: phoneNumber
            },
        });

    /**
     * Helper function used to validate fields
     *
     * @param fieldName name of the field to validate
     * @param useValidator flag highlighting whether to use the validator library or not
     */
    const fieldValidation = (fieldName: string, useValidator: boolean) => {
        switch (fieldName) {
            case 'email':
                useValidator && validate({
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
            case 'name':
                useValidator && validate({
                    ...({[fieldName]: {minLength: 2, maxLength: 62, number: false, required: true}}),
                });
                if (isFieldInError('name') || !/^(\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*){2,})$/.test(name)) {
                    setProgressStepsErrors(true);
                    setNameErrors([...getErrorsInField('name'), "Name formatting not valid (First | Middle | Last)."]);
                } else {
                    setProgressStepsErrors(false);
                    setNameErrors([]);
                }
                break;
            case 'birthDate':
                useValidator && validate({
                    ...({[fieldName]: {date: 'YYYY-MM-DD', required: true}}),
                });
                if (isFieldInError('birthDate') && !/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/.test(birthDate)) {
                    setProgressStepsErrors(true);
                    setDateErrors([...getErrorsInField('birthDate'), "Date of Birth must be a valid date (YYYY-MM-DD)."]);
                } else if (isNaN(Date.parse(birthDate)) == true) {
                    setProgressStepsErrors(true);
                    setDateErrors(["Date of Birth must be a valid date (YYYY-MM-DD)."]);
                    // maximum age is 100, and minum age is 17
                } else if (Math.abs(dayjs(Date.parse(birthDate)).diff(Date.now(), "years")) > 100) {
                    setProgressStepsErrors(true);
                    setDateErrors(["You must be at most 100 years old."]);
                } else if (Math.abs(dayjs(Date.parse(birthDate)).diff(Date.now(), "years")) < 17) {
                    setProgressStepsErrors(true);
                    setDateErrors(["You must be at least 17 years old."]);
                } else {
                    setProgressStepsErrors(false);
                    setDateErrors([]);
                }
                break;
            case 'duty':
                useValidator && validate({
                    ...({
                        [fieldName]: {
                            minLength: 7,
                            maxLength: 14,
                            required: true
                        }
                    }),
                });
                if (isFieldInError('duty') || !duty) {
                    setProgressStepsErrors(true);
                    setDutyErrors([...getErrorsInField('duty'), "Please select a Duty Status."]);
                } else {
                    setProgressStepsErrors(false);
                    setDutyErrors([]);
                }
                break;
            case 'rank':
                useValidator && validate({
                    ...({[fieldName]: {minLength: 2, maxLength: 35, required: true}}),
                });
                if (isFieldInError('rank') || !/^(\w{2,35})$/.test(rank)) {
                    setProgressStepsErrors(true);
                    setRankErrors([...getErrorsInField('rank'), "Invalid Military Rank format."]);
                } else {
                    setProgressStepsErrors(false);
                    setRankErrors([]);
                }
                break;
            case 'dutyStation':
                useValidator && validate({
                    ...({[fieldName]: {minLength: 2, maxLength: 35, required: true}}),
                });
                if (isFieldInError('dutyStation') || !/^([A-Z][a-z]{5,80})$/.test(dutyStation)) {
                    setProgressStepsErrors(true);
                    setDutyStationErrors([...getErrorsInField('dutyStation'), "Invalid Duty Station format."]);
                } else {
                    setProgressStepsErrors(false);
                    setDutyStationErrors([]);
                }
                break;
            default:
                throw new Error('Unexpected field name!');
        }
    }

    return (
        <ImageBackground
            imageStyle={{
                resizeMode: 'stretch'
            }}
            style={commonStyles.image}
            source={require('../../assets/signup-background.png')}>
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'position' : 'height'}
                keyboardVerticalOffset={Platform.OS == 'ios' ? -80 : 100}
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
                                if (email === "" || name === "" || birthDate === "") {
                                    setProgressStepsContactError(true);
                                    setProgressStepsErrors(true);
                                } else {
                                    fieldValidation("email", false);
                                    fieldValidation("name", false);
                                    fieldValidation("birthDate", false);
                                    if (emailErrors.length !== 0 || nameErrors.length !== 0 || dateErrors.length !== 0) {
                                        setProgressStepsErrors(true);
                                    } else if (emailErrors.length === 0 && nameErrors.length === 0 && dateErrors.length === 0) {
                                        dutyOpen && setIsDutyOpen(false);
                                        setProgressStepsContactError(false);
                                    }
                                }
                            }}
                            errors={progressStepsErrors}>
                            <Text style={styles.contactProgressTitle}>Contact Information</Text>
                            {progressStepsContactError &&
                                <Text style={styles.errorMessageMain}>Please fill out the information below!</Text>}
                            <TextInput
                                onEndEditing={() => {
                                    fieldValidation('email', true);
                                }}
                                onChangeText={(value) => {
                                    setProgressStepsContactError(false);
                                    fieldValidation('email', true);
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
                            {(emailErrors.length > 0 && !progressStepsContactError) ?
                                <Text style={styles.errorMessage}>{emailErrors[0]}</Text> : <></>}

                            <TextInput
                                onEndEditing={() => {
                                    fieldValidation('name', true);
                                }}
                                onChangeText={(value) => {
                                    setProgressStepsContactError(false);
                                    fieldValidation('name', true);
                                    setName(value);
                                }}
                                value={name}
                                style={nameFocus ? styles.textInputFocus : styles.textInput}
                                onFocus={() => {
                                    setIsNameFocus(true);
                                }}
                                label="Full Name (First | Middle | Last )"
                                textColor={"#313030"}
                                underlineColor={"#f2f2f2"}
                                activeUnderlineColor={"#313030"}
                                left={<TextInput.Icon icon="account" iconColor="#313030"/>}
                            />
                            {(nameErrors.length > 0 && !progressStepsContactError) ?
                                <Text style={styles.errorMessage}>{nameErrors[0]}</Text> : <></>}

                            <TextInput
                                onEndEditing={() => {
                                    fieldValidation('birthDate', true);
                                }}
                                onChangeText={(value) => {
                                    setProgressStepsContactError(false);
                                    fieldValidation('birthDate', true);
                                    setBirthDate(value);
                                }}
                                value={birthDate}
                                style={birthDateFocus ? styles.textInputFocus : styles.textInput}
                                onFocus={() => {
                                    setIsBirthDateFocus(true);
                                }}
                                label="Birthday (YYYY-MM-DD)"
                                textColor={"#313030"}
                                underlineColor={"#f2f2f2"}
                                activeUnderlineColor={"#313030"}
                                left={<TextInput.Icon icon="calendar" iconColor="#313030"/>}
                            />
                            {(dateErrors.length > 0 && !progressStepsContactError) ?
                                <Text style={styles.errorMessage}>{dateErrors[0]}</Text> : <></>}

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
                                if (duty === "" || rank === "" || dutyStation === "") {
                                    setProgressStepsMilitaryError(true);
                                    setProgressStepsErrors(true);
                                } else {
                                    fieldValidation("duty", false);
                                    fieldValidation("rank", false);
                                    fieldValidation("dutyStation", false);
                                    if (dutyErrors.length !== 0 || rankErrors.length !== 0 || dutyStationErrors.length !== 0) {
                                        setProgressStepsErrors(true);
                                    } else {
                                        setIsRegisterButtonShown(true);
                                        dutyOpen && setIsDutyOpen(false);
                                        setProgressStepsMilitaryError(false);
                                    }
                                }
                            }}
                            errors={progressStepsErrors}
                            onPrevious={() => {
                                setProgressStepsMilitaryError(false);
                                setIsRegisterButtonShown(false);
                                dutyOpen && setIsDutyOpen(false);
                            }}>
                            <Text style={styles.militaryProgressTitle}>Military Information</Text>
                            {progressStepsMilitaryError &&
                                <Text style={styles.errorMessageMain}>Please fill out the information below!</Text>}
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
                                onSelectItem={(item) => {
                                    setProgressStepsMilitaryError(false);
                                    fieldValidation('duty', true);
                                    setDuty(item.value!);
                                }}
                            />
                            {(dutyErrors.length > 0 && !progressStepsMilitaryError) ?
                                <Text style={styles.errorMessage}>{dutyErrors[0]}</Text> : <></>}

                            <TextInput
                                onEndEditing={() => {
                                    fieldValidation('rank', true);
                                }}
                                onChangeText={(value) => {
                                    setProgressStepsMilitaryError(false);
                                    fieldValidation('rank', true);
                                    setRank(value);
                                }}
                                value={rank}
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
                            {(rankErrors.length > 0 && !progressStepsMilitaryError) ?
                                <Text style={styles.errorMessage}>{rankErrors[0]}</Text> : <></>}

                            <TextInput
                                onEndEditing={() => {
                                    fieldValidation('dutyStation', true);
                                }}
                                onChangeText={(value) => {
                                    setProgressStepsMilitaryError(false);
                                    fieldValidation('dutyStation', true);
                                    setDutyStation(value);
                                }}
                                value={dutyStation}
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
                            {(dutyStationErrors.length > 0 && !progressStepsMilitaryError) ?
                                <Text style={styles.errorMessage}>{dutyStationErrors[0]}</Text> : <></>}

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
