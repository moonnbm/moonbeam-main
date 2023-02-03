import React, {useState} from "react";
import {ImageBackground, KeyboardAvoidingView, Platform, Text, View} from "react-native";
import {SignUpProps} from "../models/PageProps";
import {commonStyles} from '../styles/common.module';
import {styles} from '../styles/signup.module';
// @ts-ignore
import {ProgressStep, ProgressSteps} from 'react-native-progress-steps';
import {Button, TextInput} from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import {dutyDropdownItems} from "../common/Common"

/**
 * Sign Up component.
 */
export const SignUpComponent = ({navigation, route}: SignUpProps) => {
    console.log(route);
    console.log(navigation);

    // state driven key-value pairs
    const [usernameFocus, setIsUsernameFocus] = useState<boolean>(false);
    const [nameFocus, setIsNameFocus] = useState<boolean>(false);
    const [homeLocationFocus, setIsHomeLocationFocus] = useState<boolean>(false);
    const [phoneFocus, setIsPhoneFocus] = useState<boolean>(false);
    const [dutyOpen, setIsDutyOpen] = useState(false);
    const [dutyValue, setDutyValue] = useState(null);
    const [dutyItems, setDutyItems] = useState(dutyDropdownItems);
    const [rankFocus, setIsRankFocus] = useState<boolean>(false);
    const [dutyStationFocus, setIsDutyStationFocus] = useState<boolean>(false);
    const [passwordFocus, setIsPasswordFocus] = useState<boolean>(false);
    const [confirmPasswordFocus, setIsConfirmPasswordFocus] = useState<boolean>(false);
    const [registerButtonShown, setIsRegisterButtonShown] = useState<boolean>(false);

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
                    <View style={{alignSelf: 'center'}}>
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
                            onNext={() => dutyOpen && setIsDutyOpen(false)}>
                            <Text style={styles.contactProgressTitle}>Contact Information</Text>
                            <TextInput
                                style={usernameFocus ? styles.initialTextInputFocus : styles.initialTextInput}
                                onFocus={() => {
                                    setIsUsernameFocus(true);
                                }}
                                label="Email"
                                textColor={"#313030"}
                                underlineColor={"#f2f2f2"}
                                activeUnderlineColor={"#313030"}
                                left={<TextInput.Icon icon="email" iconColor="#313030"/>}
                            />
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
                                style={homeLocationFocus ? styles.textInputFocus : styles.textInput}
                                onFocus={() => {
                                    setIsHomeLocationFocus(true);
                                }}
                                label="Home Location (City, State)"
                                textColor={"#313030"}
                                underlineColor={"#f2f2f2"}
                                activeUnderlineColor={"#313030"}
                                left={<TextInput.Icon icon="map-marker-star" iconColor="#313030"/>}
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
                                value={dutyValue}
                                items={dutyItems}
                                setOpen={setIsDutyOpen}
                                setValue={setDutyValue}
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
                            onPrevious={() => setIsRegisterButtonShown(false)}>
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
