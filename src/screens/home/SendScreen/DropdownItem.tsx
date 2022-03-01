import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {Row} from 'components';
import {colors, textStyles} from 'assets';
import {scale} from 'device';

interface Props {
    item: any,
}

const DropdownItem = ({item}: Props) => {
    return (
        <Row.LR px={16} style={styles.dropItem}>
            <Text style={textStyles.Body1}>{item.symbol}</Text>
            <Text
                style={textStyles.Sub1}>{item.balance && item.balance.displayValue ? item.balance.displayValue : ''}</Text>
        </Row.LR>
    );
};

export default DropdownItem;

const styles = StyleSheet.create({
    dropItem: {
        width: scale(343),
        minHeight: scale(48),
        maxHeight: scale(100),
        backgroundColor: colors.N5,
        borderRadius: scale(0),
        borderWidth: 0,
    },
});
