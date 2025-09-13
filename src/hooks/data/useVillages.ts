import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Village } from "@/types";
import { toast } from "@/components/ui/use-toast";

export function useVillages(groupId?: string) {
  const qc = useQueryClient();

  const villagesQuery = useQuery({
    queryKey: ["villages", groupId],
    queryFn: async (): Promise<Village[]> => {
      if (!groupId) return [];
      const { data, error } = await supabase
        .from("villages")
        .select("id, village_name, group_id, farmers(id)")
        .eq("group_id", groupId);
      if (error) throw error;
      return (data || []).map((v: any) => ({
        id: v.id,
        village_name: v.village_name,
        group_id: v.group_id,
        farmerCount: v.farmers?.length || 0,
      }));
    },
    enabled: !!groupId,
  });

  const addVillage = useMutation({
    mutationFn: async (payload: { village_name: string; group_id: string }) => {
      const { data, error } = await supabase
        .from("villages")
        .insert(payload)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["villages", groupId] });
      toast({ title: "Village created" });
    },
    onError: (e: any) => toast({ title: "Failed to add village", description: e.message }),
  });

  const updateVillage = useMutation({
    mutationFn: async (payload: { id: string; village_name: string }) => {
      const { error } = await supabase
        .from("villages")
        .update({ village_name: payload.village_name })
        .eq("id", payload.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["villages", groupId] });
      toast({ title: "Village updated" });
    },
    onError: (e: any) => toast({ title: "Failed to update village", description: e.message }),
  });

  const deleteVillage = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("villages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["villages", groupId] });
      toast({ title: "Village deleted" });
    },
    onError: (e: any) => toast({ title: "Failed to delete village", description: e.message }),
  });

  return { ...villagesQuery, addVillage, updateVillage, deleteVillage };
}
