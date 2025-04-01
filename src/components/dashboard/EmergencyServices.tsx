import React, { useState } from 'react';
import { AlertCircle, MapPin, Phone, Share2, Heart, Clock, Ambulance, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface Hospital {
  id: string;
  name: string;
  distance: string;
  address: string;
  phone: string;
  emergency24h: boolean;
  icuAvailable: boolean;
  waitTime?: string;
}

interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

const mockHospitals: Hospital[] = [
  {
    id: '1',
    name: 'City General Hospital',
    distance: '2.3 miles',
    address: '123 Medical Center Blvd, City Center',
    phone: '(555) 123-4567',
    emergency24h: true,
    icuAvailable: true,
    waitTime: '15-20 min',
  },
  {
    id: '2',
    name: 'Memorial Medical Center',
    distance: '3.8 miles',
    address: '456 Healthcare Ave, Westside',
    phone: '(555) 987-6543',
    emergency24h: true,
    icuAvailable: true,
    waitTime: '30-45 min',
  },
  {
    id: '3',
    name: 'Riverside Community Hospital',
    distance: '5.2 miles',
    address: '789 Riverside Dr, Eastside',
    phone: '(555) 456-7890',
    emergency24h: true,
    icuAvailable: false,
    waitTime: '10-15 min',
  },
];

const mockEmergencyContacts: EmergencyContact[] = [
  {
    id: '1',
    name: 'John Smith',
    phone: '(555) 123-4567',
    relationship: 'Spouse',
  },
  {
    id: '2',
    name: 'Mary Johnson',
    phone: '(555) 987-6543',
    relationship: 'Parent',
  },
];

const EmergencyServices = () => {
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [hospitals, setHospitals] = useState<Hospital[]>(mockHospitals);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>(mockEmergencyContacts);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const handleSOS = () => {
    setIsSOSActive(true);
    
    // Start countdown
    let count = 5;
    const interval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      
      if (count <= 0) {
        clearInterval(interval);
        activateSOS();
      }
    }, 1000);
  };

  const cancelSOS = () => {
    setIsSOSActive(false);
    setCountdown(5);
    toast.info('SOS alert canceled');
  };

  const activateSOS = () => {
    toast.success('Emergency contacts notified with your location');
    setIsSOSActive(false);
    setCountdown(5);
    
    // In a real app, this would send notifications to emergency contacts
    // and potentially call emergency services
  };

  const refreshLocation = () => {
    setIsLoadingLocation(true);
    
    // Simulate getting location and refreshing nearby hospitals
    setTimeout(() => {
      toast.success('Location updated');
      setIsLoadingLocation(false);
    }, 1500);
  };

  const callHospital = (phone: string) => {
    // In a real app, this would initiate a phone call
    toast.info(`Calling ${phone}...`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Emergency Services</h2>
          <p className="text-muted-foreground">
            Quick access to emergency services and contacts
          </p>
        </div>
        <Button
          variant="outline"
          onClick={refreshLocation}
          disabled={isLoadingLocation}
        >
          <MapPin className={`h-4 w-4 mr-2 ${isLoadingLocation ? 'animate-pulse' : ''}`} />
          Update Location
        </Button>
      </div>

      {isSOSActive ? (
        <Card className="border-red-500 bg-red-950/20">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold mb-2">Emergency Alert Countdown</h2>
            <p className="text-xl font-semibold mb-4">{countdown}</p>
            <p className="mb-6">Your location and medical information will be sent to your emergency contacts.</p>
            <Button variant="destructive" size="lg" onClick={cancelSOS}>
              Cancel SOS Alert
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-red-500">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Emergency SOS</h2>
            <p className="mb-6">Press the button below to alert your emergency contacts with your location and medical information.</p>
            <Button variant="destructive" size="lg" onClick={handleSOS}>
              <AlertCircle className="h-5 w-5 mr-2" />
              Activate SOS
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Nearby Hospitals</h3>
          {hospitals.map((hospital) => (
            <Card key={hospital.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{hospital.name}</h4>
                  <Badge variant="outline" className="bg-blue-900/30 text-blue-400">
                    {hospital.distance}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{hospital.address}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {hospital.emergency24h && (
                    <Badge variant="outline" className="bg-green-900/30 text-green-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      24/7 Emergency
                    </Badge>
                  )}
                  {hospital.icuAvailable && (
                    <Badge variant="outline" className="bg-purple-900/30 text-purple-400 flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      ICU Available
                    </Badge>
                  )}
                  {hospital.waitTime && (
                    <Badge variant="outline" className="bg-amber-900/30 text-amber-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Wait: {hospital.waitTime}
                    </Badge>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <Button variant="outline" size="sm" onClick={() => {}}>
                    <MapPin className="h-4 w-4 mr-1" />
                    Directions
                  </Button>
                  <Button variant="default" size="sm" onClick={() => callHospital(hospital.phone)}>
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Emergency Contacts</h3>
            <Button variant="ghost" size="sm">
              <Users className="h-4 w-4 mr-1" />
              Manage
            </Button>
          </div>
          
          {emergencyContacts.map((contact) => (
            <Card key={contact.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-medium">{contact.name}</h4>
                  <Badge variant="outline">{contact.relationship}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{contact.phone}</p>
                
                <div className="flex justify-between items-center">
                  <Button variant="outline" size="sm" onClick={() => {}}>
                    <Share2 className="h-4 w-4 mr-1" />
                    Share Location
                  </Button>
                  <Button variant="default" size="sm" onClick={() => callHospital(contact.phone)}>
                    <Phone className="h-4 w-4 mr-1" />
                    Call
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          
          <Card className="border border-dashed border-muted-foreground/20">
            <CardContent className="p-4">
              <div className="text-center py-4">
                <Users className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="font-medium">Add Emergency Contact</p>
                <p className="text-xs text-muted-foreground mt-1 mb-3">
                  Add people who should be contacted in case of emergency
                </p>
                <Button variant="outline" size="sm">
                  Add Contact
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Emergency Information</CardTitle>
              <CardDescription>
                This information will be shared with emergency responders
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Blood Type</p>
                <div className="flex items-center gap-2">
                  <Badge className="bg-red-900/30 text-red-400">A+</Badge>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    Edit
                  </Button>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Allergies</p>
                <div className="flex items-center gap-2">
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="bg-amber-900/30 text-amber-400">Penicillin</Badge>
                    <Badge variant="outline" className="bg-amber-900/30 text-amber-400">Peanuts</Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    Edit
                  </Button>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Medical Conditions</p>
                <div className="flex items-center gap-2">
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="bg-blue-900/30 text-blue-400">Asthma</Badge>
                    <Badge variant="outline" className="bg-blue-900/30 text-blue-400">Hypertension</Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    Edit
                  </Button>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Current Medications</p>
                <div className="flex items-center gap-2">
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="bg-green-900/30 text-green-400">Albuterol</Badge>
                    <Badge variant="outline" className="bg-green-900/30 text-green-400">Lisinopril</Badge>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmergencyServices;