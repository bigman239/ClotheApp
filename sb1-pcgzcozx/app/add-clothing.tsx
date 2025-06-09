import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, CirclePlus as PlusCircle, ChevronLeft } from 'lucide-react-native';
import { COLORS, SPACING } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useClothingStore } from '@/store/clothingStore';
import ColorSelector from '@/components/closet/ColorSelector';

export default function AddClothingScreen() {
  const router = useRouter();
  const { addClothing } = useClothingStore();
  
  const [name, setName] = useState('');
  const [category, setCategory] = useState('shirt');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [primaryColor, setPrimaryColor] = useState('#FFFFFF');
  const [secondaryColor, setSecondaryColor] = useState<string | undefined>(undefined);
  const [tertiaryColor, setTertiaryColor] = useState<string | undefined>(undefined);
  const [quaternaryColor, setQuaternaryColor] = useState<string | undefined>(undefined);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!name) {
      alert('Please enter a name for this item');
      return;
    }

    addClothing({
      id: Date.now().toString(),
      name,
      category,
      imageUri,
      colors: {
        primary: primaryColor,
        ...(secondaryColor && { secondary: secondaryColor }),
        ...(tertiaryColor && { tertiary: tertiaryColor }),
        ...(quaternaryColor && { quaternary: quaternaryColor }),
      },
      dateAdded: new Date().toISOString(),
    });

    router.back();
  };

  const categories = ['hat', 'shirt', 't-shirt', 'pants', 'shoes'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft size={24} color={COLORS.darkBlue} />
        </Pressable>
        <Text style={styles.title}>Add Clothing</Text>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Enter item name"
            placeholderTextColor={COLORS.darkGray}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryContainer}>
            {categories.map((cat) => (
              <Pressable
                key={cat}
                style={[
                  styles.categoryButton,
                  category === cat && styles.categoryButtonActive
                ]}
                onPress={() => setCategory(cat)}
              >
                <Text 
                  style={[
                    styles.categoryButtonText,
                    category === cat && styles.categoryButtonTextActive
                  ]}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Image</Text>
          <Pressable style={styles.imagePickerButton} onPress={pickImage}>
            {imageUri ? (
              <Text style={styles.imagePickerText}>Image Selected</Text>
            ) : (
              <>
                <PlusCircle size={24} color={COLORS.darkBlue} />
                <Text style={styles.imagePickerText}>Add Image</Text>
              </>
            )}
          </Pressable>
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Colors</Text>
          
          <View style={styles.colorRow}>
            <View style={styles.colorInputGroup}>
              <Text style={styles.colorLabel}>Primary <Text style={styles.requiredStar}>*</Text></Text>
              <ColorSelector 
                selectedColor={primaryColor} 
                onSelectColor={setPrimaryColor} 
              />
            </View>
            
            <View style={styles.colorInputGroup}>
              <Text style={styles.colorLabel}>Secondary (Optional)</Text>
              <ColorSelector 
                selectedColor={secondaryColor || '#DDDDDD'} 
                onSelectColor={setSecondaryColor} 
              />
            </View>
          </View>
          
          <View style={styles.colorRow}>
            <View style={styles.colorInputGroup}>
              <Text style={styles.colorLabel}>Tertiary (Optional)</Text>
              <ColorSelector 
                selectedColor={tertiaryColor || '#BBBBBB'} 
                onSelectColor={setTertiaryColor} 
              />
            </View>
            
            <View style={styles.colorInputGroup}>
              <Text style={styles.colorLabel}>Quaternary (Optional)</Text>
              <ColorSelector 
                selectedColor={quaternaryColor || '#999999'} 
                onSelectColor={setQuaternaryColor} 
              />
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Pressable style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Item</Text>
        </Pressable>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  backButton: {
    padding: SPACING.small,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: COLORS.darkBlue,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: SPACING.medium,
  },
  inputGroup: {
    marginBottom: SPACING.large,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: COLORS.darkText,
    marginBottom: SPACING.small,
  },
  textInput: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.medium,
    fontFamily: 'Poppins-Regular',
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.small,
  },
  categoryButton: {
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    marginRight: SPACING.small,
    marginBottom: SPACING.small,
  },
  categoryButtonActive: {
    backgroundColor: COLORS.darkBlue,
  },
  categoryButtonText: {
    fontFamily: 'Poppins-Medium',
    color: COLORS.darkText,
  },
  categoryButtonTextActive: {
    color: COLORS.white,
  },
  imagePickerButton: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.medium,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePickerText: {
    fontFamily: 'Poppins-Medium',
    color: COLORS.darkBlue,
    marginLeft: SPACING.small,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.medium,
  },
  colorInputGroup: {
    flex: 1,
    marginRight: SPACING.medium,
  },
  colorLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.darkText,
    marginBottom: SPACING.small,
  },
  requiredStar: {
    color: COLORS.danger,
  },
  footer: {
    padding: SPACING.medium,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  saveButton: {
    backgroundColor: COLORS.darkBlue,
    borderRadius: 8,
    paddingVertical: SPACING.medium,
    alignItems: 'center',
  },
  saveButtonText: {
    fontFamily: 'Poppins-Medium',
    color: COLORS.white,
    fontSize: 16,
  },
});