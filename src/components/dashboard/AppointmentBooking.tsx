import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Search, Star, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  location: string;
  availableSlots: string[];
  acceptsInsurance: boolean;
  telemedicineAvailable: boolean;
}

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    specialty: 'Cardiologist',
    rating: 4.8,
    location: 'Downtown Medical Center',
    availableSlots: ['9:00 AM', '2:30 PM', '4:00 PM'],
    acceptsInsurance: true,
    telemedicineAvailable: true,
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Family Medicine',
    rating: 4.9,
    location: 'Westside Health Clinic',
    availableSlots: ['10:30 AM', '1:00 PM', '3:30 PM'],
    acceptsInsurance: true,
    telemedicineAvailable: true,
  },
];

const AppointmentBooking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleBookAppointment = () => {
    if (!selectedDoctor || !selectedSlot) {
      toast.error('Please select a doctor and time slot');
      return;
    }
    toast.success(`Appointment booked with ${selectedDoctor.name} at ${selectedSlot}`);
    // Reset selection
    setSelectedDoctor(null);
    setSelectedSlot('');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search doctors by name, specialty, or location"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full"
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <Button variant="outline">
          <MapPin className="h-4 w-4 mr-2" />
          Near Me
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockDoctors.map((doctor) => (
          <Card
            key={doctor.id}
            className={`cursor-pointer transition-all ${selectedDoctor?.id === doctor.id ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setSelectedDoctor(doctor)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{doctor.name}</h3>
                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm">{doctor.rating}</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2" />
                  {doctor.location}
                </div>
                <div className="flex items-center space-x-2">
                  {doctor.acceptsInsurance && (
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                      Insurance Accepted
                    </Badge>
                  )}
                  {doctor.telemedicineAvailable && (
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                      <Video className="h-3 w-3 mr-1" />
                      Telemedicine
                    </Badge>
                  )}
                </div>
              </div>

              {selectedDoctor?.id === doctor.id && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Available Slots</p>
                  <div className="flex flex-wrap gap-2">
                    {doctor.availableSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant="outline"
                        size="sm"
                        className={`${selectedSlot === slot ? 'bg-primary text-primary-foreground' : ''}`}
                        onClick={() => setSelectedSlot(slot)}
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedDoctor && selectedSlot && (
        <div className="flex justify-end">
          <Button onClick={handleBookAppointment}>
            <Calendar className="h-4 w-4 mr-2" />
            Book Appointment
          </Button>
        </div>
      )}
    </div>
  );
};

export default AppointmentBooking;