import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import styles from '../styles/signin.module';
// @ts-ignore
import LoginLogo from '../../assets/login-logo.png';

/**
 * Sign In component.
 */
const SignInComponent = (props: any) => {
    console.log(props);

    // state driven key-value pairs
    const [nameFocus, setIsNameFocus] = useState<boolean>(false);
    const [passwordFocus, setIsPasswordFocus] = useState<boolean>(false);
    const [signUpPressed, setIsSignUpPressed] = useState<boolean>(false);

    /**
     * Entrypoint UseEffect will be used as a block of code where we perform specific tasks (such as
     * auth-related functionality for example), as well as any afferent API calls.
     *
     * Generally speaking, any functionality imperative prior to the full page-load should be
     * included in here.
     */
    useEffect(() => {

    }, [])

    // return the component for the application
    return (
        <View>
            <Text style={styles.loginTitle}>Login</Text>
            <Text style={styles.loginSubtitle}>Please sign in to continue</Text>
            <View style={styles.container}>
                <TextInput
                    style={nameFocus ? styles.textInputFocus : styles.textInput}
                    onFocus={() => {
                        setIsNameFocus(true);
                    }}
                    label="Username"
                    textColor={"#F2FF5D"}
                    underlineColor={"#F2FF5D"}
                    activeUnderlineColor={"#F2FF5D"}
                />
                <TextInput
                    style={passwordFocus ? styles.textInputFocus : styles.textInput}
                    onFocus={() => {
                        setIsPasswordFocus(true);
                    }}
                    label="Password"
                    secureTextEntry
                    right={<TextInput.Icon icon="eye"/>}
                    textColor={"#F2FF5D"}
                    underlineColor={"#F2FF5D"}
                    activeUnderlineColor={"#F2FF5D"}
                />
                <Button style={styles.signInFooterButon} textColor={"#313030"} buttonColor={"#F2FF5D"} mode="contained" onPress={() => console.log('Pressed')}>
                    Log in
                </Button>
                <Image source={LoginLogo} style={styles.loginLogo}/>
                <Text style={styles.loginFooter}>Don't have an account ?
                    <Text style={signUpPressed ? styles.loginFooterButtonPressed : styles.loginFooterButton}
                          onPress={() => setIsSignUpPressed(true)}> Sign up</Text>
                </Text>
            </View>
        </View>
    );
};

export default SignInComponent;

