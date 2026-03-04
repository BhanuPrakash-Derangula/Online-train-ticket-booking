import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { SearchResults } from "./pages/SearchResults";
import { SeatSelection } from "./pages/SeatSelection";
import { PassengerDetails } from "./pages/PassengerDetails";
import { Payment } from "./pages/Payment";
import { Confirmation } from "./pages/Confirmation";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/search",
    Component: SearchResults,
  },
  {
    path: "/seats",
    Component: SeatSelection,
  },
  {
    path: "/passengers",
    Component: PassengerDetails,
  },
  {
    path: "/payment",
    Component: Payment,
  },
  {
    path: "/confirmation",
    Component: Confirmation,
  },
]);
