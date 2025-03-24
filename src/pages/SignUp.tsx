
import React, { useState } from 'react';
import { Shield, ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const SignUp = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [step, setStep] = useState(1);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill all required fields");
      setIsSubmitting(false);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Account created successfully! Redirecting to dashboard...");
      
      // Wait a bit before redirecting to show the success message
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-0">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 neo-gradient opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-[10%] w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl animate-pulse-soft"></div>
          <div className="absolute bottom-10 right-[10%] w-80 h-80 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-[40%] right-[20%] w-64 h-64 bg-health-600/10 rounded-full filter blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
      
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="h-14 w-14 rounded-lg bg-health-600 flex items-center justify-center">
            <Shield className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-lg p-6 shadow-xl">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-muted-foreground mt-2">Join HealthVault to manage your healthcare data securely</p>
          </div>
          
          {step === 1 ? (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="John Doe" 
                    className="bg-black/20 border-white/10 mt-1"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="johndoe@example.com"
                    className="bg-black/20 border-white/10 mt-1"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-health-600 hover:bg-health-700"
                >
                  Continue
                </Button>
                
                <div className="text-center mt-6">
                  <p className="text-sm text-muted-foreground">
                    Already have an account? <Link to="/" className="text-health-400 hover:underline">Sign in</Link>
                  </p>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    name="password" 
                    type="password" 
                    placeholder="••••••••"
                    className="bg-black/20 border-white/10 mt-1"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    type="password" 
                    placeholder="••••••••"
                    className="bg-black/20 border-white/10 mt-1"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    type="button" 
                    variant="outline"
                    className="border-white/10 flex-1"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  
                  <Button 
                    type="submit" 
                    className="bg-health-600 hover:bg-health-700 flex-1"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Create Account
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="text-center mt-6">
                  <p className="text-sm text-muted-foreground">
                    By signing up, you agree to our <a href="#" className="text-health-400 hover:underline">Terms of Service</a> and <a href="#" className="text-health-400 hover:underline">Privacy Policy</a>
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
