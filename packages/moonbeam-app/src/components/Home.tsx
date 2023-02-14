import {Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {HomeTabProps} from '../models/BottomBarProps';
import {styles} from "../styles/home.module";
// @ts-ignore
import DashboardTopViewRight from '../../assets/dashboard-top-view-right.png';
import React, {useState} from 'react';
// @ts-ignore
import HomeDashboardLogo from '../../assets/login-logo.png';
import {Divider, IconButton, List, SegmentedButtons} from 'react-native-paper';
import * as Progress from 'react-native-progress';
import {Avatar} from '@rneui/themed';
import {commonStyles} from '../styles/common.module';

/**
 * Home component.
 */
export const Home = ({navigation, route}: HomeTabProps) => {
    // state driven key-value pairs for UI related elements
    const [segmentedValue, setSegmentedValue] = useState<string>('transactions');

    // state driven key-value pairs for any specific data values

    return (
        <SafeAreaView style={commonStyles.rowContainer}>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                scrollEnabled={true}
                persistentScrollbar={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.topBarView}>
                    <ImageBackground
                        style={commonStyles.image}
                        imageStyle={{
                            resizeMode: 'stretch',
                            opacity: 0.6
                        }}
                        source={require('../../assets/home-top-bar-background.png')}>
                        <View style={styles.insideBarView}>
                            <View style={styles.dashboardColumnItemFirst}>
                                <Avatar
                                    size={38}
                                    rounded
                                    title="MA"
                                    containerStyle={{backgroundColor: 'grey'}}
                                >
                                    <Avatar.Accessory onPress={() => console.log("PRESSSEd")} size={12}/>
                                </Avatar>
                            </View>
                            <View style={styles.dashboardColumnItemMiddle}>
                                <Progress.Circle
                                    size={Dimensions.get('window').width / 1.75}
                                    strokeCap={"butt"}
                                    thickness={Dimensions.get('window').width / 40}
                                    progress={0.5}
                                    color={"#2A3779"}
                                    showsText={true}
                                    formatText={() => {
                                        return (
                                            <View>
                                                <View style={styles.dahboardBalanceTopView}>
                                                    <Text style={styles.balanceDashboardTitle}>Balance</Text>
                                                    <Text style={styles.balanceDashboardBalanceTotal}>$2500</Text>
                                                </View>
                                                <View>
                                                    <Image source={HomeDashboardLogo} style={styles.homeDashboardLogo}/>
                                                </View>
                                                <View>
                                                    <Text style={styles.balanceDashboardBalanceAvailable}>$2500 <Text
                                                        style={styles.balanceDashboardBalanceAvailableText}>Available</Text></Text>
                                                </View>
                                            </View>
                                        )
                                    }}
                                />
                            </View>
                            <View style={styles.dashboardColumnItemLast}>
                                <IconButton
                                    icon="bell"
                                    iconColor={"#A2B000"}
                                    size={30}
                                    onPress={() => console.log('Notifications Pressed')}
                                />
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={[styles.dashboardButtonView, {marginTop: Dimensions.get('window').width / 1.47}]}>
                    <View style={styles.dashboardButtonLeft}>
                        <IconButton
                            mode={'contained-tonal'}
                            containerColor={'#DDDDDD'}
                            icon="credit-card"
                            iconColor={'#A2B000'}
                            size={40}
                            onPress={() => console.log('Pressed')}
                        />
                        <Text style={styles.dashboardButtonText}>Pay</Text>
                    </View>
                    {/*divider for buttons, spacing them out*/}
                    <View style={{width: 50}}></View>
                    <View style={styles.dashboardButtonRight}>
                        <IconButton
                            mode={'contained-tonal'}
                            containerColor={'#DDDDDD'}
                            icon="account-cash"
                            iconColor={'#A2B000'}
                            size={40}
                            onPress={() => console.log('Pressed')}
                        />
                        <Text style={styles.dashboardButtonText}>Refer</Text>
                    </View>
                </View>
                <View style={{marginTop: Dimensions.get('window').height / 12}}>
                    <SegmentedButtons
                        density={'small'}
                        style={[styles.segmentedButtons]}
                        value={segmentedValue}
                        onValueChange={(value) => {
                            setSegmentedValue(value);
                        }}
                        theme={{colors: {primary: '#313030'}}}
                        buttons={[
                            {
                                value: 'transactions',
                                label: 'Transactions',
                                style: {
                                    backgroundColor: segmentedValue === 'transactions' ? '#A2B000' : '#f2f2f2',
                                    borderColor: segmentedValue === 'transactions' ? '#A2B000' : '#313030'
                                }
                            },
                            {
                                value: 'payments',
                                label: 'Payments',
                                style: {
                                    backgroundColor: segmentedValue === 'payments' ? '#A2B000' : '#f2f2f2',
                                    borderColor: segmentedValue === 'payments' ? '#A2B000' : '#313030'
                                }
                            }
                        ]}
                    />
                    <ScrollView scrollEnabled={true}
                                persistentScrollbar={false}
                                showsHorizontalScrollIndicator={false}>
                        {segmentedValue === 'transactions' ?
                            <List.Section>
                                <List.Subheader style={styles.subHeaderTitle}>
                                    Recent Transactions
                                </List.Subheader>
                                <Divider style={[commonStyles.divider, {width: Dimensions.get('window').width}]}/>
                                <List.Item
                                    titleStyle={styles.dashboardItemTitle}
                                    descriptionStyle={styles.dashboardItemDescription}
                                    titleNumberOfLines={2}
                                    descriptionNumberOfLines={2}
                                    title="Oakley"
                                    description='Phoenix, AZ - 8m ago'
                                    left={() => <List.Icon color={'#2A3779'} icon="store"/>}
                                    right={() =>
                                        <View style={styles.topListItemRightView}>
                                            <View style={styles.topPriceView}>
                                                <Text style={styles.listItemPrice}>$295.50</Text>
                                                <Text style={styles.listItemDiscount}>3X | 25%</Text>
                                            </View>
                                            <View style={styles.listItemIcon}>
                                                <List.Icon color={'#2A3779'} icon="chevron-right"/>
                                            </View>
                                        </View>
                                    }
                                />
                                <Divider style={[commonStyles.divider, {width: Dimensions.get('window').width}]}/>
                                <List.Item
                                    titleStyle={styles.dashboardItemTitle}
                                    descriptionStyle={styles.dashboardItemDescription}
                                    titleNumberOfLines={2}
                                    descriptionNumberOfLines={2}
                                    title="Oakley"
                                    description='Phoenix, AZ - 8m ago'
                                    left={() => <List.Icon color={'#2A3779'} icon="store"/>}
                                    right={() =>
                                        <View style={styles.topListItemRightView}>
                                            <View style={styles.topPriceView}>
                                                <Text style={styles.listItemPrice}>$295.50</Text>
                                                <Text style={styles.listItemDiscount}>3X | 25%</Text>
                                            </View>
                                            <View style={styles.listItemIcon}>
                                                <List.Icon color={'#2A3779'} icon="chevron-right"/>
                                            </View>
                                        </View>
                                    }
                                />
                                <Divider style={[commonStyles.divider, {width: Dimensions.get('window').width}]}/>
                                <List.Item
                                    titleStyle={styles.dashboardItemTitle}
                                    descriptionStyle={styles.dashboardItemDescription}
                                    titleNumberOfLines={2}
                                    descriptionNumberOfLines={2}
                                    title="Oakley"
                                    description='Phoenix, AZ - 8m ago'
                                    left={() => <List.Icon color={'#2A3779'} icon="store"/>}
                                    right={() =>
                                        <View style={styles.topListItemRightView}>
                                            <View style={styles.topPriceView}>
                                                <Text style={styles.listItemPrice}>$295.50</Text>
                                                <Text style={styles.listItemDiscount}>3X | 25%</Text>
                                            </View>
                                            <View style={styles.listItemIcon}>
                                                <List.Icon color={'#2A3779'} icon="chevron-right"/>
                                            </View>
                                        </View>
                                    }
                                />
                                <Divider style={[commonStyles.divider, {width: Dimensions.get('window').width}]}/>
                                <List.Item
                                    titleStyle={styles.dashboardItemTitle}
                                    descriptionStyle={styles.dashboardItemDescription}
                                    titleNumberOfLines={2}
                                    descriptionNumberOfLines={2}
                                    title="Oakley"
                                    description='Phoenix, AZ - 8m ago'
                                    left={() => <List.Icon color={'#2A3779'} icon="store"/>}
                                    right={() =>
                                        <View style={styles.topListItemRightView}>
                                            <View style={styles.topPriceView}>
                                                <Text style={styles.listItemPrice}>$295.50</Text>
                                                <Text style={styles.listItemDiscount}>3X | 25%</Text>
                                            </View>
                                            <View style={styles.listItemIcon}>
                                                <List.Icon color={'#2A3779'} icon="chevron-right"/>
                                            </View>
                                        </View>
                                    }
                                />
                                <Divider style={[commonStyles.divider, {width: Dimensions.get('window').width}]}/>
                            </List.Section>
                            : <List.Section>
                                <List.Subheader style={styles.subHeaderTitle}>
                                    Recent Payments
                                </List.Subheader>
                                <Divider style={[commonStyles.divider, {width: Dimensions.get('window').width}]}/>
                                <List.Item
                                    titleStyle={styles.dashboardItemTitle}
                                    descriptionStyle={styles.dashboardItemDescription}
                                    titleNumberOfLines={2}
                                    descriptionNumberOfLines={2}
                                    title="AutoPay"
                                    description='Bank of America ****2975 - 02/10/2023'
                                    left={() => <List.Icon color={'#2A3779'} icon="cash"/>}
                                    right={() =>
                                        <View style={styles.topPaymentView}>
                                            <Text style={styles.listItemPaymentAmount}>$500.00</Text>
                                            <List.Icon color={'#2A3779'} icon="chevron-right"/>
                                        </View>
                                    }
                                />
                                <Divider style={[commonStyles.divider, {width: Dimensions.get('window').width}]}/>
                                <List.Item
                                    titleStyle={styles.dashboardItemTitle}
                                    descriptionStyle={styles.dashboardItemDescription}
                                    titleNumberOfLines={2}
                                    descriptionNumberOfLines={2}
                                    title="AutoPay"
                                    description='Wells Fargo ****5133 - 01/10/2023'
                                    left={() => <List.Icon color={'#2A3779'} icon="cash"/>}
                                    right={() =>
                                        <View style={styles.topPaymentView}>
                                            <Text style={styles.listItemPaymentAmount}>$500.00</Text>
                                            <List.Icon color={'#2A3779'} icon="chevron-right"/>
                                        </View>
                                    }
                                />
                                <Divider style={[commonStyles.divider, {width: Dimensions.get('window').width}]}/>
                                <List.Item
                                    titleStyle={styles.dashboardItemTitle}
                                    descriptionStyle={styles.dashboardItemDescription}
                                    titleNumberOfLines={2}
                                    descriptionNumberOfLines={2}
                                    title="Regular Payment"
                                    description='Bank of America ****2975 - 01/05/2023'
                                    left={() => <List.Icon color={'#2A3779'} icon="cash"/>}
                                    right={() =>
                                        <View style={styles.topPaymentView}>
                                            <Text style={styles.listItemPaymentAmount}>$150.00</Text>
                                            <List.Icon color={'#2A3779'} icon="chevron-right"/>
                                        </View>
                                    }
                                />
                                <Divider style={[commonStyles.divider, {width: Dimensions.get('window').width}]}/>
                                <List.Item
                                    titleStyle={styles.dashboardItemTitle}
                                    descriptionStyle={styles.dashboardItemDescription}
                                    titleNumberOfLines={2}
                                    descriptionNumberOfLines={2}
                                    title="AutoPay"
                                    description='Bank of America ****2975 - 12/10/2023'
                                    left={() => <List.Icon color={'#2A3779'} icon="cash"/>}
                                    right={() =>
                                        <View style={styles.topPaymentView}>
                                            <Text style={styles.listItemPaymentAmount}>$500.00</Text>
                                            <List.Icon color={'#2A3779'} icon="chevron-right"/>
                                        </View>
                                    }
                                />
                                <Divider style={[commonStyles.divider, {width: Dimensions.get('window').width}]}/>
                            </List.Section>}
                    </ScrollView>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

