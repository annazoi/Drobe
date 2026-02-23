import { HStack, IconButton, Tooltip, Box } from "@chakra-ui/react";
import { FC } from "react";
import { PiPencilThin, PiEraserThin } from "react-icons/pi";

interface StudioToolbarProps {
  onToolSelect: (tool: "restore" | "erase") => void;
  activeTool: "restore" | "erase" | null;
}

const StudioToolbar: FC<StudioToolbarProps> = ({ onToolSelect, activeTool }) => {
  return (
    <Box
      position="absolute"
      left="50%"
      transform="translateX(-50%)"
      bottom={4}
      bg="rgba(255, 255, 255, 0.8)"
      backdropFilter="blur(10px)"
      p={2}
      borderRadius="full"
      boxShadow="xl"
      border="1px solid"
      borderColor="neutral.100"
    >
      <HStack spacing={2}>
        <Tooltip label="Restore" fontSize="xs">
          <IconButton
            aria-label="Restore"
            icon={<PiPencilThin size={20} />}
            variant={activeTool === "restore" ? "solid" : "ghost"}
            colorScheme={activeTool === "restore" ? "brand" : "gray"}
            rounded="full"
            onClick={() => onToolSelect("restore")}
          />
        </Tooltip>
        <Tooltip label="Erase" fontSize="xs">
          <IconButton
            aria-label="Erase"
            icon={<PiEraserThin size={20} />}
            variant={activeTool === "erase" ? "solid" : "ghost"}
            colorScheme={activeTool === "erase" ? "brand" : "gray"}
            rounded="full"
            onClick={() => onToolSelect("erase")}
          />
        </Tooltip>
      </HStack>
    </Box>
  );
};

export default StudioToolbar;
