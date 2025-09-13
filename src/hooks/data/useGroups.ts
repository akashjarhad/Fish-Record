import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Group } from "@/types";
import { toast } from "@/components/ui/use-toast";

export function useGroups() {
  const qc = useQueryClient();

  const groupsQuery = useQuery({
    queryKey: ["groups"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("groups")
        .select("id, group_name, villages(id), farmers(id)");
      if (error) throw error;
      const mapped: Group[] = (data || []).map((g: any) => ({
        id: g.id,
        group_name: g.group_name,
        villageCount: g.villages?.length || 0,
        farmerCount: g.farmers?.length || 0,
      }));
      return mapped;
    },
  });

  const addGroup = useMutation({
    mutationFn: async (payload: { group_name: string }) => {
      const { data, error } = await supabase
        .from("groups")
        .insert({ group_name: payload.group_name })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["groups"] });
      toast({ title: "Group created", description: "The group was added successfully." });
    },
    onError: (e: any) => toast({ title: "Failed to add group", description: e.message }),
  });

  const updateGroup = useMutation({
    mutationFn: async (payload: { id: string; group_name: string }) => {
      const { error } = await supabase
        .from("groups")
        .update({ group_name: payload.group_name })
        .eq("id", payload.id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["groups"] });
      toast({ title: "Group updated" });
    },
    onError: (e: any) => toast({ title: "Failed to update", description: e.message }),
  });

  const deleteGroup = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("groups").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["groups"] });
      toast({ title: "Group deleted" });
    },
    onError: (e: any) => toast({ title: "Failed to delete", description: e.message }),
  });

  return { ...groupsQuery, addGroup, updateGroup, deleteGroup };
}
