import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Train, ChevronLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useBooking } from '../context/BookingContext';
import { cn } from '../components/ui/utils';

export function SeatSelection() {
  const navigate = useNavigate();
  const { booking, selectSeats } = useBooking();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  if (!booking.selectedTrain || !booking.searchParams) {
    navigate('/');
    return null;
  }

  const requiredSeats = booking.searchParams.passengers;
  const seatPrice = booking.selectedTrain.classes.find(
    c => c.name === booking.selectedClass
  )?.price || 0;

  // Generate seat layout (12 rows, 4 seats per row: A, B, C, D)
  const rows = 12;
  const seatsPerRow = ['A', 'B', 'C', 'D'];
  
  // Mock some already booked seats
  const bookedSeats = ['1A', '1B', '2C', '3D', '4A', '5B', '6C', '7A', '8D', '9B'];

  const handleSeatClick = (seat: string) => {
    if (bookedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      if (selectedSeats.length < requiredSeats) {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  const handleContinue = () => {
    selectSeats(selectedSeats);
    navigate('/passengers');
  };

  const getSeatStatus = (seat: string) => {
    if (bookedSeats.includes(seat)) return 'booked';
    if (selectedSeats.includes(seat)) return 'selected';
    return 'available';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/search')}
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

      {/* Train Info */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <p className="text-sm text-gray-600">Train</p>
              <p className="font-semibold text-lg">{booking.selectedTrain.name}</p>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <div>
              <p className="text-sm text-gray-600">Route</p>
              <p className="font-semibold text-lg">
                {booking.searchParams.from} → {booking.searchParams.to}
              </p>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <div>
              <p className="text-sm text-gray-600">Class</p>
              <p className="font-semibold text-lg">{booking.selectedClass}</p>
            </div>
            <div className="w-px h-12 bg-gray-300" />
            <div>
              <p className="text-sm text-gray-600">Time</p>
              <p className="font-semibold text-lg">
                {booking.selectedTrain.departure} - {booking.selectedTrain.arrival}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Seat Selection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Seat Map */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Select Your Seats</CardTitle>
                <p className="text-sm text-gray-600">
                  Select {requiredSeats} seat{requiredSeats > 1 ? 's' : ''} for your journey
                </p>
              </CardHeader>
              <CardContent>
                {/* Legend */}
                <div className="flex gap-6 mb-6 pb-6 border-b">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 border-2 border-green-500 rounded" />
                    <span className="text-sm text-gray-600">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-500 border-2 border-blue-600 rounded" />
                    <span className="text-sm text-gray-600">Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-300 border-2 border-gray-400 rounded" />
                    <span className="text-sm text-gray-600">Booked</span>
                  </div>
                </div>

                {/* Driver Section */}
                <div className="mb-6 flex justify-end">
                  <div className="bg-gray-200 px-4 py-2 rounded text-sm font-semibold text-gray-700">
                    🚂 Engine
                  </div>
                </div>

                {/* Seat Grid */}
                <div className="space-y-4">
                  {Array.from({ length: rows }, (_, rowIndex) => {
                    const rowNumber = rowIndex + 1;
                    return (
                      <div key={rowNumber} className="flex items-center gap-4">
                        <span className="w-8 text-center font-semibold text-gray-700">
                          {rowNumber}
                        </span>
                        <div className="flex gap-2">
                          {/* Left side seats (A, B) */}
                          {seatsPerRow.slice(0, 2).map(letter => {
                            const seatId = `${rowNumber}${letter}`;
                            const status = getSeatStatus(seatId);
                            return (
                              <button
                                key={seatId}
                                onClick={() => handleSeatClick(seatId)}
                                disabled={status === 'booked'}
                                className={cn(
                                  'w-12 h-12 rounded border-2 font-semibold text-sm transition-all',
                                  'hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100',
                                  status === 'available' && 'bg-green-100 border-green-500 hover:bg-green-200',
                                  status === 'selected' && 'bg-blue-500 border-blue-600 text-white',
                                  status === 'booked' && 'bg-gray-300 border-gray-400 text-gray-600'
                                )}
                              >
                                {letter}
                              </button>
                            );
                          })}
                        </div>
                        {/* Aisle */}
                        <div className="w-8" />
                        <div className="flex gap-2">
                          {/* Right side seats (C, D) */}
                          {seatsPerRow.slice(2, 4).map(letter => {
                            const seatId = `${rowNumber}${letter}`;
                            const status = getSeatStatus(seatId);
                            return (
                              <button
                                key={seatId}
                                onClick={() => handleSeatClick(seatId)}
                                disabled={status === 'booked'}
                                className={cn(
                                  'w-12 h-12 rounded border-2 font-semibold text-sm transition-all',
                                  'hover:scale-105 disabled:cursor-not-allowed disabled:hover:scale-100',
                                  status === 'available' && 'bg-green-100 border-green-500 hover:bg-green-200',
                                  status === 'selected' && 'bg-blue-500 border-blue-600 text-white',
                                  status === 'booked' && 'bg-gray-300 border-gray-400 text-gray-600'
                                )}
                              >
                                {letter}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Selected Seats</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeats.length > 0 ? (
                      selectedSeats.map(seat => (
                        <Badge key={seat} variant="secondary">
                          {seat}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No seats selected</p>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {selectedSeats.length} of {requiredSeats} selected
                  </p>
                </div>

                <div className="pt-4 border-t space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per seat</span>
                    <span className="font-semibold">₹{seatPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Number of seats</span>
                    <span className="font-semibold">{selectedSeats.length}</span>
                  </div>
                  <div className="flex justify-between text-lg pt-2 border-t">
                    <span className="font-bold">Total Amount</span>
                    <span className="font-bold text-blue-600">
                      ₹{selectedSeats.length * seatPrice}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleContinue}
                  disabled={selectedSeats.length !== requiredSeats}
                >
                  Continue to Passenger Details
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}