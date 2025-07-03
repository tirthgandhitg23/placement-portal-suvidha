
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface TPOData {
  id: string;
  name: string;
  college: string;
  email: string;
  contact: string;
  created_at: string;
  updated_at: string;
}

export const useTPOData = () => {
  const [tpoData, setTpoData] = useState<TPOData[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchTPOData = async () => {
    try {
      const { data, error } = await supabase
        .from('tpo_details')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTpoData(data || []);
    } catch (error) {
      console.error('Error fetching TPO data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch TPO data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addTPO = async (tpoDetails: Omit<TPOData, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('tpo_details')
        .insert([tpoDetails])
        .select()
        .single();

      if (error) throw error;

      setTpoData(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "TPO details added successfully",
      });
      return { success: true };
    } catch (error) {
      console.error('Error adding TPO:', error);
      toast({
        title: "Error",
        description: "Failed to add TPO details",
        variant: "destructive",
      });
      return { success: false };
    }
  };

  useEffect(() => {
    fetchTPOData();
  }, []);

  return { tpoData, loading, addTPO, refetch: fetchTPOData };
};
