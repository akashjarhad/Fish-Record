import { useState, useEffect } from 'react';
import { useUserRole } from '@/contexts/UserRoleContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { UserPlus, UserMinus, Shield, Mail, Trash2, Users } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export default function AdminManagement() {
  const { isAdmin, isSystemAdmin, addAdminUser, removeAdminUser, getAllAdminUsers } = useUserRole();
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [adminUsers, setAdminUsers] = useState<string[]>([]);

  useEffect(() => {
    const loadAdminUsers = async () => {
      const users = await getAllAdminUsers();
      setAdminUsers(users);
    };
    loadAdminUsers();
  }, [getAllAdminUsers]);

  if (!isSystemAdmin) {
    return (
      <Card className="glass border-0 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20">
        <CardContent className="text-center py-4 sm:py-8">
          <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-white/50 mx-auto mb-3 sm:mb-4" />
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">Access Denied</h3>
          <p className="text-white/70 text-xs sm:text-base">Only system administrators can access this section.</p>
        </CardContent>
      </Card>
    );
  }

  const handleAddAdmin = async () => {
    if (!newAdminEmail.trim()) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
        variant: 'destructive'
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newAdminEmail)) {
      toast({
        title: 'Invalid Email Format',
        description: 'Please enter a valid email address.',
        variant: 'destructive'
      });
      return;
    }

    const result = await addAdminUser(newAdminEmail);
    
    if (result.success) {
      const updatedAdmins = await getAllAdminUsers();
      setAdminUsers(updatedAdmins);
      setNewAdminEmail('');
      setIsAddDialogOpen(false);
      
      toast({
        title: 'Admin Added Successfully',
        description: `${newAdminEmail} has been granted admin privileges.`,
      });
    } else {
      toast({
        title: 'Failed to Add Admin',
        description: result.error || 'An error occurred while adding the admin user.',
        variant: 'destructive'
      });
    }
  };

  const handleRemoveAdmin = async (email: string) => {
    const result = await removeAdminUser(email);
    
    if (result.success) {
      const updatedAdmins = await getAllAdminUsers();
      setAdminUsers(updatedAdmins);
      
      toast({
        title: 'Admin Removed',
        description: `${email} admin privileges have been revoked.`,
      });
    } else {
      toast({
        title: 'Failed to Remove Admin',
        description: result.error || 'An error occurred while removing the admin user.',
        variant: 'destructive'
      });
    }
  };

  const checkIsSystemAdmin = (email: string) => {
    return ['rohitunde5@gmail.com', 'rohit.unde.project@gmail.com'].includes(email.toLowerCase());
  };

  return (
    <div className="space-y-3 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="text-center sm:text-left">
          <h2 className="text-lg sm:text-3xl font-bold text-white mb-1 sm:mb-2">Admin Management</h2>
          <p className="text-white/70 text-xs sm:text-base">Manage administrator access</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl w-full sm:w-auto h-10 sm:h-auto px-4 sm:px-6 py-2 sm:py-3">
              <UserPlus className="w-3 h-3 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              <span className="text-xs sm:text-base">Add Admin</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="glass border-0 rounded-3xl shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20 mx-2 sm:mx-0 max-w-sm sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white text-lg sm:text-xl">Add Administrator</DialogTitle>
              <DialogDescription className="text-white/70 text-sm">
                Grant admin privileges to a new user.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white/90 text-xs sm:text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white/50" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    className="pl-10 sm:pl-12 h-10 sm:h-12 bg-white/5 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/10 transition-all duration-300 rounded-2xl backdrop-blur-sm text-sm"
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-3">
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-2xl h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddAdmin}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-2xl h-9 sm:h-10 px-3 sm:px-4 text-xs sm:text-sm"
              >
                Add Admin
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Card */}
      <Card className="glass border-0 rounded-2xl sm:rounded-3xl shadow-2xl backdrop-blur-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20">
        <CardHeader className="pb-2 sm:pb-6">
          <CardTitle className="text-white flex items-center gap-2 text-sm sm:text-lg">
            <Users className="w-4 h-4 sm:w-6 sm:h-6" />
            Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            <div className="text-center p-2 sm:p-0">
              <div className="text-lg sm:text-3xl font-bold text-white mb-1">{adminUsers.length}</div>
              <div className="text-white/70 text-xs leading-tight">Total<br className="sm:hidden" /> Admins</div>
            </div>
            <div className="text-center p-2 sm:p-0">
              <div className="text-lg sm:text-3xl font-bold text-white mb-1">
                {adminUsers.filter(email => checkIsSystemAdmin(email)).length}
              </div>
              <div className="text-white/70 text-xs leading-tight">System<br className="sm:hidden" /> Admins</div>
            </div>
            <div className="text-center p-2 sm:p-0">
              <div className="text-lg sm:text-3xl font-bold text-white mb-1">
                {adminUsers.filter(email => !checkIsSystemAdmin(email)).length}
              </div>
              <div className="text-white/70 text-xs leading-tight">Custom<br className="sm:hidden" /> Admins</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Users List */}
      <Card className="glass border-0 rounded-2xl sm:rounded-3xl shadow-2xl backdrop-blur-xl bg-white/10 border border-white/20">
        <CardHeader className="pb-2 sm:pb-6">
          <CardTitle className="text-white text-sm sm:text-lg">Admin Users</CardTitle>
          <CardDescription className="text-white/70 text-xs sm:text-sm">
            All users with admin privileges
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {adminUsers.length === 0 ? (
              <div className="text-center py-4 sm:py-8">
                <Shield className="w-8 h-8 sm:w-12 sm:h-12 text-white/50 mx-auto mb-2 sm:mb-3" />
                <p className="text-white/70 text-xs sm:text-base">No administrators found</p>
              </div>
            ) : (
              adminUsers.map((email, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3 p-2 sm:p-4 bg-white/5 rounded-xl sm:rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-white font-medium text-xs sm:text-base truncate">{email}</div>
                      <div className="flex items-center gap-1 sm:gap-2 mt-1">
                        <Badge 
                          variant={checkIsSystemAdmin(email) ? "default" : "secondary"}
                          className={`text-xs px-1 py-0 sm:px-2 sm:py-1 ${checkIsSystemAdmin(email) 
                              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                          }`}
                        >
                          {checkIsSystemAdmin(email) ? 'System' : 'Custom'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  {!checkIsSystemAdmin(email) && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveAdmin(email)}
                      className="bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30 hover:border-red-500/50 rounded-lg sm:rounded-xl w-full sm:w-auto flex-shrink-0 h-8 sm:h-auto px-2 sm:px-3 py-1 sm:py-2"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      <span className="text-xs">Remove</span>
                    </Button>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
