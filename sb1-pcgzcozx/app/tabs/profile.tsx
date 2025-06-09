import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Bookmark, Calendar, LogOut, Trash2 } from 'lucide-react-native';
import { COLORS, SPACING } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import ProfileSection from '@/components/profile/ProfileSection';
import { useClothingStore } from '@/store/clothingStore';
import { useAuthStore } from '@/store/authStore';

export default function ProfileScreen() {
  const { clearCloset } = useClothingStore();
  const { signOut, user } = useAuthStore();

  const handleClearCloset = () => {
    Alert.alert(
      "Clear Closet",
      "Are you sure you want to delete all clothing items? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete All", 
          onPress: () => clearCloset(),
          style: "destructive"
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image 
              source={{ uri: user?.profileImage || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' }} 
              style={styles.profileImage} 
            />
          </View>
          <Text style={styles.profileName}>{user?.name || 'User Name'}</Text>
        </View>

        <View style={styles.sectionsContainer}>
          <ProfileSection 
            title="Wish List" 
            icon={<Heart size={24} color={COLORS.darkBlue} />}
            onPress={() => {}}
          />
          <ProfileSection 
            title="Saved Clothing" 
            icon={<Bookmark size={24} color={COLORS.darkBlue} />}
            onPress={() => {}}
          />
          <ProfileSection 
            title="Activity Center" 
            icon={<Calendar size={24} color={COLORS.darkBlue} />}
            onPress={() => {}}
          />
        </View>

        <View style={styles.actionsContainer}>
          <Pressable style={styles.signOutButton} onPress={signOut}>
            <LogOut size={20} color={COLORS.darkBlue} />
            <Text style={styles.signOutText}>Sign Out</Text>
          </Pressable>
          
          <Pressable style={styles.clearClosetButton} onPress={handleClearCloset}>
            <Trash2 size={20} color={COLORS.danger} />
            <Text style={styles.clearClosetText}>Clear Closet</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: SPACING.extraLarge,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: COLORS.darkBlue,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: COLORS.darkText,
    marginTop: SPACING.medium,
  },
  sectionsContainer: {
    marginHorizontal: SPACING.medium,
    marginTop: SPACING.large,
  },
  actionsContainer: {
    marginTop: SPACING.extraLarge,
    marginHorizontal: SPACING.medium,
    marginBottom: SPACING.extraLarge,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.medium,
    borderRadius: 8,
    backgroundColor: COLORS.lightGray,
    marginBottom: SPACING.medium,
  },
  signOutText: {
    fontFamily: 'Poppins-Medium',
    color: COLORS.darkBlue,
    marginLeft: SPACING.small,
    fontSize: 16,
  },
  clearClosetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.medium,
    borderRadius: 8,
    backgroundColor: COLORS.lightDanger,
  },
  clearClosetText: {
    fontFamily: 'Poppins-Medium',
    color: COLORS.danger,
    marginLeft: SPACING.small,
    fontSize: 16,
  },
});