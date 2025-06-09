export interface ClothingColors {
  primary: string;
  secondary?: string;
  tertiary?: string;
  quaternary?: string;
}

export interface ClothingItem {
  id: string;
  name: string;
  category: string;
  imageUri: string | null;
  colors: ClothingColors;
  dateAdded: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}