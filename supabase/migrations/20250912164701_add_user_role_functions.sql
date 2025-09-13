-- Create function to get user role
CREATE OR REPLACE FUNCTION get_user_role(user_email TEXT)
RETURNS TEXT AS $$
DECLARE
  user_role_result TEXT;
BEGIN
  SELECT role INTO user_role_result
  FROM public.user_roles
  WHERE email = user_email;
  
  RETURN COALESCE(user_role_result, 'viewer');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to add admin user
CREATE OR REPLACE FUNCTION add_admin_user(user_email TEXT, created_by_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  INSERT INTO public.user_roles (email, role, created_by)
  VALUES (user_email, 'admin', created_by_email)
  ON CONFLICT (email) DO UPDATE SET
    role = 'admin',
    updated_at = now(),
    created_by = created_by_email;
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to remove admin user
CREATE OR REPLACE FUNCTION remove_admin_user(user_email TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  DELETE FROM public.user_roles
  WHERE email = user_email;
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to get all admin users
CREATE OR REPLACE FUNCTION get_all_admin_users()
RETURNS TABLE(email TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT ur.email
  FROM public.user_roles ur
  WHERE ur.role = 'admin';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
