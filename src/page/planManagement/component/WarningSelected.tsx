import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import colors from '../../../constant/color'
import { flexRowCenter } from '../../../styles/flex'
import { IMAGE } from '../../../constant/image'
import { useTranslation } from 'react-i18next'
import { HeightDevice, WidthDevice } from '../../../util/Dimenssion'

const WarningSelected = () => {
  const { t, i18n } = useTranslation();
  return (
    <View style={flexRowCenter}>
      <View style={styles.backgroundWarning}>
        <View style={[flexRowCenter, styles.warning, { flexDirection: 'column' }]}>
          <Image source={IMAGE.HOME.WARNING_ORANGE} />
          <Text style={[styles.textWarning, { marginTop: 20 }]}>{t("planManagement.text.threeItemsSelected")}</Text>
          <Text style={styles.textWarning}>{t("planManagement.text.changeSelected")}</Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  backgroundWarning: {
    position: 'absolute',
    top: HeightDevice / 2 - 105,
    zIndex: 100,
    width: WidthDevice - 40
  },
  warning: {
    backgroundColor: colors.black,
    opacity: 0.7,
    borderRadius: 12,
    padding: 16,

  },
  textWarning: {
    fontWeight: '700',
    fontSize: 16,
    color: colors.white
  }
})
export default WarningSelected