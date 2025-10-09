interface Drug {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  categories: Category[];
  topics: Topic[];
}

interface Category {
  id: string;
  name: string;
}

interface Topic {
  id: string;
  title: string;
}

export type { Drug };
