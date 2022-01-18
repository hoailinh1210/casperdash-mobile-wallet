import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {ScreenProps} from 'navigation/ScreenProps';
import CreateNewWalletRouter from 'navigation/CreateNewWalletNavigation/CreateNewWalletRouter';
import _ from 'lodash';
import {CLayout, CHeader} from 'components';
import {scale} from 'device';
import CButton2 from 'components/CTextButton';
import {useNavigation} from '@react-navigation/native';
import {CheckItem} from 'screens/authentication/create_new_wallet/components';
import {StackNavigationProp} from '@react-navigation/stack';
import {getArrayNotInArray} from 'utils/collections';

// @ts-ignore
const DoubleCheckItScreen: React.FC<ScreenProps<CreateNewWalletRouter.DOUBLE_CHECK_IT_SCREEN>> = ({route}) => {
    const [listData, setListData] = useState<any>([]);
    const [listDataSelected, setListDataSelected] = useState<any>([]);
    const numberOfWords = Math.floor(route.params.data.length / 3);
    const {navigate} = useNavigation<StackNavigationProp<any>>();

    useEffect(() => {
        const {data} = route.params;
        const randomList = _.sampleSize(data, numberOfWords);
        let restList = getArrayNotInArray(data, randomList);
        restList = _.shuffle(restList);

        const list = randomList.map((item) => {
            let listWords = [{...item, isKey: true}];
            const randomWords = _.sampleSize(restList, 2);
            restList = getArrayNotInArray(restList, randomWords);
            listWords = listWords.concat(randomWords);
            listWords = _.shuffle(listWords);
            return listWords;
        });
        setListData(list);
    }, [numberOfWords, route.params]);

    const onSelectWords = (rowIndex: number, id: any) => {
        if (listData && listData[rowIndex]) {
            const listDataSelectedTemp = [...listDataSelected];
            const listDataTemp = listData.map((row: any, rowIdx: number) => {
                if (rowIdx === rowIndex) {
                    return row.map((item: any) => {
                        const isSelected = item.id === id;
                        item.isSelected = isSelected;
                        if (isSelected) {
                            listDataSelectedTemp[rowIndex] = item.isKey ? item.word : null;
                        }
                        return item;
                    });
                }
                return row;
            });
            setListDataSelected(listDataSelectedTemp);
            setListData(listDataTemp);
        }
    };

    const openChoosePin = () => {
        navigate(CreateNewWalletRouter.CHOOSE_PIN_SCREEN);
    };

    return (
        <CLayout>
            <CHeader title={'Let\'s double check it'}/>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingVertical: scale(20)}}>
                {
                    listData && listData.length > 0 && listData.map((row: any, rowIdx: number) => {
                        const keyWords = row.find((i: any) => i.isKey);
                        return <CheckItem
                            data={row}
                            keyWords={keyWords}
                            key={rowIdx}
                            onPress={onSelectWords}
                            rowIndex={rowIdx}/>;
                    })
                }
            </ScrollView>
            <CButton2
                onPress={openChoosePin}
                style={styles.btnNext}
                disabled={listDataSelected.filter((i: any) => !!i).length !== numberOfWords}
                text={'Next'}
            />
        </CLayout>
    );
};

export default DoubleCheckItScreen;

const styles = StyleSheet.create({
    btnNext: {
        alignSelf: 'center',
        marginVertical: scale(20),
    },
});