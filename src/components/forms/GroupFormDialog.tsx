import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Group } from "@/types";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  initialData?: Group | null;
  onSubmit: (values: { group_name: string }) => Promise<any> | void;
}

export function GroupFormDialog({ open, onOpenChange, initialData, onSubmit }: Props) {
  const [groupName, setGroupName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setGroupName(initialData?.group_name || "");
  }, [initialData]);

  const handleSave = async () => {
    if (!groupName.trim()) return;
    try {
      setLoading(true);
      await onSubmit({ group_name: groupName.trim() });
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
            {initialData ? "गट संपादित करा" : "गट जोडा"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">गटाचे नाव</label>
            <Input
              placeholder="गटाचे नाव टाका"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
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
            disabled={loading || !groupName.trim()} 
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed h-12 px-8"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </div>
            ) : (
"गट जतन करा"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
