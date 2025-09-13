import { useState } from 'react';
import { Users, Building2, MapPin, Plus, Search } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { GroupCard } from './GroupCard';
import { ModernCard } from '@/components/ui/modern-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Group } from '@/types';
import { useGroups } from '@/hooks/data/useGroups';
import { GroupFormDialog } from '@/components/forms/GroupFormDialog';
import { toast } from "@/components/ui/use-toast";
import { useUserRole } from "@/contexts/UserRoleContext";
import { PondLogo } from '@/components/ui/pond-logo';
interface DashboardProps {
  onGroupSelect: (group: Group) => void;
}

export function Dashboard({ onGroupSelect }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [groupDialogOpen, setGroupDialogOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const { isAdmin } = useUserRole();

  const { data: groups = [], isLoading, isError, addGroup, updateGroup } = useGroups();

  const filteredGroups = groups.filter(group =>
    group.group_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalFarmers = groups.reduce((sum, group) => sum + (group.farmerCount || 0), 0);
  const totalVillages = groups.reduce((sum, group) => sum + (group.villageCount || 0), 0);

  const handleAddGroup = () => {
    setEditingGroup(null);
    setGroupDialogOpen(true);
  };

  const handleSaveGroup = async (values: { group_name: string }) => {
    if (editingGroup) {
      await updateGroup.mutateAsync({ id: editingGroup.id, group_name: values.group_name });
    } else {
      await addGroup.mutateAsync({ group_name: values.group_name });
    }
  };

  return (
    <div className="space-y-6 page-transition">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl mb-4 shadow-2xl relative">
          <PondLogo size={60} className="relative z-10 drop-shadow-lg" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            <span className="gradient-text-primary">Fish Record</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Complete fish management solution for aquaculture professionals
          </p>
        </div>
      </div>

      {/* Modern Stats Cards */}
      <div className="grid grid-cols-1 gap-2 sm:gap-3 perspective-1500">
        <div className="stagger-animation transform-gpu">
          <ModernCard
            title="एकूण गट"
            value={isLoading ? 0 : groups.length}
            subtitle={`${groups.length !== 1 ? 'Active Groups' : 'Active Group'}`}
            icon={Building2}
            gradient="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500"
            iconBg="bg-white/25"
          />
        </div>
        <div className="stagger-animation transform-gpu">
          <ModernCard
            title="एकूण गावे"
            value={isLoading ? 0 : totalVillages}
            subtitle={`${totalVillages !== 1 ? 'Registered Villages' : 'Registered Village'}`}
            icon={MapPin}
            gradient="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500"
            iconBg="bg-white/25"
          />
        </div>
        <div className="stagger-animation transform-gpu">
          <ModernCard
            title="एकूण शेतकरी"
            value={isLoading ? 0 : totalFarmers}
            subtitle={`${totalFarmers !== 1 ? 'Active Farmers' : 'Active Farmer'}`}
            icon={Users}
            gradient="bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500"
            iconBg="bg-white/25"
          />
        </div>
      </div>

      {/* Groups Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-foreground tracking-tight">गट</h2>
          </div>
          {isAdmin && (
            <Button 
              onClick={handleAddGroup} 
              className="bg-gradient-primary hover:shadow-lg transform hover:scale-105 transition-all duration-200 px-6 py-3 text-white font-medium"
              size="lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              गट जोडा
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="relative max-w-md mx-auto sm:mx-0">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="गट शोधा..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 border-0 bg-white/90 focus:bg-white shadow-sm focus:shadow-md transition-all duration-300 rounded-xl text-base placeholder:text-muted-foreground/60"
          />
        </div>

        {/* Groups Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {isLoading && (
            <div className="col-span-3 flex items-center justify-center py-16">
              <div className="text-center space-y-4">
                <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-muted-foreground font-medium">गट लोड करत आहे...</p>
              </div>
            </div>
          )}
          {isError && (
            <div className="col-span-3 text-center py-16">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-8 w-8 text-red-500" />
              </div>
              <p className="text-red-600 font-medium">गट लोड करण्यात अयशस्वी.</p>
            </div>
          )}
          {!isLoading && !isError && filteredGroups.map((group, index) => (
            <div key={group.id} className="stagger-animation" style={{ animationDelay: `${index * 0.05}s` }}>
              <GroupCard
                group={group}
                onClick={onGroupSelect}
              />
            </div>
          ))}
          {!isLoading && !isError && filteredGroups.length === 0 && (
            <div className="col-span-3 text-center py-16">
              <div className="w-20 h-20 bg-muted/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">कोणतेही गट सापडले नाहीत</h3>
              <p className="text-muted-foreground">वेगळ्या शब्दाने शोध करून पहा</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Group Dialog - Only for admins */}
      {isAdmin && (
        <GroupFormDialog
          open={groupDialogOpen}
          onOpenChange={setGroupDialogOpen}
          initialData={editingGroup}
          onSubmit={handleSaveGroup}
        />
      )}
    </div>
  );
}