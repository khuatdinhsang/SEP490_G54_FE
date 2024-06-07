import { Image, Pressable, Text, View } from "react-native";
import { flexRow } from "../../../styles/flex";
import colors from "../../../constant/color";
import { IMAGE } from "../../../constant/image";

type ItemType = {
    id: number;
    name: string;
};
const ItemDisease = ({ item, isSelected, handleSelectItem }: { item: ItemType, isSelected: boolean, handleSelectItem: Function }) => {
    return (
        <View style={{ marginRight: 10, marginBottom: 5 }} >
            <Pressable onPress={() => handleSelectItem(item.id)}>
                <View style={{ paddingVertical: 7, paddingHorizontal: 18, borderWidth: 1, borderColor: isSelected ? colors.primary : colors.gray, borderRadius: 99 }}>
                    <View style={flexRow}>
                        {isSelected && <Image style={{ tintColor: colors.primary }} source={IMAGE.ICON_CHECK} />}
                        <Text style={{ marginLeft: isSelected ? 10 : 0, color: isSelected ? colors.primary : colors.black }}>{item.name}</Text>
                    </View>
                </View>
            </Pressable >
        </View >
    );
}
export default ItemDisease;