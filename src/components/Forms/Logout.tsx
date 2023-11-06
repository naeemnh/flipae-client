import { Tooltip } from 'react-tooltip';
import { FiLogOut } from "react-icons/fi";

export default function Logout() {
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.reload();
  }
  return (
    <>
      <FiLogOut data-tooltip-id="logout" onClick={handleLogout} cursor={'pointer'} size={24} />
      <Tooltip id="logout" place="top" content="Logout" />
    </>
  )
}