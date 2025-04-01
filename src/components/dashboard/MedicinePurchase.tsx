import React, { useState } from 'react';
import { Search, ShoppingCart, TrendingUp, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface Medicine {
  id: string;
  name: string;
  manufacturer: string;
  price: number;
  availability: boolean;
  prescription_required: boolean;
  delivery_estimate: string;
  vendors: {
    name: string;
    price: number;
    delivery_fee: number;
  }[];
}

const mockMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Amoxicillin 500mg',
    manufacturer: 'PharmaCorp',
    price: 12.99,
    availability: true,
    prescription_required: true,
    delivery_estimate: '1-2 days',
    vendors: [
      { name: 'PharmEasy', price: 12.99, delivery_fee: 2 },
      { name: '1mg', price: 13.50, delivery_fee: 0 },
      { name: 'Local Pharmacy', price: 11.99, delivery_fee: 3 },
    ],
  },
  {
    id: '2',
    name: 'Paracetamol 650mg',
    manufacturer: 'HealthCare Ltd',
    price: 5.99,
    availability: true,
    prescription_required: false,
    delivery_estimate: 'Same Day',
    vendors: [
      { name: 'PharmEasy', price: 5.99, delivery_fee: 2 },
      { name: '1mg', price: 6.50, delivery_fee: 0 },
      { name: 'Local Pharmacy', price: 5.50, delivery_fee: 3 },
    ],
  },
];

const MedicinePurchase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<{
    name: string;
    price: number;
    delivery_fee: number;
  } | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlePurchase = () => {
    if (!selectedMedicine || !selectedVendor) {
      toast.error('Please select a medicine and vendor');
      return;
    }

    if (selectedMedicine.prescription_required) {
      toast.info('Please upload prescription to proceed');
      return;
    }

    toast.success(`Order placed for ${selectedMedicine.name} from ${selectedVendor.name}`);
    // Reset selection
    setSelectedMedicine(null);
    setSelectedVendor(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Search medicines by name"
            value={searchQuery}
            onChange={handleSearch}
            className="w-full"
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <Button variant="outline">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockMedicines.map((medicine) => (
          <Card
            key={medicine.id}
            className={`cursor-pointer transition-all ${selectedMedicine?.id === medicine.id ? 'ring-2 ring-primary' : ''}`}
            onClick={() => setSelectedMedicine(medicine)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{medicine.name}</h3>
                  <p className="text-sm text-muted-foreground">{medicine.manufacturer}</p>
                </div>
                <div className="flex items-center">
                  <span className="font-medium">${medicine.price}</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
                    <Truck className="h-3 w-3 mr-1" />
                    {medicine.delivery_estimate}
                  </Badge>
                  {medicine.prescription_required && (
                    <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500">
                      Prescription Required
                    </Badge>
                  )}
                </div>
              </div>

              {selectedMedicine?.id === medicine.id && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Available Vendors</p>
                  <div className="space-y-2">
                    {medicine.vendors.map((vendor) => (
                      <Button
                        key={vendor.name}
                        variant="outline"
                        className={`w-full justify-between ${selectedVendor?.name === vendor.name ? 'bg-primary text-primary-foreground' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVendor(vendor);
                        }}
                      >
                        <span>{vendor.name}</span>
                        <div className="flex items-center space-x-2">
                          <span>${vendor.price}</span>
                          {vendor.delivery_fee > 0 && (
                            <span className="text-sm text-muted-foreground">
                              +${vendor.delivery_fee} delivery
                            </span>
                          )}
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedMedicine && selectedVendor && (
        <div className="flex justify-end">
          <Button onClick={handlePurchase}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Purchase Medicine
          </Button>
        </div>
      )}

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Price Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockMedicines.map((medicine) => (
              <div key={medicine.id} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{medicine.name}</p>
                  <p className="text-sm text-muted-foreground">{medicine.manufacturer}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span>
                    ${Math.min(...medicine.vendors.map(v => v.price))} - ${Math.max(...medicine.vendors.map(v => v.price))}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicinePurchase;