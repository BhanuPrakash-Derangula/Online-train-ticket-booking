import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Train, ChevronLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useBooking } from '../context/BookingContext';

export function PassengerDetails() {
  const navigate = useNavigate();
  const { booking, updatePassengers } = useBooking();

  if (!booking.selectedTrain || !booking.selectedSeats.length) {
    navigate('/');
    return null;
  }

  const [passengers, setPassengers] = useState(
    booking.selectedSeats.map(() => ({
      name: '',
      age: 0,
      gender: '',
    }))
  );

  const handlePassengerChange = (index: number, field: string, value: string | number) => {
    const newPassengers = [...passengers];
    newPassengers[index] = { ...newPassengers[index], [field]: value };
    setPassengers(newPassengers);
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    updatePassengers(passengers);
    navigate('/payment');
  };

  const isFormValid = passengers.every(
    p => p.name.trim() !== '' && p.age > 0 && p.gender !== ''
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/seats')}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <div className="flex items-center gap-2">
              <Train className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">RailBook</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-semibold">
                ✓
              </div>
              <span className="text-sm font-medium text-gray-900">Search</span>
            </div>
            <div className="w-16 h-px bg-green-500" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-semibold">
                ✓
              </div>
              <span className="text-sm font-medium text-gray-900">Seats</span>
            </div>
            <div className="w-16 h-px bg-blue-500" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <span className="text-sm font-medium text-blue-600">Passengers</span>
            </div>
            <div className="w-16 h-px bg-gray-300" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-sm font-semibold">
                4
              </div>
              <span className="text-sm font-medium text-gray-600">Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Passenger Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleContinue}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Passenger Details</CardTitle>
              <p className="text-sm text-gray-600">
                Please provide details for all passengers
              </p>
            </CardHeader>
            <CardContent className="space-y-8">
              {passengers.map((passenger, index) => (
                <div key={index} className="space-y-4 pb-8 border-b last:border-b-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold text-lg">
                      Passenger {index + 1} - Seat {booking.selectedSeats[index]}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor={`name-${index}`}>
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`name-${index}`}
                        placeholder="Enter full name"
                        value={passenger.name}
                        onChange={(e) =>
                          handlePassengerChange(index, 'name', e.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`age-${index}`}>
                        Age <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`age-${index}`}
                        type="number"
                        min="1"
                        max="120"
                        placeholder="Age"
                        value={passenger.age || ''}
                        onChange={(e) =>
                          handlePassengerChange(index, 'age', parseInt(e.target.value) || 0)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`gender-${index}`}>
                      Gender <span className="text-red-500">*</span>
                    </Label>
                    <Select
                      value={passenger.gender}
                      onValueChange={(value) =>
                        handlePassengerChange(index, 'gender', value)
                      }
                      required
                    >
                      <SelectTrigger id={`gender-${index}`}>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Booking Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Train</p>
                  <p className="font-semibold">{booking.selectedTrain.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Class</p>
                  <p className="font-semibold">{booking.selectedClass}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Route</p>
                  <p className="font-semibold">
                    {booking.searchParams?.from} → {booking.searchParams?.to}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold">
                    {booking.searchParams?.date &&
                      new Date(booking.searchParams.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Seats</span>
                  <span className="font-semibold">
                    {booking.selectedSeats.join(', ')}
                  </span>
                </div>
                <div className="flex justify-between text-lg pt-2 border-t">
                  <span className="font-bold">Total Amount</span>
                  <span className="font-bold text-blue-600">
                    ₹{booking.totalAmount}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={!isFormValid}
              >
                Continue to Payment
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}