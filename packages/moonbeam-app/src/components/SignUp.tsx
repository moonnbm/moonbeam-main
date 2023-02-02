import React, {useState} from "react";
import {ImageBackground, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {SignUpProps} from "../models/PageProps";
import {commonStyles} from '../styles/common.module';
import {styles} from '../styles/signup.module';
// @ts-ignore
import {ProgressStep, ProgressSteps} from 'react-native-progress-steps';
import {TextInput} from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import {dutyStationDropdownItems, dutyDropdownItems, ranksDropdownItems} from "../common/Common"

/**
 * Sign Up component.
 */
export const SignUpComponent = ({navigation, route}: SignUpProps) => {
    console.log(route);
    console.log(navigation);

    // state driven key-value pairs
    const [usernameFocus, setIsUsernameFocus] = useState<boolean>(false);
    const [nameFocus, setIsNameFocus] = useState<boolean>(false);
    const [phoneFocus, setIsPhoneFocus] = useState<boolean>(false);
    const [dutyOpen, setIsDutyOpen] = useState(false);
    const [dutyValue, setDutyValue] = useState(null);
    const [dutyItems, setDutyItems] = useState(dutyDropdownItems);
    const [rankOpen, setIsRankOpen] = useState(false);
    const [rankValue, setRankValue] = useState(null);
    const [rankItems, setRankItems] = useState(ranksDropdownItems);
    const [dutyStationOpen, setIsDutyStationOpen] = useState(false);
    const [dutyStationValue, setDutyStationValue] = useState(null);
    const [dutyStationItems, setDutyStationItems] = useState(dutyStationDropdownItems);
    const [passwordFocus, setIsPasswordFocus] = useState<boolean>(false);
    const [confirmPasswordFocus, setIsConfirmPasswordFocus] = useState<boolean>(false);

    return (
        <ImageBackground
            style={commonStyles.image}
            source={require('../../assets/signup-background.png')}>
            <SafeAreaView
                style={commonStyles.container}>
                <Text style={styles.signupTitle}>Welcome</Text>
                <Text style={styles.signupSubtitle}>Let's set up an account</Text>
                <View style={styles.container}>
                    <View style={{flex: 1}}>
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
                                // note if this is not false, it does not work on Android
                                scrollable={false}
                                label="Contact"
                                nextBtnStyle={styles.initialNextBtnStyle}
                                nextBtnTextStyle={styles.btnStyleText}>
                                <Text style={styles.contactProgressTitle}>Contact Information</Text>
                                <TextInput
                                    style={usernameFocus ? styles.initialTextInputFocus : styles.initialTextInput}
                                    onFocus={() => {
                                        setIsUsernameFocus(true);
                                    }}
                                    label="Email"
                                    textColor={"#313030"}
                                    underlineColor={"white"}
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
                                    underlineColor={"white"}
                                    activeUnderlineColor={"#313030"}
                                    left={<TextInput.Icon icon="account" iconColor="#313030"/>}
                                />
                                <TextInput
                                    style={phoneFocus ? styles.textInputFocus : styles.textInput}
                                    onFocus={() => {
                                        setIsPhoneFocus(true);
                                    }}
                                    label="Phone Number"
                                    textColor={"#313030"}
                                    underlineColor={"white"}
                                    activeUnderlineColor={"#313030"}
                                    left={<TextInput.Icon icon="phone" iconColor="#313030"/>}
                                />
                            </ProgressStep>
                            <ProgressStep
                                // note if this is not false, it does not work on Android
                                scrollable={false}
                                label="Military"
                                nextBtnStyle={styles.nextBtnStyle}
                                nextBtnTextStyle={styles.btnStyleText}
                                nextBtnText={"Next"}
                                previousBtnText={"Back"}
                                previousBtnStyle={styles.prevBtnStyle}
                                previousBtnTextStyle={styles.btnStyleText}>
                                <Text style={styles.militaryProgressTitle}>Military Information</Text>
                                <DropDownPicker
                                    zIndex={1000}
                                    zIndexInverse={3000}
                                    placeholder={"Duty Status"}
                                    dropDownContainerStyle={styles.dropdownContainer}
                                    dropDownDirection={"TOP"}
                                    style={styles.initialDropdownPicker}
                                    textStyle={{fontFamily: 'Raleway-Regular'}}
                                    open={dutyOpen}
                                    value={dutyValue}
                                    items={dutyItems}
                                    setOpen={setIsDutyOpen}
                                    setValue={setDutyValue}
                                    setItems={setDutyItems}
                                />
                                <DropDownPicker
                                    zIndex={2000}
                                    zIndexInverse={2000}
                                    placeholder={"Current/Former Rank"}
                                    dropDownContainerStyle={styles.dropdownContainer}
                                    dropDownDirection={"TOP"}
                                    style={styles.dropdownPicker}
                                    textStyle={{fontFamily: 'Raleway-Regular'}}
                                    open={rankOpen}
                                    value={rankValue}
                                    items={rankItems}
                                    setOpen={setIsRankOpen}
                                    setValue={setRankValue}
                                    setItems={setRankItems}
                                />
                                <DropDownPicker
                                    zIndex={2000}
                                    zIndexInverse={2000}
                                    placeholder={"Current/Former Duty Station"}
                                    dropDownContainerStyle={styles.dropdownContainer}
                                    dropDownDirection={"TOP"}
                                    style={styles.dropdownPicker}
                                    textStyle={{fontFamily: 'Raleway-Regular'}}
                                    open={dutyStationOpen}
                                    value={dutyStationValue}
                                    items={dutyStationItems}
                                    setOpen={setIsDutyStationOpen}
                                    setValue={setDutyStationValue}
                                    setItems={setDutyStationItems}
                                />
                            </ProgressStep>
                            <ProgressStep
                                // note if this is not false, it does not work on Android
                                scrollable={false}
                                label="Security"
                                nextBtnStyle={styles.nextBtnStyle}
                                nextBtnTextStyle={styles.btnStyleText}
                                nextBtnText={"Next"}
                                previousBtnText={"Back"}
                                finishBtnText={"Done"}
                                previousBtnStyle={styles.prevBtnStyle}
                                previousBtnTextStyle={styles.btnStyleText}>
                                <Text style={styles.securityProgressTitle}>Account Security</Text>
                                <TextInput
                                    style={passwordFocus ? styles.initialTextInputFocus : styles.initialTextInput}
                                    onFocus={() => {
                                        setIsPasswordFocus(true);
                                    }}
                                    label="Password"
                                    secureTextEntry
                                    textColor={"#313030"}
                                    underlineColor={"white"}
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
                                    underlineColor={"white"}
                                    activeUnderlineColor={"#313030"}
                                    right={<TextInput.Icon icon="eye" iconColor="#313030"/>}
                                    left={<TextInput.Icon icon="lock" iconColor="#313030"/>}
                                />
                            </ProgressStep>
                        </ProgressSteps>
                    </View>
                    {/*<Button style={styles.registerButton} textColor={"#313030"}*/}
                    {/*        buttonColor={"#F2FF5D"} mode="contained">*/}
                    {/*    Register*/}
                    {/*</Button>*/}
                    {/*<Divider style={styles.bottomDivider}/>*/}
                    {/*<Text style={styles.loginFooter}>Have an account ?*/}
                    {/*    <Text style={styles.loginFooterButton}*/}
                    {/*          onPress={() => {*/}
                    {/*              navigation.navigate('SignIn', {})*/}
                    {/*          }}>  Sign in</Text>*/}
                    {/*</Text>*/}
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};
