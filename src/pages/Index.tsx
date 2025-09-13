import { useState } from 'react';
import { ArrowLeft, ChevronRight, User, Phone, MapPin, Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { VillageCard } from '@/components/villages/VillageCard';
import { FarmerCard } from '@/components/farmers/FarmerCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Group, Village, Farmer, FarmerProduct } from '@/types';
import { useVillages } from '@/hooks/data/useVillages';
import { useGroups } from '@/hooks/data/useGroups';
import { useFarmers } from '@/hooks/data/useFarmers';
import { useFarmerProducts } from '@/hooks/data/useFarmerProducts';
import { VillageFormDialog } from '@/components/forms/VillageFormDialog';
import { FarmerFormDialog } from '@/components/forms/FarmerFormDialog';
import { ProductFormDialog } from '@/components/forms/ProductFormDialog';
import { toast } from '@/components/ui/use-toast';
import { useUserRole } from '@/contexts/UserRoleContext';

type ViewMode = 'dashboard' | 'villages' | 'farmers' | 'farmer-profile';

interface ViewState {
  mode: ViewMode;
  selectedGroup?: Group;
  selectedVillage?: Village;
  selectedFarmer?: Farmer;
}

export default function Index() {
  const [viewState, setViewState] = useState<ViewState>({ mode: 'dashboard' });
  const [searchQuery, setSearchQuery] = useState('');
  const { isAdmin } = useUserRole();
  
  // Dialog states
  const [villageDialogOpen, setVillageDialogOpen] = useState(false);
  const [farmerDialogOpen, setFarmerDialogOpen] = useState(false);
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  
  // Editing states
  const [editingVillage, setEditingVillage] = useState<Village | null>(null);
  const [editingFarmer, setEditingFarmer] = useState<Farmer | null>(null);
  const [editingProduct, setEditingProduct] = useState<FarmerProduct | null>(null);

  // Data hooks
  const groupsHook = useGroups();
  const villagesHook = useVillages(viewState.selectedGroup?.id);
  const farmersHook = useFarmers(viewState.selectedVillage?.id);
  const productsHook = useFarmerProducts(viewState.selectedFarmer?.id);

  const handleGroupSelect = (group: Group) => {
    setViewState({ mode: 'villages', selectedGroup: group });
  };

  const handleVillageSelect = (village: Village) => {
    setViewState({ 
      mode: 'farmers', 
      selectedGroup: viewState.selectedGroup,
      selectedVillage: village 
    });
  };

  const handleFarmerSelect = (farmer: Farmer) => {
    setViewState({ 
      mode: 'farmer-profile',
      selectedGroup: viewState.selectedGroup,
      selectedVillage: viewState.selectedVillage,
      selectedFarmer: farmer 
    });
  };

  const handleBack = () => {
    if (viewState.mode === 'farmer-profile') {
      setViewState({ 
        mode: 'farmers', 
        selectedGroup: viewState.selectedGroup,
        selectedVillage: viewState.selectedVillage 
      });
    } else if (viewState.mode === 'farmers') {
      setViewState({ mode: 'villages', selectedGroup: viewState.selectedGroup });
    } else if (viewState.mode === 'villages') {
      setViewState({ mode: 'dashboard' });
    }
  };

  const renderBreadcrumb = () => {
    const items = [];
    
    items.push({ label: 'Dashboard', onClick: () => setViewState({ mode: 'dashboard' }) });
    
    if (viewState.selectedGroup) {
      items.push({ 
        label: viewState.selectedGroup.group_name,
        onClick: () => setViewState({ mode: 'villages', selectedGroup: viewState.selectedGroup })
      });
    }
    
    if (viewState.selectedVillage) {
      items.push({ 
        label: viewState.selectedVillage.village_name,
        onClick: () => setViewState({ 
          mode: 'farmers', 
          selectedGroup: viewState.selectedGroup,
          selectedVillage: viewState.selectedVillage 
        })
      });
    }
    
    if (viewState.selectedFarmer) {
      items.push({ label: viewState.selectedFarmer.name });
    }

    return (
      <div className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 backdrop-blur-xl border border-gradient-to-r from-purple-300/30 to-blue-300/30 shadow-lg rounded-xl sm:rounded-2xl p-2 sm:p-4 mb-3 sm:mb-6 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 blur-lg"></div>
        <div className="absolute -bottom-1 -left-1 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-br from-green-400 to-cyan-500 rounded-full opacity-25 blur-md"></div>
        
        <nav className="flex items-center flex-wrap gap-1 sm:gap-2 relative z-10">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-1 sm:gap-2">
              {index > 0 && <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500 animate-pulse" />}
              <button
                onClick={item.onClick}
                disabled={index === items.length - 1}
                className={`px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-xs font-bold transition-all duration-300 transform hover:scale-105 ${
                  index === items.length - 1 
                    ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white shadow-lg hover:shadow-xl border border-white/30' 
                    : index === 0
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-md hover:shadow-lg'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-md hover:shadow-lg'
                }`}
              >
                {item.label}
              </button>
            </div>
          ))}
        </nav>
      </div>
    );
  };

  const renderVillagesView = () => {
    const villages = (villagesHook.data || []).filter(v => v.group_id === viewState.selectedGroup?.id);
    const filteredVillages = villages.filter(village =>
      village.village_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="space-y-4 sm:space-y-8 page-transition">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="space-y-1 sm:space-y-2">
            <h2 className="text-xl sm:text-3xl font-bold text-foreground tracking-tight">
              <span className="gradient-text-primary">{viewState.selectedGroup?.group_name}</span> मधील गावे
            </h2>
          </div>
          {isAdmin && (
            <Button 
              className="bg-gradient-primary hover:shadow-lg transform hover:scale-105 transition-all duration-200 px-4 sm:px-6 py-2 sm:py-3 text-white font-medium w-full sm:w-auto" 
              onClick={() => { setEditingVillage(null); setVillageDialogOpen(true); }}
              size="lg"
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              गाव जोडा
            </Button>
          )}
        </div>

        <div className="relative max-w-md mx-auto sm:mx-0">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="गावे शोधा..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 border-0 bg-white/90 focus:bg-white shadow-sm focus:shadow-md transition-all duration-300 rounded-xl text-base placeholder:text-muted-foreground/60"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {villagesHook.isLoading && (
            <div className="col-span-3 flex items-center justify-center py-16">
              <div className="text-center space-y-4">
                <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-muted-foreground font-medium">गावे लोड करत आहे...</p>
              </div>
            </div>
          )}
          {villagesHook.isError && (
            <div className="col-span-3 text-center py-16">
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-red-500" />
              </div>
              <p className="text-red-600 font-medium">गावे लोड करण्यात अयशस्वी.</p>
            </div>
          )}
          {!villagesHook.isLoading && !villagesHook.isError && filteredVillages.map((village, index) => (
            <div key={village.id} className="stagger-animation" style={{ animationDelay: `${index * 0.05}s` }}>
              <VillageCard
                village={village}
                onClick={handleVillageSelect}
              />
            </div>
          ))}
          {!villagesHook.isLoading && !villagesHook.isError && filteredVillages.length === 0 && (
            <div className="col-span-3 text-center py-16">
              <div className="w-20 h-20 bg-muted/30 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">कोणतेही गाव सापडले नाहीत</h3>
              <p className="text-muted-foreground">वेगळ्या शब्दाने शोध करून पहा</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderFarmersView = () => {
    const farmers = (farmersHook.data || []).filter(f => f.village_id === viewState.selectedVillage?.id);
    const filteredFarmers = farmers.filter(farmer =>
      farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.mobile_no.includes(searchQuery)
    );

    return (
      <div className="space-y-3 sm:space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">{viewState.selectedVillage?.village_name} मधील शेतकरी</h2>
          </div>
          {isAdmin && (
            <Button className="bg-primary hover:bg-primary-hover shadow-minimal w-full sm:w-auto h-10 sm:h-auto px-4 sm:px-6 py-2 sm:py-3" onClick={() => { setEditingFarmer(null); setFarmerDialogOpen(true); }}>
              <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="text-sm sm:text-base">शेतकरी जोडा</span>
            </Button>
          )}
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="शेतकरी शोधा..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-0 bg-white/90 focus:bg-white shadow-sm focus:shadow-md transition-colors h-10 text-sm"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {farmersHook.isLoading && (
            <div className="col-span-3 text-center text-muted-foreground">शेतकरी लोड करत आहे...</div>
          )}
          {farmersHook.isError && (
              <p className="text-sm text-destructive">शेतकरी लोड करण्यात अयशस्वी.</p>
          )}
          {!farmersHook.isLoading && !farmersHook.isError && filteredFarmers.map(farmer => (
            <FarmerCard
              key={farmer.id}
              farmer={farmer}
              onClick={handleFarmerSelect}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderFarmerProfileView = () => {
    const farmerProducts = productsHook.data || [];
    
    // Filter products based on search query
    const filteredProducts = farmerProducts.filter(product =>
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
      <div className="space-y-4 sm:space-y-10 page-transition">
        {/* Farmer Info Card - Single Line Layout */}
        <div className="bg-gradient-surface rounded-lg border border-border/50 p-3 sm:p-4 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
          <div className="relative z-10">
            {/* Single line compact layout: Icon → Name → Phone */}
            <div className="flex items-center justify-between gap-3 min-h-[50px] sm:min-h-[60px]">
              {/* Left side: Icon + Name */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground truncate">
                  {viewState.selectedFarmer?.name}
                </h3>
              </div>
              
              {/* Right side: Phone */}
              <div className="flex items-center gap-2 text-muted-foreground bg-muted/20 rounded-lg px-3 py-2 flex-shrink-0">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-pink/10 rounded-md flex items-center justify-center">
                  <Phone className="h-3 w-3 text-pink" />
                </div>
                <span className="font-medium text-xs sm:text-sm">
                  {viewState.selectedFarmer?.mobile_no || "मोबाइल नंबर नाही"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="space-y-4 sm:space-y-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <div className="space-y-1 sm:space-y-2">
              <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-foreground">
                <span className="gradient-text-primary">उत्पादने</span> आणि उपकरणे
              </h3>
            </div>
            {isAdmin && (
              <Button 
                className="bg-gradient-primary hover:shadow-lg transform hover:scale-105 transition-all duration-200 px-4 sm:px-6 py-2 sm:py-3 text-white font-medium w-full sm:w-auto" 
                onClick={() => { setEditingProduct(null); setProductDialogOpen(true); }}
                size="lg"
              >
                <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                उत्पादन जोडा
              </Button>
            )}
          </div>

          {/* Search Products */}
          <div className="relative max-w-md mx-auto sm:mx-0">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="उत्पादने शोधा..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 border-0 bg-white/90 focus:bg-white shadow-sm focus:shadow-md transition-all duration-300 rounded-xl text-base placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Products Grid/Table */}
          {productsHook.isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center space-y-3">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-muted-foreground">उत्पादने लोड करत आहे...</p>
              </div>
            </div>
          )}
          
          {productsHook.isError && (
            <div className="flex items-center justify-center py-12">
              <p className="text-destructive">उत्पादने लोड करण्यात अयशस्वी.</p>
            </div>
          )}
          
          {!productsHook.isLoading && !productsHook.isError && farmerProducts.length === 0 && (
            <div className="text-center py-8 sm:py-12 bg-muted/30 rounded-xl border border-dashed border-border">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Plus className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
              </div>
              <h4 className="text-base sm:text-lg font-medium mb-2 text-foreground">अजून कोणतीही उत्पादने नाहीत</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">या शेतकऱ्याला दिलेली उत्पादने ट्रॅक करणे सुरू करा</p>
              {isAdmin && (
                <Button 
                  variant="outline" 
                  onClick={() => { setEditingProduct(null); setProductDialogOpen(true); }}
                  className="border-border hover:bg-muted text-sm h-9 px-4"
                >
                  पहिले उत्पादन जोडा
                </Button>
              )}
            </div>
          )}
          
          {!productsHook.isLoading && !productsHook.isError && filteredProducts.length > 0 && (
            <div className="space-y-2 sm:space-y-3">
              {filteredProducts.map((product, index) => (
                <div key={product.id} className="bg-card border border-border/50 shadow-sm rounded-lg p-2 sm:p-3 hover:shadow-md transition-all">
                  {/* Single line compact layout: Icon → Name → Details → Actions */}
                  <div className="flex items-center justify-between gap-2 sm:gap-3 min-h-[50px] sm:min-h-[60px]">
                    {/* Left side: Icon + Product Details */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs sm:text-sm font-medium text-primary">
                          {product.product_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm sm:text-base text-foreground truncate">
                          {product.product_name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                          <span>{product.quantity} {product.unit}</span>
                          <span>•</span>
                          <span>{new Date(product.given_date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Right side: Action Icons */}
                    {isAdmin && (
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => { setEditingProduct(product); setProductDialogOpen(true); }}
                          className="h-8 w-8 p-0 hover:bg-muted"
                        >
                          <Edit className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0 hover:bg-destructive/10 text-destructive/70 hover:text-destructive" 
                          onClick={async () => {
                            const ok = window.confirm(`उत्पादन "${product.product_name}" हटवायचे?`);
                            if (!ok) return;
                            try {
                              await productsHook.deleteProduct.mutateAsync(product.id);
                            } catch (e: any) {
                              toast({ title: 'उत्पादन हटवण्यात अयशस्वी', description: e.message });
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* No search results */}
          {!productsHook.isLoading && !productsHook.isError && farmerProducts.length > 0 && filteredProducts.length === 0 && (
            <div className="text-center py-8 sm:py-12 bg-muted/30 rounded-xl border border-dashed border-border">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Search className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground" />
              </div>
              <h4 className="text-base sm:text-lg font-medium mb-2 text-foreground">कोणतीही उत्पादने सापडली नाहीत</h4>
              <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">वेगळ्या शब्दाने शोध करून पहा</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (viewState.mode) {
      case 'villages':
        return renderVillagesView();
      case 'farmers':
        return renderFarmersView();
      case 'farmer-profile':
        return renderFarmerProfileView();
      default:
        return <Dashboard onGroupSelect={handleGroupSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <div className="relative z-10">
      <Navbar />
      <main className="px-2 sm:px-4 lg:px-8 py-3 sm:py-6">
        <div className="max-w-7xl mx-auto space-y-3 sm:space-y-6">
          {/* Navigation */}
          {viewState.mode !== 'dashboard' && (
            <div className="space-y-3 sm:space-y-6 fade-in">
              <div className="flex items-center justify-start">
                <Button 
                  onClick={handleBack}
                  className="group relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 rounded-2xl px-4 sm:px-6 py-2 sm:py-3 h-10 sm:h-12 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 perspective-1000"
                >
                  {/* Animated background overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                  
                  {/* 3D effect elements */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl group-hover:rotate-y-12 transition-transform duration-300"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 flex items-center gap-2 sm:gap-3">
                    <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:-translate-x-1 group-hover:scale-110" />
                    <span className="font-semibold text-xs sm:text-sm tracking-wide">Back</span>
                  </div>
                  
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-blue-400/30 blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
                </Button>
              </div>
              {renderBreadcrumb()}
            </div>
          )}

          {/* Content */}
          {renderContent()}
        </div>
      </main>

      {/* Form Dialogs - Only for admins */}
      {isAdmin && (
        <>
          <VillageFormDialog
            open={villageDialogOpen}
            onOpenChange={setVillageDialogOpen}
            initialData={editingVillage}
            groupId={viewState.selectedGroup?.id}
            onSubmit={async (values) => {
              try {
                if (editingVillage) {
                  await villagesHook.updateVillage.mutateAsync({ id: editingVillage.id, ...values });
                } else {
                  await villagesHook.addVillage.mutateAsync(values);
                }
                setVillageDialogOpen(false);
                setEditingVillage(null);
              } catch (e: any) {
                toast({ title: 'Failed to save village', description: e.message });
              }
            }}
          />
          
          <FarmerFormDialog
            open={farmerDialogOpen}
            onOpenChange={setFarmerDialogOpen}
            initialData={editingFarmer}
            villageId={viewState.selectedVillage?.id}
            groupId={viewState.selectedGroup?.id}
            onSubmit={async (values) => {
              try {
                if (editingFarmer) {
                  await farmersHook.updateFarmer.mutateAsync({ id: editingFarmer.id, ...values });
                } else {
                  await farmersHook.addFarmer.mutateAsync(values);
                }
                setFarmerDialogOpen(false);
                setEditingFarmer(null);
              } catch (e: any) {
                toast({ title: 'Failed to save farmer', description: e.message });
              }
            }}
          />
          
          <ProductFormDialog
            open={productDialogOpen}
            onOpenChange={setProductDialogOpen}
            initialData={editingProduct}
            farmerId={viewState.selectedFarmer?.id}
            onSubmit={async (values) => {
              try {
                if (editingProduct) {
                  await productsHook.updateProduct.mutateAsync({ id: editingProduct.id, ...values });
                } else {
                  await productsHook.addProduct.mutateAsync(values);
                }
                setProductDialogOpen(false);
                setEditingProduct(null);
              } catch (e: any) {
                toast({ title: 'Failed to save product', description: e.message });
              }
            }}
          />
        </>
      )}
      </div>
    </div>
  );
}