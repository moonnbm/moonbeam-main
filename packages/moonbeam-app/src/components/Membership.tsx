import {Avatar} from '@rneui/base';
import React from 'react';
import {Dimensions, Image, ImageBackground, SafeAreaView, ScrollView, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {MemerbshipTabProps} from '../models/BottomBarProps';
import {commonStyles} from '../styles/common.module';
import {styles} from '../styles/membership.module';
// @ts-ignore
import PointsLogo from '../../assets/points.png';
// @ts-ignore
import WelcomeOffer from '../../assets/welcome-offer.png';
// @ts-ignore
import FriendReferral from '../../assets/refer-friend.png';
import {Button, Card, Divider, Text} from 'react-native-paper';

/**
 * Membership component.
 */
export const Membership = ({navigation, route}: MemerbshipTabProps) => {
    // state driven key-value pairs for UI related elements

    // state driven key-value pairs for any specific data values

    return (
        <SafeAreaView style={[commonStyles.rowContainer, commonStyles.androidSafeArea]}>
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                scrollEnabled={true}>
                <View style={styles.topBarView}>
                    <ImageBackground
                        imageStyle={{
                            resizeMode: 'contain',
                            opacity: 0.6,
                            alignSelf: 'center'
                        }}
                        source={require('../../assets/top-bar-background.png')}>
                        <View style={styles.insideBarView}>
                            <View style={{width: Dimensions.get('window').width / 3}}></View>
                            <View style={styles.dashboardColumnItemMiddle}>
                                <Text style={styles.dashboardColumnItemMiddleText}>
                                    Membership
                                </Text>
                            </View>
                            <View style={styles.dashboardColumnItemLast}></View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.membershipContentView}>
                    <Card style={[styles.cardStyle, {
                        width: Dimensions.get('window').width / 1.3,
                        height: Dimensions.get('window').height / 3.7
                    }]} mode={'elevated'} elevation={5}>
                        <Card.Title title="Membership Rewards ®" subtitle="Alpha Card (••••8762)"
                                    titleStyle={styles.cardTitleStyle} subtitleStyle={styles.cardSubtitleStyle}/>
                        <Card.Content>
                            <Text variant="titleLarge" style={styles.cardBodyTitle}>Points earned </Text>
                            <View style={{flexDirection: 'column'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Image source={PointsLogo} style={[styles.pointsLogo, {
                                        height: Dimensions.get('window').height / 25,
                                        width: Dimensions.get('window').width / 15
                                    }]}/>
                                    <Text variant="bodyMedium"
                                          style={[styles.cardBodyPointsContent, {fontSize: Dimensions.get('window').height / 30}]}>10,
                                        500</Text>
                                </View>
                                <Divider
                                    style={[commonStyles.divider, {
                                        marginTop: '5%',
                                        width: Dimensions.get('window').width / 1.4
                                    }]}/>
                                <Button
                                    onPress={() => {
                                    }}
                                    style={[styles.redeemButton, {
                                        height: Dimensions.get('window').height / 20,
                                        width: Dimensions.get('window').width / 3
                                    }]}
                                    textColor={"#f2f2f2"}
                                    buttonColor={"#2A3779"}
                                    mode="outlined"
                                    labelStyle={{fontSize: Dimensions.get('window').height / 50}}>
                                    Redeem
                                </Button>
                            </View>
                        </Card.Content>
                    </Card>

                    <Divider
                        style={[commonStyles.divider, {marginTop: '10%', width: Dimensions.get('window').width / 2}]}/>

                    <Text style={[styles.rewardOffersTitle, {fontSize: Dimensions.get('window').width / 15}]}>Current
                        Reward Offers</Text>
                    <ScrollView style={{height: Dimensions.get('window').height/2}} horizontal={true} scrollEnabled={true}
                                persistentScrollbar={false} showsHorizontalScrollIndicator={false}>
                        <Card style={[styles.cardStyleOffers, {
                            width: Dimensions.get('window').width / 1.8,
                            height: Dimensions.get('window').height / 2.7
                        }]} mode={'elevated'} elevation={5}>
                            <Card.Title title="Welcome Offer" subtitle="New Alpha Member Offer."
                                        titleStyle={styles.cardTitleStyle} subtitleStyle={styles.cardSubtitleStyle}
                                        subtitleNumberOfLines={2}/>
                            <Card.Content>
                                <View style={{flexDirection: 'row'}}>
                                    <Image source={PointsLogo} style={[styles.pointsLogo, {
                                        height: Dimensions.get('window').height / 25,
                                        width: Dimensions.get('window').width / 15
                                    }]}/>
                                    <Text variant="bodyMedium"
                                          style={[styles.cardBodyPointsContent, {fontSize: Dimensions.get('window').height / 30}]}>10,000</Text>
                                    <Text variant="titleLarge" style={styles.pointsTitle}>Points</Text>
                                </View>
                            </Card.Content>
                            <Card.Cover source={WelcomeOffer} style={{alignSelf: 'center', width: Dimensions.get('window').width / 3, height: Dimensions.get('window').height / 7, backgroundColor: 'transparent'}} />
                            <Button
                                disabled={true}
                                onPress={() => {
                                }}
                                style={[styles.redeemButtonOffers, {
                                    height: Dimensions.get('window').height / 20,
                                    width: Dimensions.get('window').width / 3
                                }]}
                                textColor={"#f2f2f2"}
                                buttonColor={"#2A3779"}
                                mode="outlined"
                                labelStyle={{fontSize: Dimensions.get('window').height / 50}}>
                                Redeem
                            </Button>
                        </Card>
                        <View style={{width: 50}}></View>
                        <Card style={[styles.cardStyleOffers, {
                            width: Dimensions.get('window').width / 1.8,
                            height: Dimensions.get('window').height / 2.7
                        }]} mode={'elevated'} elevation={5}>
                            <Card.Title title="Referral Offer" subtitle="Refer to the Alpha program."
                                        titleStyle={styles.cardTitleStyle} subtitleStyle={styles.cardSubtitleStyle}/>
                            <Card.Content>
                                <View style={{flexDirection: 'row'}}>
                                    <Image source={PointsLogo} style={[styles.pointsLogo, {
                                        height: Dimensions.get('window').height / 25,
                                        width: Dimensions.get('window').width / 15
                                    }]}/>
                                    <Text variant="bodyMedium"
                                          style={[styles.cardBodyPointsContent, {fontSize: Dimensions.get('window').height / 30}]}>10,000</Text>
                                    <Text variant="titleLarge" style={styles.pointsTitle}>Points</Text>
                                </View>
                            </Card.Content>
                            <Card.Cover source={FriendReferral} style={{alignSelf: 'center', width: Dimensions.get('window').width / 3, height: Dimensions.get('window').height / 7, backgroundColor: 'transparent'}} />
                            <Button
                                disabled={false}
                                onPress={() => {
                                }}
                                style={[styles.redeemButtonOffers, {
                                    height: Dimensions.get('window').height / 20,
                                    width: Dimensions.get('window').width / 3
                                }]}
                                textColor={"#f2f2f2"}
                                buttonColor={"#2A3779"}
                                mode="outlined"
                                labelStyle={{fontSize: Dimensions.get('window').height / 50}}>
                                Redeem
                            </Button>
                        </Card>
                    </ScrollView>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}
