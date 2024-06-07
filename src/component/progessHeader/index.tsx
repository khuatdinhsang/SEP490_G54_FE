import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import colors from '../../constant/color';
interface ProgressHeaderComponentProps {
    style?: StyleProp<ViewStyle>;
    index: number[],
    length: number
}
const ProgressHeader: React.FC<ProgressHeaderComponentProps> = ({ index, style, length }) => {
    return (
        <View style={[styles.navigate, style]}>
            {Array.from({ length }).map((_, i) => (
                <View
                    key={i}
                    style={{
                        width: '20%',
                        backgroundColor:
                            index.includes(i) ? colors.primary : colors.gray,
                        height: 3,
                    }}
                />
            ))}
        </View>
    )
}
const styles = StyleSheet.create({
    navigate: {
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
})

export default ProgressHeader