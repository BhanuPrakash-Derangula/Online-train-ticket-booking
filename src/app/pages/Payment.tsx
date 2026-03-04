import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Train, ChevronLeft, CreditCard, Lock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { useBooking } from '../context/BookingContext';

export function Payment() {
  const navigate = useNavigate();
  const { booking, confirmBooking } = useBooking();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);

  if (!booking.selectedTrain || !booking.passengers.length) {
    navigate('/');
    return null;
  }

  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      confirmBooking();
      navigate('/confirmation');
    }, 2000);
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
              onClick={() => navigate('/passengers')}
              disabled={processing}
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
            <div className="w-16 h-px bg-green-500" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-semibold">
                ✓
              </div>
              <span className="text-sm font-medium text-gray-900">Passengers</span>
            </div>
            <div className="w-16 h-px bg-blue-500" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold">
                4
              </div>
              <span className="text-sm font-medium text-blue-600">Payment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Details */}
          <div className="lg:col-span-2">
            <form onSubmit={handlePayment}>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Secure Payment
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Your payment information is encrypted and secure
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Payment Method */}
                  <div className="space-y-4">
                    <Label>Payment Method</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                          <CreditCard className="w-5 h-5" />
                          Credit / Debit Card
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1">
                          <span className="text-xl">📱</span>
                          UPI
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="wallet" id="wallet" />
                        <Label htmlFor="wallet" className="flex items-center gap-2 cursor-pointer flex-1">
                          <span className="text-xl">👛</span>
                          Digital Wallet
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Card Details (shown only when card is selected) */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 pt-4 border-t">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">
                          Card Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.number}
                          onChange={(e) =>
                            setCardDetails({ ...cardDetails, number: e.target.value })
                          }
                          maxLength={19}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="card-name">
                          Cardholder Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="card-name"
                          placeholder="John Doe"
                          value={cardDetails.name}
                          onChange={(e) =>
                            setCardDetails({ ...cardDetails, name: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">
                            Expiry Date <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) =>
                              setCardDetails({ ...cardDetails, expiry: e.target.value })
                            }
                            maxLength={5}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">
                            CVV <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="cvv"
                            type="password"
                            placeholder="123"
                            value={cardDetails.cvv}
                            onChange={(e) =>
                              setCardDetails({ ...cardDetails, cvv: e.target.value })
                            }
                            maxLength={3}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="space-y-4 pt-4 border-t">
                      <div className="space-y-2">
                        <Label htmlFor="upi-id">
                          UPI ID <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="upi-id"
                          placeholder="username@upi"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'wallet' && (
                    <div className="space-y-4 pt-4 border-t">
                      <div className="space-y-2">
                        <Label>Select Wallet</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <Button type="button" variant="outline" className="h-16">
                            PayPal
                          </Button>
                          <Button type="button" variant="outline" className="h-16">
                            Apple Pay
                          </Button>
                          <Button type="button" variant="outline" className="h-16">
                            Google Pay
                          </Button>
                          <Button type="button" variant="outline" className="h-16">
                            Amazon Pay
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={processing}
              >
                {processing ? 'Processing Payment...' : `Pay ₹${booking.totalAmount}`}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Journey Details */}
                <div className="space-y-3 pb-4 border-b">
                  <div>
                    <p className="text-sm text-gray-600">Train</p>
                    <p className="font-semibold">{booking.selectedTrain.name}</p>
                    <p className="text-sm text-gray-600">{booking.selectedTrain.number}</p>
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
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric',
                        })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Time</p>
                    <p className="font-semibold">
                      {booking.selectedTrain.departure} - {booking.selectedTrain.arrival}
                    </p>
                  </div>
                </div>

                {/* Passengers */}
                <div className="space-y-2 pb-4 border-b">
                  <p className="text-sm text-gray-600">Passengers</p>
                  {booking.passengers.map((passenger, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{passenger.name}</span>
                      <span className="text-gray-600">Seat {booking.selectedSeats[index]}</span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Fare</span>
                    <span className="font-semibold">₹{booking.totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee</span>
                    <span className="font-semibold">₹0</span>
                  </div>
                  <div className="flex justify-between text-lg pt-2 border-t">
                    <span className="font-bold">Total Amount</span>
                    <span className="font-bold text-blue-600">
                      ₹{booking.totalAmount}
                    </span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-sm text-green-800">
                    <Lock className="w-4 h-4" />
                    <span>Secure payment powered by Stripe</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}