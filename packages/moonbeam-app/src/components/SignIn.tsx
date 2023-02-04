import React, {useEffect, useState} from 'react';
import {Image, ImageBackground, KeyboardAvoidingView, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {styles} from '../styles/signin.module';
// @ts-ignore
import LoginLogo from '../../assets/login-logo.png';
import {SignInProps} from '../models/PageProps'
import {commonStyles} from '../styles/common.module';

/**
 * Sign In component.
 */
export const SignInComponent = ({navigation, route}: SignInProps) => {
    // state driven key-value pairs
    const [usernameFocus, setIsUsernameFocus] = useState<boolean>(false);
    const [passwordFocus, setIsPasswordFocus] = useState<boolean>(false);

    /**
     * Entrypoint UseEffect will be used as a block of code where we perform specific tasks (such as
     * auth-related functionality for example), as well as any afferent API calls.
     *
     * Generally speaking, any functionality imperative prior to the full page-load should be
     * included in here.
     */
    useEffect(() => {
    }, [])

    /**
     * Function used to capture the sign in button action press
     */
    const onSignInPressed = async () => {
        console.log("lala")
    }

    // return the component for the application
    return (
        <ImageBackground
            style={commonStyles.image}
            imageStyle={{
                resizeMode: 'contain'
            }}
            source={require('../../assets/login-background.png')}>
            <KeyboardAvoidingView
                behavior="height"
                onLayout={route.params.onLayoutRootView}
                style={commonStyles.container}>
                <View style={styles.mainView}>
                    <View>
                        <Text style={styles.loginTitle}>Hello</Text>
                        <Text style={styles.loginSubtitle}>Sign in to your account</Text>
                    </View>
                    <TextInput
                        style={usernameFocus ? styles.textInputFocus : styles.textInput}
                        onFocus={() => {
                            setIsUsernameFocus(true);
                        }}
                        label="Email"
                        textColor={"#313030"}
                        underlineColor={"#f2f2f2"}
                        activeUnderlineColor={"#313030"}
                    />
                    <TextInput
                        style={passwordFocus ? styles.textInputFocus : styles.textInput}
                        onFocus={() => {
                            setIsPasswordFocus(true);
                        }}
                        label="Password"
                        secureTextEntry
                        textColor={"#313030"}
                        underlineColor={"#f2f2f2"}
                        activeUnderlineColor={"#313030"}
                        right={<TextInput.Icon icon="eye" iconColor="#313030"/>}
                    />
                    <View style={styles.forgotPasswordView}>
                        <Text style={styles.forgotPasswordButton}
                              onPress={() => {
                              }}>Forgot Password ?
                        </Text>
                    </View>
                    <Button
                        onPress={(_) => onSignInPressed()}
                        style={styles.signInFooterButton}
                        textColor={"#f2f2f2"}
                        buttonColor={"#2A3779"}
                        mode="outlined"
                        labelStyle={{fontSize: 18}}>
                        Log in
                    </Button>
                    <View style={styles.bottomView}>
                        <Image source={LoginLogo} style={styles.loginLogo}/>
                        <Text style={styles.loginFooter}>Don't have an account ?
                            <Text style={styles.loginFooterButton}
                                  onPress={() => {
                                      navigation.navigate('SignUp', {})
                                  }}> Sign up</Text>
                        </Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

