
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GraduationCap, Plus, Search, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for TPO entries
const mockTPOData = [
  { id: 1, name: "Dr. Rajesh Kumar", college: "ABC Engineering College", email: "rajesh.kumar@abc.edu", contact: "9876543210" },
  { id: 2, name: "Prof. Priya Sharma", college: "XYZ Institute of Technology", email: "priya.sharma@xyz.edu", contact: "9876543211" },
  { id: 3, name: "Mr. Amit Patel", college: "DEF University", email: "amit.patel@def.edu", contact: "9876543212" },
  { id: 4, name: "Dr. Sunita Singh", college: "GHI College of Engineering", email: "sunita.singh@ghi.edu", contact: "9876543213" },
  { id: 5, name: "Prof. Vikram Gupta", college: "JKL Technical Institute", email: "vikram.gupta@jkl.edu", contact: "9876543214" },
];

const Dashboard = () => {
  const [tpoData, setTpoData] = useState(mockTPOData);
  const [searchTerm, setSearchTerm] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const email = localStorage.getItem("userEmail");
    
    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }
    
    setUserEmail(email || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    window.location.href = "/login";
  };

  const filteredData = tpoData.filter((tpo) =>
    tpo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tpo.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tpo.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTPO = () => {
    // TODO: Open modal form for adding TPO
    toast({
      title: "Feature Coming Soon",
      description: "Add TPO modal will be implemented next",
    });
  };

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
                <h1 className="text-lg font-bold">SUVIDHA FOUNDATION</h1>
                <p className="text-xs text-gray-300">TPO Management Portal</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-white text-sm">Welcome, {userEmail}</span>
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
              <CardTitle className="text-sm font-medium text-gray-600">Recent Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent-yellow">
                {Math.min(10, tpoData.length)}
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
                <CardDescription>Last 10 entries from the database</CardDescription>
              </div>
              <Button
                onClick={handleAddTPO}
                className="bg-accent-yellow text-primary-dark hover:bg-yellow-400 font-semibold"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Details
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, college, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2 border-gray-300 focus:border-accent-yellow"
                />
              </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-primary-dark">Sr No.</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-primary-dark">Name of Person</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-primary-dark">Name of College</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-primary-dark">Email ID</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-primary-dark">Contact No.</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.slice(0, 10).map((tpo, index) => (
                    <tr key={tpo.id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">{index + 1}</td>
                      <td className="border border-gray-300 px-4 py-3 font-medium">{tpo.name}</td>
                      <td className="border border-gray-300 px-4 py-3">{tpo.college}</td>
                      <td className="border border-gray-300 px-4 py-3 text-secondary-blue">{tpo.email}</td>
                      <td className="border border-gray-300 px-4 py-3">{tpo.contact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredData.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No TPO records found matching your search.
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
