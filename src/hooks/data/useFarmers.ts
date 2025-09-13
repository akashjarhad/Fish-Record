import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Farmer } from "@/types";
import { toast } from "@/components/ui/use-toast";

export function useFarmers(villageId?: string) {
  const qc = useQueryClient();

  const farmersQuery = useQuery({
    queryKey: ["farmers", villageId],
    queryFn: async (): Promise<Farmer[]> => {
      if (!villageId) return [];
      const { data, error } = await supabase
        .from("farmers")
        .select("id, name, mobile_no, village_id, group_id, farmer_products(id)")
        .eq("village_id", villageId);
      if (error) throw error;
      return (data || []).map((f: any) => ({
        id: f.id,
        name: f.name,
        mobile_no: f.mobile_no,
        village_id: f.village_id,
        group_id: f.group_id,
        products: f.farmer_products || [],
      }));
    },
    enabled: !!villageId,
  });

  const addFarmer = useMutation({
    mutationFn: async (payload: { name: string; mobile_no?: string; village_id: string; group_id: string }) => {
      const { data, error } = await supabase
        .from("farmers")
        .insert(payload)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["farmers", villageId] });
      toast({ title: "Farmer created" });
    },
    onError: (e: any) => toast({ title: "Failed to add farmer", description: e.message }),
  });

  const updateFarmer = useMutation({
    mutationFn: async (payload: { id: string; name: string; mobile_no?: string }) => {
      const { error } = await supabase
        .from("farmers")
        .update({ name: payload.name, mobile_no: payload.mobile_no })
        .eq("id", payload.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["farmers", villageId] });
      toast({ title: "Farmer updated" });
    },
    onError: (e: any) => toast({ title: "Failed to update farmer", description: e.message }),
  });

  const deleteFarmer = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("farmers").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["farmers", villageId] });
      toast({ title: "Farmer deleted" });
    },
    onError: (e: any) => toast({ title: "Failed to delete farmer", description: e.message }),
  });

  return { ...farmersQuery, addFarmer, updateFarmer, deleteFarmer };
}
