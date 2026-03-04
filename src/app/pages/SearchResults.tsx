import { useNavigate } from 'react-router';
import { Train, Clock, ArrowRight, ChevronLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useBooking } from '../context/BookingContext';
import type { Train as TrainType } from '../context/BookingContext';

export function SearchResults() {
  const navigate = useNavigate();
  const { booking, selectTrain } = useBooking();

  // Mock train data based on search
  const trains: TrainType[] = [
    {
      id: '1',
      name: 'Rajdhani Express',
      number: '12301',
      departure: '08:00 AM',
      arrival: '02:30 PM',
      duration: '6h 30m',
      price: 890,
      availableSeats: 45,
      classes: [
        { name: 'SL', price: 890, available: 45 },
        { name: '3A', price: 1490, available: 20 },
        { name: '2A', price: 2290, available: 10 },
        { name: '1A', price: 3590, available: 5 },
      ],
    },
    {
      id: '2',
      name: 'Shatabdi Express',
      number: '12002',
      departure: '10:30 AM',
      arrival: '04:15 PM',
      duration: '5h 45m',
      price: 1090,
      availableSeats: 32,
      classes: [
        { name: 'SL', price: 1090, available: 32 },
        { name: '3E', price: 1490, available: 28 },
        { name: '3A', price: 1790, available: 15 },
        { name: '2A', price: 2690, available: 8 },
        { name: '1A', price: 3990, available: 4 },
      ],
    },
    {
      id: '3',
      name: 'Duronto Express',
      number: '12213',
      departure: '01:00 PM',
      arrival: '07:45 PM',
      duration: '6h 45m',
      price: 790,
      availableSeats: 58,
      classes: [
        { name: 'SL', price: 790, available: 58 },
        { name: '3A', price: 1390, available: 25 },
        { name: '2A', price: 1990, available: 12 },
      ],
    },
    {
      id: '4',
      name: 'Garib Rath',
      number: '12909',
      departure: '04:30 PM',
      arrival: '10:15 PM',
      duration: '5h 45m',
      price: 990,
      availableSeats: 41,
      classes: [
        { name: 'SL', price: 990, available: 41 },
        { name: '3A', price: 1590, available: 18 },
        { name: '2A', price: 2390, available: 9 },
      ],
    },
    {
      id: '5',
      name: 'Sampark Kranti',
      number: '12445',
      departure: '09:00 PM',
      arrival: '04:30 AM',
      duration: '7h 30m',
      price: 690,
      availableSeats: 62,
      classes: [
        { name: 'SL', price: 690, available: 62 },
        { name: '3A', price: 1290, available: 28 },
        { name: '2A', price: 1890, available: 14 },
      ],
    },
  ];

  // Apply Tatkal surcharge if applicable
  const applyTatkalPrice = (price: number) => {
    if (booking.searchParams?.tatkal) {
      return Math.round(price * 1.3); // 30% surcharge for Tatkal
    }
    return price;
  };

  const handleSelectTrain = (train: TrainType, className: string) => {
    selectTrain(train, className);
    navigate('/seats');
  };

  if (!booking.searchParams) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
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

      {/* Search Summary */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <p className="text-sm text-gray-600">Route</p>
              <p className="font-semibold text-lg">
                {booking.searchParams.from} → {booking.searchParams.to}
              </p>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-semibold text-lg">
                {new Date(booking.searchParams.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <div>
              <p className="text-sm text-gray-600">Passengers</p>
              <p className="font-semibold text-lg">{booking.searchParams.passengers}</p>
            </div>
            {booking.searchParams.tatkal && (
              <>
                <div className="w-px h-12 bg-gray-300" />
                <Badge variant="default" className="bg-orange-500">Tatkal</Badge>
              </>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/')}
              className="ml-auto"
            >
              Modify Search
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Available Trains ({trains.length})
        </h2>

        <div className="space-y-4">
          {trains.map((train) => (
            <Card key={train.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Train Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {train.name}
                        </h3>
                        <p className="text-sm text-gray-600">{train.number}</p>
                      </div>
                      <Badge variant="secondary">
                        {train.availableSeats} seats available
                      </Badge>
                    </div>

                    {/* Timing */}
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {train.departure}
                        </p>
                        <p className="text-sm text-gray-600">
                          {booking.searchParams.from}
                        </p>
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 h-px bg-gray-300" />
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          {train.duration}
                        </div>
                        <div className="flex-1 h-px bg-gray-300" />
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          {train.arrival}
                        </p>
                        <p className="text-sm text-gray-600">
                          {booking.searchParams.to}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Classes */}
                  <div className="lg:w-80 space-y-2">
                    {train.classes.map((cls) => (
                      <div
                        key={cls.name}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-semibold text-gray-900">{cls.name}</p>
                          <p className="text-sm text-gray-600">
                            {cls.available} seats left
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">
                            ₹{applyTatkalPrice(cls.price)}
                          </p>
                          <Button
                            size="sm"
                            onClick={() => handleSelectTrain(train, cls.name)}
                            disabled={cls.available === 0}
                          >
                            Select
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}