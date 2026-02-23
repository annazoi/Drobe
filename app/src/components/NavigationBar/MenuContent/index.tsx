import { FaHome } from "react-icons/fa";
import { BiCloset } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { IoMdSettings, IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Button, useColorModeValue } from "@chakra-ui/react";
import { authStore } from "../../../store/authStore";
import { GrContact } from "react-icons/gr";
import { IoInformationCircleSharp } from "react-icons/io5";
export const isLoggedInLinks: any = [
  {
    id: 1,
    name: "Home",
    path: "/home",
    icon: <FaHome />,
  },
  {
    id: 2,
    name: "My Closet",
    path: "/closet",
    icon: <BiCloset />,
  },
  {
    id: 3,
    name: "Profile",
    path: "/profile",
    icon: <CgProfile />,
  },
  {
    id: 4,
    name: "Settings",
    path: "/settings",
    icon: <IoMdSettings />,
  },
  // {
  //   id: 5,
  //   name: "Logout",
  //   path: "/logout",
  //   icon: <IoMdLogOut />,
  //   onClick: () => {},
  // },
];

const isLogOutLinks: any = [
  {
    id: 1,
    name: "About Us",
    path: "/about",
    icon: <IoInformationCircleSharp size={23} />,
  },
  {
    id: 2,
    name: "Contact",
    path: "/contact",
    icon: <GrContact />,
  },
];

const MenuContent = () => {
  const navigate = useNavigate();
  const { logOut, isLoggedIn } = authStore((state) => state);

  const handleLogOut = () => {
    logOut();
    navigate("/login");
  };
  return (
    <div style={{ display: "grid", gap: "20px" }}>
      {isLoggedIn
        ? isLoggedInLinks.map((link: any) => (
            <Button
              key={link.id}
              leftIcon={link.icon}
              bg={useColorModeValue("pink.200", "gray.700")}
              onClick={() => {
                navigate(link.path);
              }}
              //   _hover={{
              //     textDecoration: "none",
              //     bg: "primary.400",
              //     color: "white",
              //   }}
            >
              {link.name}
            </Button>
          ))
        : isLogOutLinks.map((link: any) => (
            <Button
              key={link.id}
              leftIcon={link.icon}
              bg={useColorModeValue("pink.200", "gray.700")}
              onClick={() => {
                navigate(link.path);
              }}
              //   _hover={{
              //     textDecoration: "none",
              //     bg: "primary.400",
              //     color: "white",
              //   }}
            >
              {link.name}
            </Button>
          ))}

      {isLoggedIn && (
        <Button
          leftIcon={<IoMdLogOut />}
          onClick={handleLogOut}
          bg={useColorModeValue("pink.100", "gray.700")}
        >
          Logout
        </Button>
      )}
    </div>
  );
};
export default MenuContent;
