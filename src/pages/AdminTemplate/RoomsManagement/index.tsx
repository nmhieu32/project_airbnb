import { TableRoom } from "@/pages/AdminTemplate/RoomsManagement/ListRoom/index"
import { AddRoomForm } from "@/pages/AdminTemplate/RoomsManagement/AddRoom/index"
import { Button } from "@/components/ui/button"

export default function RoomsManagement() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
    
        <AddRoomForm status={0}>
          <Button className="bg-red-400 text-white hover:bg-red-500">
            + Thêm phòng
          </Button>
        </AddRoomForm>
      </div>
      <TableRoom />
    </div>
  )
}
