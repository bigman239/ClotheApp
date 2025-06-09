import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Modal, FlatList } from 'react-native';
import { COLORS, SPACING } from '@/constants/theme';

interface ColorSelectorProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
}

// Predefined color palette
const colorPalette = [
  '#FFFFFF', '#F5F5F5', '#EEEEEE', '#E0E0E0', '#BDBDBD',
  '#9E9E9E', '#757575', '#616161', '#424242', '#212121',
  '#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9', '#C5CAE9',
  '#BBDEFB', '#B3E5FC', '#B2EBF2', '#B2DFDB', '#C8E6C9',
  '#DCEDC8', '#F0F4C3', '#FFF9C4', '#FFECB3', '#FFE0B2',
  '#FFCCBC', '#D7CCC8', '#F5F5F5', '#CFD8DC', '#B0BEC5',
  '#EF9A9A', '#F48FB1', '#CE93D8', '#B39DDB', '#9FA8DA',
  '#90CAF9', '#81D4FA', '#80DEEA', '#80CBC4', '#A5D6A7',
  '#C5E1A5', '#E6EE9C', '#FFF59D', '#FFE082', '#FFCC80',
  '#FFAB91', '#BCAAA4', '#EEEEEE', '#B6B6B6', '#90A4AE',
  '#E57373', '#F06292', '#BA68C8', '#9575CD', '#7986CB',
  '#64B5F6', '#4FC3F7', '#4DD0E1', '#4DB6AC', '#81C784',
  '#AED581', '#DCE775', '#FFF176', '#FFD54F', '#FFB74D',
  '#FF8A65', '#A1887F', '#E0E0E0', '#E0E0E0', '#78909C',
  '#EF5350', '#EC407A', '#AB47BC', '#7E57C2', '#5C6BC0',
  '#42A5F5', '#29B6F6', '#26C6DA', '#26A69A', '#66BB6A',
  '#9CCC65', '#D4E157', '#FFEE58', '#FFCA28', '#FFA726',
  '#FF7043', '#8D6E63', '#BDBDBD', '#BDBDBD', '#607D8B',
  '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
  '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
  '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
  '#FF5722', '#795548', '#9E9E9E', '#9E9E9E', '#455A64',
  '#D32F2F', '#C2185B', '#7B1FA2', '#512DA8', '#303F9F',
  '#1976D2', '#0288D1', '#0097A7', '#00796B', '#388E3C',
  '#689F38', '#AFB42B', '#FBC02D', '#FFA000', '#F57C00',
  '#E64A19', '#5D4037', '#757575', '#757575', '#37474F',
  '#B71C1C', '#880E4F', '#4A148C', '#311B92', '#1A237E',
  '#0D47A1', '#01579B', '#006064', '#004D40', '#1B5E20',
  '#33691E', '#827717', '#F57F17', '#FF6F00', '#E65100',
  '#BF360C', '#3E2723', '#424242', '#424242', '#263238',
];

export default function ColorSelector({ selectedColor, onSelectColor }: ColorSelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const renderColorItem = ({ item }: { item: string }) => (
    <Pressable
      style={[
        styles.colorItem,
        { backgroundColor: item },
        item === selectedColor && styles.selectedColorItem,
      ]}
      onPress={() => {
        onSelectColor(item);
        setModalVisible(false);
      }}
    />
  );

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.colorPreview, { backgroundColor: selectedColor }]}
        onPress={() => setModalVisible(true)}
      />
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={colorPalette}
              renderItem={renderColorItem}
              keyExtractor={(item) => item}
              numColumns={5}
              contentContainerStyle={styles.colorGrid}
            />
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: SPACING.small,
  },
  colorPreview: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.medium,
    maxHeight: '70%',
  },
  colorGrid: {
    paddingVertical: SPACING.small,
  },
  colorItem: {
    width: 50,
    height: 50,
    margin: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  selectedColorItem: {
    borderWidth: 3,
    borderColor: COLORS.darkBlue,
  },
  closeButton: {
    alignSelf: 'center',
    marginTop: SPACING.medium,
    width: 40,
    height: 5,
    backgroundColor: COLORS.darkGray,
    borderRadius: 5,
  },
});