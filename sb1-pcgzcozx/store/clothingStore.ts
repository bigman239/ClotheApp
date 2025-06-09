import { useState, useEffect } from 'react';
import { ClothingItem } from '@/types/clothing';

// Initialize with some sample items for demonstration
const initialItems: ClothingItem[] = [];

// Categories that should be displayed in the app
const categories = ['hat', 'shirt', 't-shirt', 'pants', 'shoes'];

export const useClothingStore = () => {
  const [items, setItems] = useState<ClothingItem[]>(initialItems);

  // Load items from storage when the app starts
  useEffect(() => {
    // This would normally load from AsyncStorage
    // For this example, we'll just use the initial items
  }, []);

  // Add a new clothing item
  const addClothing = (item: ClothingItem) => {
    const newItems = [...items, item];
    setItems(newItems);
    // This would normally save to AsyncStorage
  };

  // Delete a clothing item
  const deleteClothing = (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    // This would normally save to AsyncStorage
  };

  // Clear all clothing items
  const clearCloset = () => {
    setItems([]);
    // This would normally save to AsyncStorage
  };

  // Get items by category
  const getClothingByCategory = (category: string) => {
    return items.filter(item => item.category === category);
  };

  return {
    items,
    categories,
    addClothing,
    deleteClothing,
    clearCloset,
    getClothingByCategory,
  };
};