export interface Group {
  id: string;
  group_name: string;
  villages?: Village[];
  villageCount?: number;
  farmerCount?: number;
}

export interface Village {
  id: string;
  village_name: string;
  group_id: string;
  group?: Group;
  farmers?: Farmer[];
  farmerCount?: number;
}

export interface Farmer {
  id: string;
  name: string;
  mobile_no: string;
  village_id: string;
  group_id: string;
  village?: Village;
  group?: Group;
  products?: FarmerProduct[];
}

export interface FarmerProduct {
  id: string;
  farmer_id: string;
  product_name: string;
  quantity: number;
  unit: string;
  given_date: string;
}

export interface DashboardStats {
  totalFarmers: number;
  totalGroups: number;
  totalVillages: number;
}