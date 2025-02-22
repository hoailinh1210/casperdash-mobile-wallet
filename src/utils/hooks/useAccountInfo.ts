import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { getAccountInfo, getListAccountInfo } from 'services/User/userApis';
import { IAccountResponse, IDisplayCSPRBalance } from 'services/User/userTypes';
import { ERequestKeys } from 'utils/constants/requestKeys';
import { toCSPRFromHex } from 'utils/helpers/currency';
import { toastError } from 'utils/helpers/errorHandler';

export const massageUserDetails = (userDetails: IAccountResponse): IAccountInfo => {
  const hexBalance = userDetails?.balance?.hex ?? 0;
  return {
    ...userDetails,
    balance: {
      ...userDetails.balance,
      displayBalance: toCSPRFromHex(hexBalance).toNumber(),
    },
  };
};

export interface IAccountInfo extends IAccountResponse {
  balance?: IDisplayCSPRBalance;
}

export const useAccountInfo = (publicKey: string) => {
  const query = useQuery({
    queryKey: [ERequestKeys.accountInfo, publicKey],
    queryFn: () => getAccountInfo(publicKey),
    enabled: !!publicKey,
    onError: (error: any) => {
      toastError(error?.response?.data?.message);
    },
  });

  const massagedData = useMemo(() => {
    if (query.data) {
      return massageUserDetails(query.data);
    }
    return undefined;
  }, [query.data]);

  return { ...query, massagedData };
};

export const useListAccountInfo = (publicKeys: string[], keepPreviousData?: boolean) => {
  const query = useQuery({
    queryKey: [ERequestKeys.listAccountInfo, publicKeys],
    queryFn: () => getListAccountInfo(publicKeys),
    enabled: !!publicKeys && publicKeys.length > 0,
    keepPreviousData: keepPreviousData,
    onError: (error: any) => {
      toastError(error?.response?.data?.message);
    },
  });

  const massagedData = useMemo(() => {
    if (query.data) {
      return query.data.map((userDetails: IAccountResponse) => massageUserDetails(userDetails));
    }
    return [];
  }, [query.data]);

  return { ...query, massagedData };
};
