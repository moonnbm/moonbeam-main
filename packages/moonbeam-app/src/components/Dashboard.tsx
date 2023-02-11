import React from 'react';
import {DashboardProps} from '../models/RootProps';
import {BottomBarStackParamList} from '../models/BottomBarProps';
// @ts-ignore
import DashboardTopViewRight from '../../assets/dashboard-top-view-right.png';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Home} from './Home';

/**
 * Dashboard component.
 */
export const Dashboard = ({navigation, route}: DashboardProps) => {

    // create a native bottom navigator, to be used for our bottom bar navigation
    const DashboardTab = createMaterialBottomTabNavigator<BottomBarStackParamList>();

    // return the component for the Dashboard page
    return (
        <NavigationContainer independent={true}>
            <DashboardTab.Navigator
                initialRouteName={"Home"}
                barStyle={{ backgroundColor: '#f2f2f2', height: 70 }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        let iconName:any;

                        if (route.name === 'Home') {
                            iconName = focused ? 'ios-home-sharp' : 'ios-home-outline';
                        } else if (route.name === 'Membership') {
                            iconName = focused ? 'ribbon-sharp' : 'ribbon-outline';
                        } else if (route.name === 'Settings') {
                            iconName = focused ? 'settings-sharp' : 'settings-outline';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={25} color={'#313030'} />;
                    }
                })}
            >
                <DashboardTab.Screen name="Home" component={Home}/>
                <DashboardTab.Screen name="Membership" component={() => {return(<></>)}}/>
                <DashboardTab.Screen name="Settings" component={() => {return(<></>)}}/>
            </DashboardTab.Navigator>
        </NavigationContainer>
    );
};
