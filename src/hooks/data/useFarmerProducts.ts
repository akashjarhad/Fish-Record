import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { FarmerProduct } from "@/types";
import { toast } from "@/components/ui/use-toast";

export function useFarmerProducts(farmerId?: string) {
  const qc = useQueryClient();

  const productsQuery = useQuery({
    queryKey: ["farmer_products", farmerId],
    queryFn: async (): Promise<FarmerProduct[]> => {
      if (!farmerId) return [] as FarmerProduct[];
      const { data, error } = await supabase
        .from("farmer_products")
        .select("id, farmer_id, product_name, quantity, unit, given_date")
        .eq("farmer_id", farmerId)
        .order("given_date", { ascending: false });
      if (error) throw error;
      return data as any;
    },
    enabled: !!farmerId,
  });

  const addProduct = useMutation({
    mutationFn: async (payload: Omit<FarmerProduct, "id">) => {
      const { data, error } = await supabase
        .from("farmer_products")
        .insert(payload)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["farmer_products", farmerId] });
      qc.invalidateQueries({ queryKey: ["farmers"] });
      toast({ title: "Product added" });
    },
    onError: (e: any) => toast({ title: "Failed to add product", description: e.message }),
  });

  const updateProduct = useMutation({
    mutationFn: async (payload: { id: string } & Partial<FarmerProduct>) => {
      const { id, ...rest } = payload;
      const { error } = await supabase
        .from("farmer_products")
        .update(rest)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["farmer_products", farmerId] });
      qc.invalidateQueries({ queryKey: ["farmers"] });
      toast({ title: "Product updated" });
    },
    onError: (e: any) => toast({ title: "Failed to update product", description: e.message }),
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("farmer_products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["farmer_products", farmerId] });
      qc.invalidateQueries({ queryKey: ["farmers"] });
      toast({ title: "Product deleted" });
    },
    onError: (e: any) => toast({ title: "Failed to delete product", description: e.message }),
  });

  return { ...productsQuery, addProduct, updateProduct, deleteProduct };
}
