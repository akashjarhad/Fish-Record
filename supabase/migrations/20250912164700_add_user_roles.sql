-- Create user_roles table to manage admin users
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('admin', 'viewer')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by TEXT -- email of admin who created this role
);

-- Enable Row Level Security
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create policy for user roles (only admins can manage roles)
CREATE POLICY "Allow read access to user_roles" ON public.user_roles FOR SELECT USING (true);
CREATE POLICY "Allow admin operations on user_roles" ON public.user_roles FOR ALL USING (
  email IN ('rohitunde5@gmail.com', 'rohit.unde.project@gmail.com')
) WITH CHECK (
  email IN ('rohitunde5@gmail.com', 'rohit.unde.project@gmail.com')
);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_roles_updated_at
  BEFORE UPDATE ON public.user_roles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert existing admin users
INSERT INTO public.user_roles (email, role, created_by) VALUES 
  ('rohitunde5@gmail.com', 'admin', 'system'),
  ('rohit.unde.project@gmail.com', 'admin', 'system');
