import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface SearchParams {
  from: string;
  to: string;
  date: string;
  passengers: number;
  tatkal?: boolean;
}

export interface Train {
  id: string;
  name: string;
  number: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  availableSeats: number;
  classes: {
    name: string;
    price: number;
    available: number;
  }[];
}

export interface Passenger {
  name: string;
  age: number;
  gender: string;
}

export interface BookingState {
  searchParams?: SearchParams;
  selectedTrain?: Train;
  selectedClass?: string;
  selectedSeats: string[];
  passengers: Passenger[];
  totalAmount: number;
  bookingId?: string;
  isTatkal?: boolean;
}

interface BookingContextType {
  booking: BookingState;
  updateSearchParams: (params: SearchParams) => void;
  selectTrain: (train: Train, className: string) => void;
  selectSeats: (seats: string[]) => void;
  updatePassengers: (passengers: Passenger[]) => void;
  confirmBooking: () => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState<BookingState>({
    selectedSeats: [],
    passengers: [],
    totalAmount: 0,
  });

  const updateSearchParams = (params: SearchParams) => {
    setBooking(prev => ({ ...prev, searchParams: params }));
  };

  const selectTrain = (train: Train, className: string) => {
    const selectedClassInfo = train.classes.find(c => c.name === className);
    setBooking(prev => ({
      ...prev,
      selectedTrain: train,
      selectedClass: className,
      selectedSeats: [],
      totalAmount: 0,
      isTatkal: prev.searchParams?.tatkal || false,
    }));
  };

  const selectSeats = (seats: string[]) => {
    const seatPrice = booking.selectedTrain?.classes.find(
      c => c.name === booking.selectedClass
    )?.price || 0;
    setBooking(prev => ({
      ...prev,
      selectedSeats: seats,
      totalAmount: seats.length * seatPrice,
    }));
  };

  const updatePassengers = (passengers: Passenger[]) => {
    setBooking(prev => ({ ...prev, passengers }));
  };

  const confirmBooking = () => {
    const bookingId = `TKT${Date.now().toString().slice(-8)}`;
    setBooking(prev => ({ ...prev, bookingId }));
  };

  const resetBooking = () => {
    setBooking({
      selectedSeats: [],
      passengers: [],
      totalAmount: 0,
    });
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        updateSearchParams,
        selectTrain,
        selectSeats,
        updatePassengers,
        confirmBooking,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
}