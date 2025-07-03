
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Replace with actual authentication API call
      // Simulating login for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accepting any valid email/password combination
      if (email && password.length >= 6) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", email);
        
        toast({
          title: "Login Successful",
          description: "Welcome to TPO Management Portal",
        });
        
        // Redirect to dashboard
        window.location.href = "/dashboard";
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Password must be at least 6 characters.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-dark flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-accent-yellow p-3 rounded-lg">
              <GraduationCap className="h-8 w-8 text-primary-dark" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-primary-dark">
            SUVIDHA FOUNDATION
          </CardTitle>
          <CardDescription className="text-secondary-blue">
            TPO Management Portal - Secure Login
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary-dark font-semibold">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-gray-300 focus:border-accent-yellow"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-primary-dark font-semibold">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-2 border-gray-300 focus:border-accent-yellow pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-dark"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-accent-yellow text-primary-dark hover:bg-yellow-400 font-semibold py-2 h-12"
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Demo credentials: Any valid email and password (6+ characters)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
