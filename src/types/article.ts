export interface Article {
  id: string;
  likes: number;
  description: string;
  alt_description: string;
  user: {
    name: string;
  };
  urls: {
    small: string;
    regular: string;
  };
}
