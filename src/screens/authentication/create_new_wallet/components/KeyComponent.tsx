import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {scale} from "device";
import {Row, Col, CButton} from 'components';
import {colors, images, textStyles} from "assets";
import {toFormattedCurrency} from "utils/helpers/format";
import { getBase64IdentIcon } from 'utils/helpers/identicon';

interface Props {
    value: any,
    onPress: (token: any) => void,
}

const KeyComponent = ({value, onPress}: Props) => {
    return (
        <CButton onPress={() => onPress(value)}>
            <Row.LR mx={16} style={styles.container}>
                <Row>
                    <Image source={{uri: getBase64IdentIcon(value.publicKey)}} style={styles.symbol}/>
                    <Col mx={12}>
                        {/* <Text style={styles.sub1}>{value.publicKey ?? ''}</Text> */}
                        <Text numberOfLines={1}
                                 ellipsizeMode={'middle'}
                                 style={[styles.titleAccount, {maxWidth: scale(100)}]}>
                               {value.publicKey}
                           </Text>
                        <Text style={styles.body2}>Key #{value.keyIndex}</Text>
                    </Col>
                </Row>
                <Col.R mx={12}>
                    <Text style={styles.sub1}>
                        {/* {toFormattedCurrency(value.totalPrice ?? 0, {maximumFractionDigits: 2}, 'en-US')} */}
                        {/* 300 CSPR */}
                    </Text>
                </Col.R>
            </Row.LR>
        </CButton>
    );
};

export default KeyComponent;

const styles = StyleSheet.create({
    container: {
        height: scale(80),
        width: scale(343),
        alignItems: 'center',
        alignSelf: 'center',
        borderBottomWidth: scale(1),
        borderColor: colors.N5,
    },
    symbol: {
        width: scale(40),
        height: scale(40),
    },
    sub1: {
        ...textStyles.Sub1,
    },
    body2: {
        ...textStyles.Body2,
        marginTop: scale(4),
    },
    titleAccount: {
        ...textStyles.Body2,
        marginRight: scale(10),
    },
});
