import { TableBooking } from "@/pages/AdminTemplate/BookingRoomManagement/ListBooking"

export default function BookingRoomManagement() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Quản lý Booking</h2>
      <TableBooking />
    </div>
  );
}
