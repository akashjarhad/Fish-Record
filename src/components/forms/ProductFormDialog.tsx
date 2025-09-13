import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FarmerProduct } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initialData?: FarmerProduct | null;
  farmerId: string;
  onSubmit: (values: Omit<FarmerProduct, "id">) => Promise<any> | void;
}

export function ProductFormDialog({ open, onOpenChange, initialData, farmerId, onSubmit }: Props) {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState<string>("");
  const [unit, setUnit] = useState<string>("pieces");
  const [date, setDate] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProductName(initialData?.product_name || "");
    setQuantity(String(initialData?.quantity ?? ""));
    setUnit(initialData?.unit || "pieces");
    setDate(initialData?.given_date || "");
  }, [initialData]);

  const handleSave = async () => {
    if (!productName.trim()) return;
    try {
      setLoading(true);
      await onSubmit({
        farmer_id: farmerId,
        product_name: productName.trim(),
        quantity: Number(quantity || 0),
        unit,
        given_date: date || new Date().toISOString().slice(0, 10),
      });
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-0 shadow-large backdrop-blur-xl max-w-2xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold gradient-text-primary">
            {initialData ? "Edit Product" : "Add Product"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Product Name</label>
            <Input 
              placeholder="Enter product name" 
              value={productName} 
              onChange={(e) => setProductName(e.target.value)} 
              className="h-12 border-2 border-border/50 focus:border-primary/50 bg-background/50 backdrop-blur-sm transition-all duration-300 focus:shadow-glow"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Quantity</label>
              <Input 
                type="number" 
                placeholder="0" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)} 
                className="h-12 border-2 border-border/50 focus:border-primary/50 bg-background/50 backdrop-blur-sm transition-all duration-300 focus:shadow-glow"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Unit</label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="h-12 border-2 border-border/50 focus:border-primary/50 bg-background/50 backdrop-blur-sm transition-all duration-300">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent className="glass border-0 shadow-large">
                  <SelectItem value="kg" className="hover:bg-primary/10 transition-colors">kg</SelectItem>
                  <SelectItem value="liters" className="hover:bg-primary/10 transition-colors">liters</SelectItem>
                  <SelectItem value="pieces" className="hover:bg-primary/10 transition-colors">pieces</SelectItem>
                  <SelectItem value="meters" className="hover:bg-primary/10 transition-colors">meters</SelectItem>
                  <SelectItem value="feet" className="hover:bg-primary/10 transition-colors">feet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Date Given</label>
            <Input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              className="h-12 border-2 border-border/50 focus:border-primary/50 bg-background/50 backdrop-blur-sm transition-all duration-300 focus:shadow-glow"
            />
          </div>
        </div>
        <DialogFooter className="gap-3">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-2 border-border/50 hover:border-primary/50 transition-all duration-300"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={loading || !productName.trim()} 
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed h-12 px-8"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </div>
            ) : (
              "Save Product"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
