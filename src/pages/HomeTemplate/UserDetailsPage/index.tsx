import { useAuthStore } from "@/store/auth.store";
import { Navigate } from "react-router-dom";

export default function UserDetailsPage() {
  const {user} = useAuthStore();
  if(!user) return <Navigate to="/"/>
  return <div>UserDetailsPage</div>;
}
