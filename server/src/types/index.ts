export interface Restaurant {
  id: number;
  name: string;
  logo: string;
  coverImage: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  minimumOrder: string;
  description?: string;
  tags: string[];
  location: string;
}

export interface Tag {
  id: number;
  name: string;
  count: number;
}

export interface RestaurantCategory {
  id: string;
  title: string;
  emoji: string;
  description: string;
  tagFilter?: string;
} 