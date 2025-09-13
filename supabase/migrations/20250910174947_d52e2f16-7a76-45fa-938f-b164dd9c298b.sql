-- Create Groups table
CREATE TABLE public.groups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create Villages table
CREATE TABLE public.villages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  village_name TEXT NOT NULL,
  group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create Farmers table
CREATE TABLE public.farmers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  mobile_no VARCHAR(15),
  village_id UUID NOT NULL REFERENCES public.villages(id) ON DELETE CASCADE,
  group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create Farmer Products table
CREATE TABLE public.farmer_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  farmer_id UUID NOT NULL REFERENCES public.farmers(id) ON DELETE CASCADE,
  product_name TEXT NOT NULL,
  quantity NUMERIC NOT NULL DEFAULT 0,
  unit TEXT NOT NULL,
  cost NUMERIC NOT NULL DEFAULT 0,
  given_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.villages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farmers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farmer_products ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is admin-only platform)
CREATE POLICY "Allow all operations on groups" ON public.groups FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on villages" ON public.villages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on farmers" ON public.farmers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on farmer_products" ON public.farmer_products FOR ALL USING (true) WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_groups_updated_at
  BEFORE UPDATE ON public.groups
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_villages_updated_at
  BEFORE UPDATE ON public.villages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_farmers_updated_at
  BEFORE UPDATE ON public.farmers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_farmer_products_updated_at
  BEFORE UPDATE ON public.farmer_products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data
INSERT INTO public.groups (group_name) VALUES 
  ('Coastal Aquaculture Group'),
  ('Inland Fish Farmers'),
  ('Marine Fishery Association'),
  ('Freshwater Farming Collective');

INSERT INTO public.villages (village_name, group_id) VALUES 
  ('Seaside Village', (SELECT id FROM public.groups WHERE group_name = 'Coastal Aquaculture Group')),
  ('Bay View', (SELECT id FROM public.groups WHERE group_name = 'Coastal Aquaculture Group')),
  ('Harbor Point', (SELECT id FROM public.groups WHERE group_name = 'Coastal Aquaculture Group')),
  ('River Delta', (SELECT id FROM public.groups WHERE group_name = 'Inland Fish Farmers')),
  ('Lake Shore', (SELECT id FROM public.groups WHERE group_name = 'Inland Fish Farmers')),
  ('Pond Valley', (SELECT id FROM public.groups WHERE group_name = 'Inland Fish Farmers')),
  ('Stream Side', (SELECT id FROM public.groups WHERE group_name = 'Inland Fish Farmers'));

-- Insert sample farmers
WITH group_village_data AS (
  SELECT g.id as group_id, v.id as village_id, v.village_name
  FROM public.groups g
  JOIN public.villages v ON g.id = v.group_id
  LIMIT 5
)
INSERT INTO public.farmers (name, mobile_no, village_id, group_id)
SELECT 
  CASE 
    WHEN village_name = 'Seaside Village' THEN 'Rajesh Kumar'
    WHEN village_name = 'Bay View' THEN 'Priya Sharma'
    WHEN village_name = 'Harbor Point' THEN 'Mohammed Ali'
    WHEN village_name = 'River Delta' THEN 'Sunita Patel'
    WHEN village_name = 'Lake Shore' THEN 'Arjun Singh'
  END,
  CASE 
    WHEN village_name = 'Seaside Village' THEN '+91-9876543210'
    WHEN village_name = 'Bay View' THEN '+91-8765432109'
    WHEN village_name = 'Harbor Point' THEN '+91-7654321098'
    WHEN village_name = 'River Delta' THEN '+91-6543210987'
    WHEN village_name = 'Lake Shore' THEN '+91-5432109876'
  END,
  village_id,
  group_id
FROM group_village_data;

-- Insert sample products for farmers
INSERT INTO public.farmer_products (farmer_id, product_name, quantity, unit, cost, given_date)
SELECT 
  f.id,
  'Fish Feed Pellets',
  500,
  'kg',
  15000,
  DATE '2024-01-15'
FROM public.farmers f
WHERE f.name = 'Rajesh Kumar'
UNION ALL
SELECT 
  f.id,
  'Water Pump',
  1,
  'pieces',
  25000,
  DATE '2024-01-20'
FROM public.farmers f
WHERE f.name = 'Rajesh Kumar'
UNION ALL
SELECT 
  f.id,
  'Pond Aerator',
  1,
  'pieces',
  20000,
  DATE '2024-01-10'
FROM public.farmers f
WHERE f.name = 'Priya Sharma';