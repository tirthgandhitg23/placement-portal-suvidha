
-- Create a table for TPO details
CREATE TABLE public.tpo_details (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  college TEXT NOT NULL,
  email TEXT NOT NULL,
  contact TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.tpo_details ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to view all TPO details
CREATE POLICY "Allow authenticated users to view TPO details" 
  ON public.tpo_details 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to insert TPO details
CREATE POLICY "Allow authenticated users to insert TPO details" 
  ON public.tpo_details 
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update TPO details
CREATE POLICY "Allow authenticated users to update TPO details" 
  ON public.tpo_details 
  FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete TPO details
CREATE POLICY "Allow authenticated users to delete TPO details" 
  ON public.tpo_details 
  FOR DELETE 
  USING (auth.role() = 'authenticated');
