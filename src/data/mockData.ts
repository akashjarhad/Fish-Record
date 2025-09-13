import { Group, Village, Farmer, FarmerProduct } from '@/types';

export const mockGroups: Group[] = [
  {
    id: '1',
    group_name: 'Coastal Aquaculture Group',
    villageCount: 3,
    farmerCount: 15
  },
  {
    id: '2', 
    group_name: 'Inland Fish Farmers',
    villageCount: 4,
    farmerCount: 22
  },
  {
    id: '3',
    group_name: 'Marine Fishery Association',
    villageCount: 2,
    farmerCount: 8
  },
  {
    id: '4',
    group_name: 'Freshwater Farming Collective',
    villageCount: 5,
    farmerCount: 28
  }
];

export const mockVillages: Village[] = [
  {
    id: '1',
    village_name: 'Seaside Village',
    group_id: '1',
    farmerCount: 6
  },
  {
    id: '2',
    village_name: 'Bay View',
    group_id: '1', 
    farmerCount: 5
  },
  {
    id: '3',
    village_name: 'Harbor Point',
    group_id: '1',
    farmerCount: 4
  },
  {
    id: '4',
    village_name: 'River Delta',
    group_id: '2',
    farmerCount: 8
  },
  {
    id: '5',
    village_name: 'Lake Shore',
    group_id: '2',
    farmerCount: 7
  },
  {
    id: '6',
    village_name: 'Pond Valley',
    group_id: '2',
    farmerCount: 4
  },
  {
    id: '7',
    village_name: 'Stream Side',
    group_id: '2',
    farmerCount: 3
  }
];

export const mockFarmers: Farmer[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    mobile_no: '+91-9876543210',
    village_id: '1',
    group_id: '1'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    mobile_no: '+91-8765432109',
    village_id: '1',
    group_id: '1'
  },
  {
    id: '3',
    name: 'Mohammed Ali',
    mobile_no: '+91-7654321098',
    village_id: '2',
    group_id: '1'
  },
  {
    id: '4',
    name: 'Sunita Patel',
    mobile_no: '+91-6543210987',
    village_id: '4',
    group_id: '2'
  },
  {
    id: '5',
    name: 'Arjun Singh',
    mobile_no: '+91-5432109876',
    village_id: '4',
    group_id: '2'
  }
];

export const mockProducts: FarmerProduct[] = [
  {
    id: '1',
    farmer_id: '1',
    product_name: 'Fish Feed Pellets',
    quantity: 500,
    unit: 'kg',
    given_date: '2024-01-15'
  },
  {
    id: '2',
    farmer_id: '1',
    product_name: 'Water Pump',
    quantity: 1,
    unit: 'pieces',
    given_date: '2024-01-20'
  },
  {
    id: '3',
    farmer_id: '1',
    product_name: 'Fishing Net',
    quantity: 2,
    unit: 'pieces',
    given_date: '2024-02-01'
  },
  {
    id: '4',
    farmer_id: '2',
    product_name: 'Pond Aerator',
    quantity: 1,
    unit: 'pieces',
    given_date: '2024-01-10'
  },
  {
    id: '5',
    farmer_id: '2',
    product_name: 'Fish Feed',
    quantity: 300,
    unit: 'kg',
    given_date: '2024-01-25'
  }
];