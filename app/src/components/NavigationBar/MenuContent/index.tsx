import { FaHome } from "react-icons/fa";
// import { BiCloset } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Button, VStack, Icon, Text } from "@chakra-ui/react";
import { authStore } from "../../../store/authStore";
import { IoInformationCircleSharp } from "react-icons/io5";

import { IoColorPaletteOutline, IoJournalOutline } from "react-icons/io5";

export const isLoggedInLinks: any = [
  {
    id: 1,
    name: "Home",
    path: "/home",
    icon: FaHome,
  },
  {
    id: 2,
    name: "Studio",
    path: "/studio",
    icon: IoColorPaletteOutline,
  },
  {
    id: 3,
    name: "Archive",
    path: "/archive",
    icon: IoJournalOutline,
  },
];

const isLogOutLinks: any = [
  {
    id: 1,
    name: "About",
    path: "/about",
    icon: IoInformationCircleSharp,
  }
];

const MenuContent = () => {
  const navigate = useNavigate();
  const { logOut, isLoggedIn } = authStore((state) => state);

  const handleLogOut = () => {
    logOut();
    navigate("/login");
  };

  const links = isLoggedIn ? isLoggedInLinks : isLogOutLinks;

  return (
    <VStack spacing={4} align="stretch" w="100%">
      {links.map((link: any) => (
        <Button
          key={link.id}
          variant="ghost"
          justifyContent="flex-start"
          onClick={() => navigate(link.path)}
          py={6}
          px={4}
          _hover={{ bg: "neutral.100" }}
          leftIcon={<Icon as={link.icon} boxSize={5} />}
        >
          <Text fontSize="sm" fontWeight="500">
            {link.name}
          </Text>
        </Button>
      ))}

      {isLoggedIn && (
        <Button
          variant="ghost"
          justifyContent="flex-start"
          onClick={handleLogOut}
          py={6}
          px={4}
          mt="auto"
          _hover={{ bg: "neutral.100", color: "red.500" }}
          leftIcon={<Icon as={IoMdLogOut} boxSize={5} />}
        >
          <Text fontSize="sm" fontWeight="500">
            Logout
          </Text>
        </Button>
      )}
    </VStack>
  );
};

export default MenuContent;
