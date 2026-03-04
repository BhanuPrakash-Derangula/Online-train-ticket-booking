import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Train } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { useBooking } from '../context/BookingContext';

export function Home() {
  const navigate = useNavigate();
  const { updateSearchParams } = useBooking();
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    passengers: 1,
    tatkal: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSearchParams(formData);
    navigate('/search');
  };

  const popularRoutes = [
    { from: 'New Delhi', to: 'Mumbai', duration: '15h 50m' },
    { from: 'Bangalore', to: 'Chennai', duration: '5h 30m' },
    { from: 'Kolkata', to: 'Patna', duration: '7h 45m' },
    { from: 'Hyderabad', to: 'Pune', duration: '11h 30m' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Train className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">RailBook</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Book Your Train Journey
          </h1>
          <p className="text-xl text-gray-600">
            Fast, easy, and reliable train ticket booking
          </p>
        </div>

        {/* Search Form */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Search Trains</CardTitle>
            <CardDescription>Find and book your next train journey</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <Input
                    id="from"
                    placeholder="Enter departure city"
                    value={formData.from}
                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <Input
                    id="to"
                    placeholder="Enter destination city"
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Journey Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="passengers">Number of Passengers</Label>
                  <Input
                    id="passengers"
                    type="number"
                    min="1"
                    max="6"
                    value={formData.passengers}
                    onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="tatkal"
                  checked={formData.tatkal}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, tatkal: checked as boolean })
                  }
                />
                <Label
                  htmlFor="tatkal"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Tatkal Booking (Last-minute booking with additional charges)
                </Label>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Search Trains
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Popular Routes */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Popular Routes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularRoutes.map((route, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => {
                  setFormData({
                    ...formData,
                    from: route.from,
                    to: route.to,
                  });
                }}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{route.from}</p>
                    </div>
                    <Train className="w-5 h-5 text-blue-600 mx-2" />
                    <div className="flex-1 text-right">
                      <p className="font-semibold text-gray-900">{route.to}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 text-center">{route.duration}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Train className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p className="text-gray-600">
              Book your tickets in just a few clicks
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💳</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
            <p className="text-gray-600">
              Safe and secure payment options
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎫</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Confirmation</h3>
            <p className="text-gray-600">
              Get your tickets instantly via email
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}