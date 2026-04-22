export type StructureCategory = 'Skyscraper' | 'Tower' | 'Monument';

export type Structure = {
  id: string;
  name: string;
  category: StructureCategory;
  location: string;
  city: string;
  country: string;
  height: number;
  floors?: number;
  year: number;
  latitude: number;
  longitude: number;
  description: string;
  image: any;
};

export type BlogArticle = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
};

export type FactCategory = 'Skyscraper' | 'Tower' | 'Monument';

export type FactItem = {
  id: string;
  category: FactCategory;
  topic: string;
  text: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
};

export type RootStackParamList = {
  Loader: undefined;
  Onboarding: undefined;
  Tabs: undefined;
  TowerDetail: { structureId: string };
  BlogDetail: { articleId: string };
  QuizGame: undefined;
  QuizResult: { correct: number; total: number };
};

export type TabParamList = {
  Home: undefined;
  Map: undefined;
  Blog: undefined;
  Facts: undefined;
  Quiz: undefined;
};
