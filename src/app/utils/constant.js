import { IoBagHandleOutline } from "react-icons/io5";
import { FiNavigation } from "react-icons/fi";
import { CiWallet } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";

export const menuItems = [
  {
    id: 1,
    icon: <IoBagHandleOutline className="h-8 w-8" />,
    label: "Orders",
    url: "#my-orders",
  },
  {
    id: 2,
    icon: <FiNavigation className="h-8 w-8" />,
    label: "Address",
    url: "#my-address",
  },
  {
    id: 3,
    icon: <CiWallet className="h-8 w-8" />,
    label: "Wallet",
    url: "#wallet",
  },
  {
    id: 4,
    icon: <RiLockPasswordLine className="h-8 w-8" />,
    label: "Change Password",
    url: "#change-password",
  },
  {
    id: 5,
    icon: <IoIosLogOut className="h-8 w-8" />,
    label: "Logout",
  },
];

export const Filter = ["Filter by date", "Filter by Order Status"];
