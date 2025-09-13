import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Group, Village } from "@/types";
import { useGroups } from "@/hooks/data/useGroups";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initialData?: Village | null;
  groupId?: string; // preselected group
  onSubmit: (values: { village_name: string; group_id: string }) => Promise<any> | void;
}

export function VillageFormDialog({ open, onOpenChange, initialData, groupId, onSubmit }: Props) {
  const [villageName, setVillageName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string | undefined>(groupId);
  const [loading, setLoading] = useState(false);
  const { data: groups } = useGroups();

  useEffect(() => {
    setVillageName(initialData?.village_name || "");
    setSelectedGroup(initialData?.group_id || groupId);
  }, [initialData, groupId]);

  const handleSave = async () => {
    if (!villageName.trim() || !selectedGroup) return;
    try {
      setLoading(true);
      await onSubmit({ village_name: villageName.trim(), group_id: selectedGroup });
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
            {initialData ? "गाव संपादित करा" : "गाव जोडा"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {!groupId && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">गट</label>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger className="h-12 border-2 border-border/50 focus:border-primary/50 bg-background/50 backdrop-blur-sm transition-all duration-300">
                  <SelectValue placeholder="गट निवडा" />
                </SelectTrigger>
                <SelectContent className="glass border-0 shadow-large">
                  {(groups || []).map((g: Group) => (
                    <SelectItem key={g.id} value={g.id} className="hover:bg-primary/10 transition-colors">
                      {g.group_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">गावाचे नाव</label>
            <Input
              placeholder="गावाचे नाव टाका"
              value={villageName}
              onChange={(e) => setVillageName(e.target.value)}
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
रद्द करा
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={loading || !villageName.trim() || !selectedGroup} 
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed h-12 px-8"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </div>
            ) : (
"गाव जतन करा"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
