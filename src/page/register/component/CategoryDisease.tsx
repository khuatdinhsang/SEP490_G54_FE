import { StyleSheet, Text, View } from "react-native";
import { flexRow } from "../../../styles/flex";
import colors from "../../../constant/color";
import ItemDisease from "./ItemDisease";
type SectionType = {
    title: string;
    data: {
        id: number,
        name: string
    }[]
}
type ItemType = {
    id: number;
    name: string;
};
type CategoryDiseaseProps = {
    section: SectionType;
    handleSelectItem: (id: number) => void;
    selectedItems: number[];
};

const CategoryDisease: React.FC<CategoryDiseaseProps> = ({
    section,
    handleSelectItem,
    selectedItems,
}) => {
    return (
        <View style={{ marginBottom: 15 }} >
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={[flexRow, { flexWrap: 'wrap' }]}>
                {section.data && section.data.map((item: ItemType) => {
                    const isSelected = selectedItems.includes(item.id);
                    return (<ItemDisease item={item} key={item.id} isSelected={isSelected} handleSelectItem={handleSelectItem} />)
                })}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.black,
    },
})
export default CategoryDisease;

