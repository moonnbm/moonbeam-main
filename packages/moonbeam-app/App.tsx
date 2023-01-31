import React, {useCallback, useEffect, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {ImageBackground, SafeAreaView} from 'react-native';
import SignInComponent from './src/components/SignIn'
import styles from './src/styles/main.module'
import * as Font from 'expo-font';
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from './src/utils/Theme';

// keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

/**
 * Main application entrypoint.
 */
export default function App() {
    // state used to keep track of whether the appplication is ready to load or not
    const [appIsReady, setAppIsReady] = useState(false);

    /**
     * Entrypoint UseEffect will be used as a block of code where we perform specific tasks (such as
     * auth-related functionality for example), as well as any afferent API calls.
     *
     * Generally speaking, any functionality imperative prior to the full page-load should be
     * included in here.
     */
    useEffect(() => {
        const prepare = async () => {
            try {
                // pre-load fonts, make any API calls that we need in here
                // pre-loading all Raleway fonts
                await Font.loadAsync({
                    'Raleway-Black': require('assets/fonts/static/Raleway-Black.ttf'),
                    'Raleway-BlackItalic': require('assets/fonts/static/Raleway-BlackItalic.ttf'),
                    'Raleway-Bold': require('assets/fonts/static/Raleway-Bold.ttf'),
                    'Raleway-BoldItalic': require('assets/fonts/static/Raleway-BoldItalic.ttf'),
                    'Raleway-ExtraBold': require('assets/fonts/static/Raleway-ExtraBold.ttf'),
                    'Raleway-ExtraBoldItalic': require('assets/fonts/static/Raleway-ExtraBoldItalic.ttf'),
                    'Raleway-ExtraLight': require('assets/fonts/static/Raleway-ExtraLight.ttf'),
                    'Raleway-ExtraLightItalic': require('assets/fonts/static/Raleway-ExtraLightItalic.ttf'),
                    'Raleway-Italic': require('assets/fonts/static/Raleway-Italic.ttf'),
                    'Raleway-Light': require('assets/fonts/static/Raleway-Light.ttf'),
                    'Raleway-LightItalic': require('assets/fonts/static/Raleway-LightItalic.ttf'),
                    'Raleway-Medium': require('assets/fonts/static/Raleway-Medium.ttf'),
                    'Raleway-MediumItalic': require('assets/fonts/static/Raleway-MediumItalic.ttf'),
                    'Raleway-Regular': require('assets/fonts/static/Raleway-Regular.ttf'),
                    'Raleway-SemiBold': require('assets/fonts/static/Raleway-SemiBold.ttf'),
                    'Raleway-SemiBoldItalic': require('assets/fonts/static/Raleway-SemiBoldItalic.ttf'),
                    'Raleway-Thin': require('assets/fonts/static/Raleway-Thin.ttf'),
                    'Raleway-ThinItalic': require('assets/fonts/static/Raleway-ThinItalic.ttf')
                });
            } catch (e) {
                console.warn(e);
            } finally {
                // tell the application to render
                setAppIsReady(true);
            }
        }
        prepare();
    }, []);

    /**
     *
     */
    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            // Artificially delay for 1 seconds to simulate loading experience.
            await new Promise(resolve => setTimeout(resolve, 1000));
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    } else {
        // return the component for the application
        return (
            <PaperProvider theme={theme}>
                <ImageBackground
                    style={styles.image}
                    source={require('./assets/app-background.png')}>
                    <SafeAreaView
                        onLayout={onLayoutRootView}
                        style={styles.container}>
                        <SignInComponent>
                        </SignInComponent>
                    </SafeAreaView>
                </ImageBackground>
            </PaperProvider>
        );
    }
}

