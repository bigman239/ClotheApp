import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';
import { COLORS, SPACING } from '@/constants/theme';
import { ClothingItem } from '@/types/clothing';

interface ClothingCategoryProps {
  title: string;
  items: ClothingItem[];
}

const EmptyCategory = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>No items added yet</Text>
  </View>
);

const ClothingItemComponent = ({ item }: { item: ClothingItem }) => {
  return (
    <Pressable style={styles.itemContainer}>
      {item.imageUri ? (
        <Image source={{ uri: item.imageUri }} style={styles.itemImage} />
      ) : (
        <View style={[styles.itemColorPreview, { backgroundColor: item.colors.primary }]}>
          {/* Render color dots only for colors that exist */}
          <View style={styles.colorRow}>
            <View style={[styles.colorDot, { backgroundColor: item.colors.primary }]} />
            {item.colors.secondary && (
              <View style={[styles.colorDot, { backgroundColor: item.colors.secondary }]} />
            )}
          </View>
          <View style={styles.colorRow}>
            {item.colors.tertiary && (
              <View style={[styles.colorDot, { backgroundColor: item.colors.tertiary }]} />
            )}
            {item.colors.quaternary && (
              <View style={[styles.colorDot, { backgroundColor: item.colors.quaternary }]} />
            )}
          </View>
        </View>
      )}
      <Text style={styles.itemName}>{item.name}</Text>
    </Pressable>
  );
};

export default function ClothingCategory({ title, items }: ClothingCategoryProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>{title}</Text>
      
      {items.length === 0 ? (
        <EmptyCategory />
      ) : (
        <FlatList
          data={items}
          renderItem={({ item }) => <ClothingItemComponent item={item} />}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.large,
  },
  categoryTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: COLORS.darkText,
    marginBottom: SPACING.medium,
    marginHorizontal: SPACING.medium,
  },
  listContainer: {
    paddingHorizontal: SPACING.medium,
  },
  emptyContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.large,
    marginHorizontal: SPACING.medium,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderStyle: 'dashed',
  },
  emptyText: {
    fontFamily: 'Poppins-Regular',
    color: COLORS.darkGray,
  },
  itemContainer: {
    width: 140,
    marginRight: SPACING.medium,
  },
  itemImage: {
    width: 140,
    height: 140,
    borderRadius: 8,
    backgroundColor: COLORS.lightGray,
  },
  itemColorPreview: {
    width: 140,
    height: 140,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: COLORS.darkText,
    marginTop: SPACING.small,
  },
  colorRow: {
    flexDirection: 'row',
    marginBottom: SPACING.small,
  },
  colorDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
});