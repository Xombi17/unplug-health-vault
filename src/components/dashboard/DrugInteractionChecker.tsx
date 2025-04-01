import React, { useState, useEffect } from 'react';
import { AlertTriangle, Plus, X, Search, Pill, Shield, Info, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { drugService, Drug, Interaction } from '@/lib/services/drugService';
import GlassMorphismCard from '@/components/ui/GlassMorphismCard';

const DrugInteractionChecker = () => {
  const [userDrugs, setUserDrugs] = useState<Drug[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Drug[]>([]);
  const [interactions, setInteractions] = useState<Interaction[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user's saved medications on component mount
  useEffect(() => {
    const loadUserMedications = async () => {
      try {
        setIsLoading(true);
        const medications = await drugService.getUserMedications();
        setUserDrugs(medications);
      } catch (error) {
        console.error('Error loading medications:', error);
        toast.error('Failed to load your medications');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserMedications();
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const results = await drugService.searchDrugs(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching drugs:', error);
      toast.error('Failed to search medications');
    }
  };

  const addDrug = async (drug: Drug) => {
    // Check if drug is already in the list
    if (userDrugs.some((d) => d.id === drug.id)) {
      toast.error(`${drug.name} is already in your list`);
      return;
    }

    try {
      await drugService.saveMedication(drug);
      setUserDrugs([...userDrugs, drug]);
      setSearchQuery('');
      setSearchResults([]);
      toast.success(`${drug.name} added to your medications`);
    } catch (error) {
      console.error('Error adding medication:', error);
      toast.error('Failed to add medication');
    }
  };

  const removeDrug = async (drugId: string) => {
    try {
      await drugService.removeMedication(drugId);
      const updatedDrugs = userDrugs.filter((drug) => drug.id !== drugId);
      setUserDrugs(updatedDrugs);
      
      // Re-check interactions after removing a drug
      if (updatedDrugs.length > 1) {
        checkInteractions(updatedDrugs);
      } else {
        setInteractions([]);
      }
      
      toast.success('Medication removed');
    } catch (error) {
      console.error('Error removing medication:', error);
      toast.error('Failed to remove medication');
    }
  };

  const checkInteractions = async (drugs = userDrugs) => {
    if (drugs.length < 2) {
      toast.error('Add at least two medications to check for interactions');
      return;
    }

    setIsChecking(true);

    try {
      const drugIds = drugs.map(drug => drug.id);
      const foundInteractions = await drugService.checkInteractions(drugIds);
      
      setInteractions(foundInteractions);
      
      if (foundInteractions.length === 0) {
        toast.success('No interactions found between your medications');
      } else {
        toast.warning(`Found ${foundInteractions.length} potential interaction${foundInteractions.length > 1 ? 's' : ''}`);
      }
    } catch (error) {
      console.error('Error checking interactions:', error);
      toast.error('Failed to check drug interactions');
    } finally {
      setIsChecking(false);
    }
  };

  const getSeverityColor = (severity: Interaction['severity']) => {
    switch (severity) {
      case 'high':
        return 'bg-red-900/30 text-red-400 border-red-800/50';
      case 'medium':
        return 'bg-amber-900/30 text-amber-400 border-amber-800/50';
      case 'low':
        return 'bg-blue-900/30 text-blue-400 border-blue-800/50';
      default:
        return '';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Drug Interaction Checker</h2>
          <p className="text-muted-foreground">
            Check for potential interactions between your medications
          </p>
        </div>
        <Badge variant="outline" className="bg-blue-500/10 text-blue-400 flex items-center gap-1">
          <Shield className="h-3 w-3" />
          AI Powered
        </Badge>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full border-4 border-health-500/30 border-t-health-500 animate-spin"></div>
            <p className="mt-4 text-muted-foreground">Loading your medications...</p>
          </div>
        </div>
      ) : (
        <>
        <GlassMorphismCard>
        <CardHeader>
          <CardTitle>Your Medications</CardTitle>
          <CardDescription>
            Add all medications you're currently taking
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                placeholder="Search for a medication..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Button
              onClick={() => checkInteractions()}
              disabled={userDrugs.length < 2 || isChecking}
            >
              {isChecking ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Checking
                </>
              ) : (
                <>Check Interactions</>
              )}
            </Button>
          </div>

          {searchResults.length > 0 && (
            <Card className="border border-border">
              <CardContent className="p-2 space-y-1">
                {searchResults.map((drug) => (
                  <div
                    key={drug.id}
                    className="p-2 hover:bg-muted rounded-md flex justify-between items-center cursor-pointer"
                    onClick={() => addDrug(drug)}
                  >
                    <div>
                      <p className="font-medium">{drug.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {drug.dosage} • {drug.frequency}
                      </p>
                    </div>
                    <Plus className="h-4 w-4" />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {userDrugs.map((drug) => (
              <div
                key={drug.id}
                className="p-3 border border-border rounded-md flex justify-between items-center group hover:bg-muted/50"
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Pill className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{drug.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {drug.dosage} • {drug.frequency}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeDrug(drug.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {userDrugs.length === 0 && (
            <div className="text-center py-6">
              <Pill className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-muted-foreground">No medications added yet</p>
              <p className="text-xs text-muted-foreground">
                Search and add medications to check for interactions
              </p>
            </div>
          )}
        </CardContent>
      </GlassMorphismCard>

      {interactions.length > 0 && (
        <GlassMorphismCard>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Potential Interactions
            </CardTitle>
            <CardDescription>
              The following interactions were found between your medications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {interactions.map((interaction) => (
              <div
                key={interaction.id}
                className="p-4 border border-border rounded-md space-y-3"
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">
                    {interaction.drugs[0]} + {interaction.drugs[1]}
                  </h3>
                  <Badge
                    variant="outline"
                    className={`${getSeverityColor(interaction.severity)} border`}
                  >
                    {interaction.severity === 'high' ? 'High Risk' : interaction.severity === 'medium' ? 'Medium Risk' : 'Low Risk'}
                  </Badge>
                </div>
                <p className="text-sm">{interaction.description}</p>
                <div className="flex items-start gap-2 bg-muted p-3 rounded-md">
                  <Info className="h-4 w-4 text-blue-400 mt-0.5" />
                  <p className="text-sm">{interaction.recommendation}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </GlassMorphismCard>
      )}
      </>
      )}
    </div>
  );
};

export default DrugInteractionChecker;