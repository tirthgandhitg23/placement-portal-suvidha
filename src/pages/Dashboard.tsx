
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useTPOData } from "@/hooks/useTPOData";
import AddTPOModal from "@/components/AddTPOModal";
import TPOTable from "@/components/TPOTable";

const Dashboard = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { tpoData, loading: dataLoading } = useTPOData();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary-dark shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-accent-yellow p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary-dark" />
              </div>
              <div className="text-white">
                <h1 className="text-lg font-bold">TPO MANAGEMENT PORTAL</h1>
                <p className="text-xs text-gray-300">Training & Placement Officer Portal</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-white text-sm">Welcome, {user.email}</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="text-white border-white hover:bg-white hover:text-primary-dark"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-primary-dark mb-2">Dashboard</h2>
          <p className="text-gray-600">Manage Training & Placement Officer details</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total TPOs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary-dark">{tpoData.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Colleges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary-blue">
                {new Set(tpoData.map(tpo => tpo.college)).size}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent-yellow">
                {tpoData.filter(tpo => {
                  const createdAt = new Date(tpo.created_at);
                  const now = new Date();
                  return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear();
                }).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* TPO Management Section */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl text-primary-dark">TPO Details</CardTitle>
                <CardDescription>Manage Training & Placement Officer information</CardDescription>
              </div>
              <AddTPOModal />
            </div>
          </CardHeader>
          
          <CardContent>
            <TPOTable tpoData={tpoData} loading={dataLoading} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
