export interface Employee {
  id: string;
  name: string;
  role: string;
}

export interface RestaurantInfo {
  name: string;
  logo: string | null;
}

export type TemplateId = "classic" | "modern" | "minimal";
