import { Box, Heading, Image, useColorModeValue } from "@chakra-ui/react";
import Input from "../../../components/ui/Input";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SignInSchema } from "../../../validation-schemas/auth";
import { useMutation } from "react-query";
import { signIn } from "../../../services/auth";
import { authStore } from "../../../store/authStore";
import logo from "../../../assets/barbie.png";

import "./style.css";
import Button from "../../../components/ui/Button";

const Login: FC = () => {
  const { logIn } = authStore((state) => state);
  const navigate = useNavigate();

  const { isLoading: isLoadingSignIn, mutate: signInMutate } =
    useMutation(signIn);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema as any),
  });

  function onSubmit(values: any) {
    signInMutate(values, {
      onSuccess: (data) => {
        logIn({
          ...data.user,
          token: data.token,
          exp: data.exp,
          userId: data.user._id,
        });
        console.log("data", data);
        reset();
        navigate("/home");
      },
    });
  }
  return (
    <div style={{ width: "100%" }}>
      <Image
        src={logo}
        boxSize="200px"
        mx="auto"
        mt={5}
        display={{ base: "block", md: "none" }}
      />
      <Box
        borderRadius="lg"
        p={5}
        maxW={"600px"}
        boxShadow={"0 2px 5px 0 rgba(0,0,0,0.2)"}
        mt={5}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            textAlign: "start",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "5px",
            padding: "20px",
          }}
        >
          <Heading as="h4" size="md" mb={5}>
            Login
          </Heading>
          <Input
            text="Email"
            register={register("email")}
            error={errors.email?.message}
            placeholder="Enter your email"
          />
          {errors.email && <p className="auth-error">Invalid Email</p>}
          <Input
            text="Password"
            register={register("password")}
            error={errors.password?.message}
            placeholder="Enter your password"
          />
          {errors.password && <p className="auth-error">Invalid Password</p>}

          <Button
            text="Sign In"
            type="submit"
            isLoading={isLoadingSignIn}
            loadingText="Signing In"
            marginBottom={5}
            marginTop={3}
            width={"100%"}
          />
          <Button
            text="I don't have account"
            variant={"outline"}
            bg={useColorModeValue("white", "gray.900")}
            width={"100%"}
            marginBottom={3}
            onClick={() => {
              navigate("/register");
            }}
          />
        </form>
      </Box>
    </div>
  );
};
export default Login;
