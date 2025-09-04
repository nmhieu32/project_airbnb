import { Outlet } from "react-router-dom";

export default function AuthTemplate() {
  return (
    <div>
      Header Auth <Outlet /> Footer
    </div>
  );
}
