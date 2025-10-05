// src/pages/AdminTemplate/LocationsManagement/index.tsx
import { TableLocation } from "@/pages/AdminTemplate/LocationsManagement/ListLocations";
import { Input } from "@/components/ui/input";
import { AddLocationForm } from "@/pages/AdminTemplate/LocationsManagement/AddLocation";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function LocationsManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <div className="flex justify-between items-center pb-8">
        <AddLocationForm status={0}>
          <Button>Thêm vị trí</Button>
        </AddLocationForm>
      </div>
      <div className="flex justify-between items-center pb-8">
        <Input
          type="search"
          placeholder="Tìm kiếm vị trí..."
          className="mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <TableLocation searchTerm={searchTerm} />
    </div>
  );
}
