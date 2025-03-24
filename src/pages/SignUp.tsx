
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { toast } from '@/hooks/use-toast';

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created",
        description: "Welcome to HealthVault! Your account has been created successfully.",
      });
      // Navigate to dashboard after successful signup
      navigate('/dashboard');
    }, 1500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome back",
        description: "You have successfully logged in to HealthVault.",
      });
      // Navigate to dashboard after successful login
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 neo-gradient opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-[10%] w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse-soft"></div>
          <div className="absolute bottom-10 right-[10%] w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-[40%] right-[20%] w-64 h-64 bg-purple-600/10 rounded-full filter blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      {/* Back to home */}
      <div className="p-6">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <AnimatedSection 
          className="w-full max-w-md" 
          animation="scale-in"
        >
          <div className="relative backdrop-blur-md bg-black/20 border border-white/10 rounded-2xl p-6 shadow-xl">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-600/5 rounded-2xl"></div>
            
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-lg bg-health-600 flex items-center justify-center mx-auto mb-4">
                <Shield className="text-background h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold text-glow mb-2">Join HealthVault</h1>
              <p className="text-muted-foreground">Your secure health records platform</p>
            </div>

            <Tabs defaultValue="signup" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                <TabsTrigger value="login">Login</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="text" 
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Full Name" 
                        className="pl-10 bg-background/50 border-white/10 focus-visible:ring-health-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email" 
                        className="pl-10 bg-background/50 border-white/10 focus-visible:ring-health-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password" 
                        className="pl-10 bg-background/50 border-white/10 focus-visible:ring-health-500"
                        required
                        minLength={8}
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-health-600 hover:bg-health-700 text-white font-medium transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email" 
                        className="pl-10 bg-background/50 border-white/10 focus-visible:ring-health-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password" 
                        className="pl-10 bg-background/50 border-white/10 focus-visible:ring-health-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="text-sm text-right">
                    <a href="#" className="text-health-400 hover:text-health-300 transition-colors">
                      Forgot password?
                    </a>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-health-600 hover:bg-health-700 text-white font-medium transition-all"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-muted-foreground">
              <p>By continuing, you agree to our</p>
              <div className="mt-1 space-x-2">
                <a href="#" className="text-health-400 hover:text-health-300 transition-colors">Terms of Service</a>
                <span>&</span>
                <a href="#" className="text-health-400 hover:text-health-300 transition-colors">Privacy Policy</a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default SignUp;
