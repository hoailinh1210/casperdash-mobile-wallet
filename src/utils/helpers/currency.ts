import { BigNumber } from '@ethersproject/bignumber';
import { MOTE_RATE } from '../constants/key';
import Big from 'big.js';

/**
 * Convert CSPR to motes
 * @param {Number|String} amount
 * @returns {BigNumberis|String} Return 0 if it's the invalid big number input.
 * @example
 * toMotes(1) // 1000000000
 * toMotes(0.1) // 100000000
 * toMotes(0.01) // 10000000
 * toMotes(0.001) // 1000000
 * toMotes(0.0001) // 100000
 **/
export const toMotes = (amount: number | string): BigNumber => {
  try {
    // decimal can't convert to BigNumber, should convert to mote by Big.js first
    const bigAmount = new Big(amount).mul(MOTE_RATE).round(0).toNumber();
    return BigNumber.from(bigAmount);
  } catch (error) {
    return BigNumber.from(0);
  }
};

/**
 * Convert motes to CSPR
 * @param {Number|String} amount
 * @returns {BigNumberis|String} Return 0 if it's the invalid big number input.
 * @example
 * toCSPR(1000000000) // 1
 */
export const toCSPR = (amount: number | string): Big => {
  try {
    const bigAmount = new Big(amount).div(MOTE_RATE);
    return bigAmount;
  } catch (error) {
    return new Big(0);
  }
};

export const toCSPRFromHex = (amountHex: string | number): Big => {
  try {
    const bigAmount = BigNumber.from(amountHex);

    return toCSPR(bigAmount.toNumber());
  } catch (error) {
    return new Big(0);
  }
};
