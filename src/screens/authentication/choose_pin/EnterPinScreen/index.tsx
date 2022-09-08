import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { CHeader, CLayout, Col } from 'components';
import { colors, fonts, textStyles } from 'assets';
import { scale } from 'device';
// @ts-ignore
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Config, Keys } from 'utils';
import { allActions } from 'redux_manager';
import { useDispatch } from 'react-redux';

// @ts-ignore
const EnterPinScreen = () => {
  const dispatch = useDispatch();
  const [pin, setPin] = useState<string>();
  const navigation = useNavigation<StackNavigationProp<any>>();
  const pinLength = 6;
  const [error, setError] = useState<boolean>(false);
  const inputRef = useRef<any>();

  const initState = () => {
    console.info('initState ne');
    dispatch(allActions.main.initState());
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (pin && pin.length === pinLength) {
      Config.getItem(Keys.pinCode).then((savePin: string) => {
        if (savePin !== pin) {
          setError(savePin !== pin);
          return;
        }
        initState();
        navigation.dispatch(
          CommonActions.reset({
            routes: [
              {
                name: 'MainStack',
              },
            ],
          }),
        );
      });
    } else if (error) {
      setError(false);
    }
  }, [pin]);

  return (
    <CLayout>
      <CHeader title={'Enter PIN'} showBack={false} />
      <Col.C mt={78}>
        <Text style={styles.title}>Enter security PIN</Text>
        <SmoothPinCodeInput
          placeholder={<View style={styles.pinPlaceholder} />}
          mask={
            <View
              style={[styles.pinPlaceholder, { backgroundColor: colors.R1 }]}
            />
          }
          maskDelay={500}
          password
          ref={inputRef}
          cellStyle={null}
          keyboardType={'number-pad'}
          autoFocus
          value={pin}
          codeLength={pinLength}
          cellSpacing={0}
          restrictToNumbers
          cellStyleFocused={null}
          onTextChange={setPin}
          textStyle={styles.textStyle}
        />
        {error && (
          <Text
            style={[styles.title, { color: colors.R1, marginTop: scale(20) }]}>
            Incorrect PIN code
          </Text>
        )}
      </Col.C>
    </CLayout>
  );
};

export default EnterPinScreen;

const styles = StyleSheet.create({
  title: {
    ...textStyles.Body1,
    color: colors.c232635,
    marginBottom: scale(20),
    fontFamily: fonts.Lato.regular,
  },
  pinPlaceholder: {
    width: scale(16),
    height: scale(16),
    borderRadius: scale(8),
    backgroundColor: colors.cFFFFFF,
    borderColor: colors.R1,
    borderWidth: scale(1),
  },
  textStyle: {
    color: colors.N1,
    fontSize: scale(20),
    fontFamily: fonts.Lato.regular,
  },
});
