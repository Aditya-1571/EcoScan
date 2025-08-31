-- Fix security vulnerability: Restrict profile viewing to profile owners only
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create new restrictive policy for profile viewing
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);