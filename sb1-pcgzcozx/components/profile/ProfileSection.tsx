import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { COLORS, SPACING } from '@/constants/theme';
import { ChevronRight } from 'lucide-react-native';

interface ProfileSectionProps {
  title: string;
  icon: ReactNode;
  onPress: () => void;
}

export default function ProfileSection({ title, icon, onPress }: ProfileSectionProps) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.title}>{title}</Text>
      <ChevronRight size={20} color={COLORS.darkGray} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.medium,
    borderRadius: 12,
    marginBottom: SPACING.medium,
    shadowColor: COLORS.darkText,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.medium,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: COLORS.darkText,
    flex: 1,
  },
});