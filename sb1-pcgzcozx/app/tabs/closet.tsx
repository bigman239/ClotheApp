import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, CirclePlus as PlusCircle } from 'lucide-react-native';
import { Link } from 'expo-router';
import { COLORS, SPACING } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import ClothingCategory from '@/components/closet/ClothingCategory';
import { useClothingStore } from '@/store/clothingStore';

export default function ClosetScreen() {
  const { getClothingByCategory, categories } = useClothingStore();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Your Closet</Text>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {categories.map((category) => (
          <ClothingCategory 
            key={category} 
            title={category.charAt(0).toUpperCase() + category.slice(1)} 
            items={getClothingByCategory(category)}
          />
        ))}
        <View style={styles.spacer} />
      </ScrollView>
      
      <View style={styles.addButtonContainer}>
        <Link href="/add-clothing" asChild>
          <Pressable style={styles.addButton}>
            <Camera size={24} color={COLORS.white} />
            <Text style={styles.addButtonText}>Add Clothing</Text>
          </Pressable>
        </Link>
      </View>
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
  scrollView: {
    flex: 1,
  },
  spacer: {
    height: 100,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: SPACING.large,
    right: SPACING.large,
    left: SPACING.large,
  },
  addButton: {
    backgroundColor: COLORS.darkBlue,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.large,
    shadowColor: COLORS.darkBlue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    color: COLORS.white,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    marginLeft: SPACING.small,
  },
});