import { Image } from "react-native"

// Ranks to be exported for SignUp component dropdown
export const ranksDropdownItems = [
    {
        label: 'Current/Former Rank',
        value: 'Current/Former Rank',
        icon: () => <Image source={require('../../assets/favicon.png')}/>,
        disabled: true
    },
    {
    label: 'Apple',
        value: 'apple',
    icon: () => <Image source={require('../../assets/favicon.png')}/>,
    parent: 'Current/Former Rank'
    },
    {
    label: 'Banana',
        value: 'banana',
    icon: () => <Image source={require('../../assets/favicon.png')}/>,
    parent: 'Current/Former Rank'
    }
];

// Duty Stations to be exported for SignUp component dropdown
export const dutyStationDropdownItems = [
    {
        label: 'Current/Former Duty Station',
        value: 'Current/Former Duty Station',
        icon: () => <Image source={require('../../assets/favicon.png')}/>,
        disabled: true
    },
    {
        label: 'Apple',
        value: 'apple',
        icon: () => <Image source={require('../../assets/favicon.png')}/>,
        parent: 'Current/Former Duty Station'
    },
    {
        label: 'Banana',
        value: 'banana',
        icon: () => <Image source={require('../../assets/favicon.png')}/>,
        parent: 'Current/Former Duty Station'
    }
];

// Duty options to be exported for SignUp component dropdown
export const dutyDropdownItems = [
    {
        label: 'Duty Status',
        value: 'Duty Status',
        icon: () => <Image source={require('../../assets/favicon.png')}/>,
        disabled: true
    },
    {
        label: 'Active',
        value: 'Active',
        icon: () => <Image source={require('../../assets/favicon.png')}/>,
        parent: 'Duty Status'
    },
    {
        label: 'Inactive',
        value: 'Inactive',
        icon: () => <Image source={require('../../assets/favicon.png')}/>,
        parent: 'Duty Status'
    }
]
