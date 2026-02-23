import { Button, useColorModeValue } from "@chakra-ui/react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const About: FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        onClick={() => navigate("/login")}
        bg={useColorModeValue("pink.300", "black")}
        w={"100%"}
      >
        Return to Login
      </Button>
    </div>
  );
};
export default About;
