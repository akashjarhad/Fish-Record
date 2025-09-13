import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Farmer, Village } from "@/types";
import { useVillages } from "@/hooks/data/useVillages";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initialData?: Farmer | null;
  groupId: string;
  villageId?: string; // optional preselect
  onSubmit: (values: { name: string; mobile_no?: string; group_id: string; village_id: string }) => Promise<any> | void;
}

export function FarmerFormDialog({ open, onOpenChange, initialData, groupId, villageId, onSubmit }: Props) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [selectedVillage, setSelectedVillage] = useState<string | undefined>(villageId);
  const [loading, setLoading] = useState(false);
  const { data: villages } = useVillages(groupId);

  useEffect(() => {
    setName(initialData?.name || "");
    setMobile(initialData?.mobile_no || "");
    setSelectedVillage(initialData?.village_id || villageId);
  }, [initialData, villageId]);

  const handleSave = async () => {
    if (!name.trim() || !selectedVillage) return;
    try {
      setLoading(true);
      await onSubmit({ name: name.trim(), mobile_no: mobile.trim() || undefined, group_id: groupId, village_id: selectedVillage });
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-0 shadow-large backdrop-blur-xl">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold gradient-text-primary">
            {initialData ? "शेतकरी संपादित करा" : "शेतकरी जोडा"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">शेतकरीचे नाव</label>
            <Input 
              placeholder="शेतकरीचे नाव टाका" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="h-12 border-2 border-border/50 focus:border-primary/50 bg-background/50 backdrop-blur-sm transition-all duration-300 focus:shadow-glow"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">मोबाइल नंबर</label>
            <Input 
              placeholder="मोबाइल नंबर टाका (optional)" 
              value={mobile} 
              onChange={(e) => setMobile(e.target.value)} 
              className="h-12 border-2 border-border/50 focus:border-primary/50 bg-background/50 backdrop-blur-sm transition-all duration-300 focus:shadow-glow"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">गाव</label>
            {villageId ? (
              // Show village name as read-only when villageId is provided
              <div className="h-12 px-3 py-3 bg-muted/50 border-2 border-border/50 rounded-lg flex items-center">
                <span className="text-foreground font-medium">
                  {(villages || []).find(v => v.id === villageId)?.village_name || 'Selected Village'}
                </span>
              </div>
            ) : (
              // Show dropdown only when no specific village is selected
              <Select value={selectedVillage} onValueChange={setSelectedVillage}>
                <SelectTrigger className="h-12 border-2 border-border/50 focus:border-primary/50 bg-background/50 backdrop-blur-sm transition-all duration-300">
                  <SelectValue placeholder="गाव निवडा" />
                </SelectTrigger>
                <SelectContent className="glass border-0 shadow-large">
                  {(villages || []).map((v: Village) => (
                    <SelectItem key={v.id} value={v.id} className="hover:bg-primary/10 transition-colors">
                      {v.village_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
        <DialogFooter className="gap-3">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-2 border-border/50 hover:border-primary/50 transition-all duration-300"
          >
रद्द करा
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={loading || !name.trim() || !selectedVillage} 
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed h-12 px-8"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </div>
            ) : (
"शेतकरी जतन करा"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
