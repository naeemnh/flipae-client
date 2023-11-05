import { useFetchUserQuery } from "@/store";
import { FiLogOut } from "react-icons/fi";

export default function Logout() {
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.reload();
  }
  return (
    <FiLogOut onClick={handleLogout} cursor={'pointer'} size={24} />
  )
}