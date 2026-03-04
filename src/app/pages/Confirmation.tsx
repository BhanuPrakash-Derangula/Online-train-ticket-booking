import { useNavigate } from 'react-router';
import { Train, CheckCircle, Download, Mail, Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { useBooking } from '../context/BookingContext';

export function Confirmation() {
  const navigate = useNavigate();
  const { booking, resetBooking } = useBooking();

  if (!booking.bookingId) {
    navigate('/');
    return null;
  }

  const handleNewBooking = () => {
    resetBooking();
    navigate('/');
  };

  const handleDownload = () => {
    // Mock download functionality
    alert('Ticket downloaded successfully!');
  };

  const handleEmail = () => {
    // Mock email functionality
    alert('Ticket sent to your email!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Train className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">RailBook</span>
          </div>
        </div>
      </header>

      {/* Success Message */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-gray-600">
            Your train tickets have been booked successfully
          </p>
        </div>

        {/* Booking ID Card */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Booking ID</p>
              <p className="text-3xl font-bold text-blue-600 mb-4">
                {booking.bookingId}
              </p>
              <p className="text-sm text-gray-600">
                Save this ID for future reference
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Ticket Details */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Journey Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Train Info */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {booking.selectedTrain?.name}
                  </h3>
                  <p className="text-gray-600">{booking.selectedTrain?.number}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Class</p>
                  <p className="text-lg font-semibold">{booking.selectedClass}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    {booking.selectedTrain?.departure}
                  </p>
                  <p className="text-gray-600 mt-1">{booking.searchParams?.from}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <div className="h-px bg-gray-400 w-16" />
                  <Train className="w-6 h-6" />
                  <div className="h-px bg-gray-400 w-16" />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">
                    {booking.selectedTrain?.arrival}
                  </p>
                  <p className="text-gray-600 mt-1">{booking.searchParams?.to}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Journey Info Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Journey Date</p>
                  <p className="font-semibold">
                    {booking.searchParams?.date &&
                      new Date(booking.searchParams.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold">{booking.selectedTrain?.duration}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Passengers</p>
                  <p className="font-semibold">{booking.passengers.length}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Seats</p>
                  <p className="font-semibold">{booking.selectedSeats.join(', ')}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Passenger List */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Passenger Information</h4>
              <div className="space-y-3">
                {booking.passengers.map((passenger, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{passenger.name}</p>
                      <p className="text-sm text-gray-600">
                        {passenger.age} years • {passenger.gender}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Seat</p>
                      <p className="font-semibold text-lg">{booking.selectedSeats[index]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Payment Info */}
            <div className="bg-green-50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Total Amount Paid</span>
                <span className="text-3xl font-bold text-green-600">
                  ₹{booking.totalAmount}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Payment completed on {new Date().toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={handleDownload}
          >
            <Download className="w-5 h-5 mr-2" />
            Download Ticket
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full"
            onClick={handleEmail}
          >
            <Mail className="w-5 h-5 mr-2" />
            Email Ticket
          </Button>
          <Button
            size="lg"
            className="w-full"
            onClick={handleNewBooking}
          >
            Book Another Ticket
          </Button>
        </div>

        {/* Important Information */}
        <Card>
          <CardHeader>
            <CardTitle>Important Information</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>
                  Please arrive at the station at least 30 minutes before departure
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>
                  Carry a valid photo ID proof for verification during the journey
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>
                  E-tickets must be shown on mobile or printed for boarding
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span>
                  Cancellation and refund policies apply as per terms and conditions
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}