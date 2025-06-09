import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import { ShoppingItem } from '@/types/clothing';
import { Heart } from 'lucide-react-native';

// Mock data for the shop
const shopItems: ShoppingItem[] = [
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    category: 'shirt',
    price: 29.99,
    image: 'https://images.pexels.com/photos/6311387/pexels-photo-6311387.jpeg',
  },
  {
    id: '2',
    name: 'Classic Denim Jeans',
    category: 'pants',
    price: 59.99,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
  },
  {
    id: '3',
    name: 'Summer Hat',
    category: 'hat',
    price: 24.99,
    image: 'https://images.pexels.com/photos/984619/pexels-photo-984619.jpeg',
  },
  {
    id: '4',
    name: 'Casual Shirt',
    category: 'shirt',
    price: 45.99,
    image: 'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
  },
  {
    id: '5',
    name: 'Winter Jacket',
    category: 'shirt',
    price: 89.99,
    image: 'https://images.pexels.com/photos/6770028/pexels-photo-6770028.jpeg',
  },
];

const ShopItem = ({ item }: { item: ShoppingItem }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <Pressable style={styles.wishlistButton}>
        <Heart size={20} color={COLORS.darkGray} />
      </Pressable>
    </View>
  );
};

export default function ShopScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Shop</Text>
      </View>
      
      <FlatList
        data={shopItems}
        renderItem={({ item }) => <ShopItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: COLORS.darkBlue,
  },
  listContainer: {
    padding: SPACING.medium,
  },
  itemContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: SPACING.medium,
    overflow: 'hidden',
    shadowColor: COLORS.darkText,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: '100%',
    height: 200,
  },
  itemDetails: {
    padding: SPACING.medium,
  },
  itemName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: COLORS.darkText,
  },
  itemPrice: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: COLORS.darkBlue,
    marginTop: SPACING.small,
  },
  wishlistButton: {
    position: 'absolute',
    top: SPACING.medium,
    right: SPACING.medium,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: SPACING.small,
    shadowColor: COLORS.darkText,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});