import { Box, Heading, useColorModeValue, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/ui/Input";
import { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SignupSchema } from "../../../validation-schemas/auth";
import { signUp } from "../../../services/auth";
import { useMutation } from "react-query";
import { authStore } from "../../../store/authStore";
import Button from "../../../components/ui/Button";
import logo from "../../../assets/barbie.png";

const Register: FC = () => {
  const { logIn } = authStore((state) => state);

  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    // getValues,
    formState: { errors },
    // setValue,
  } = useForm({
    resolver: yupResolver(SignupSchema as any),
  });

  const { isLoading: isLoadingSignUp, mutate: signUpMutate } =
    useMutation(signUp);

  function onSubmit(values: any) {
    // const age = parseInt(data.age);

    signUpMutate(
      values,

      {
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
      }
    );
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
        textAlign={"start"}
        boxShadow={"0 2px 5px 0 rgba(0,0,0,0.2)"}
        mt={5}
        // bg={useColorModeValue("gray.300", "gray.900")}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading as="h4" size="md" mb={5}>
            Create an Account
          </Heading>
          <Input
            text="Username"
            register={register("username")}
            error={errors.username?.message}
            placeholder="Enter your username"
          />
          <Input
            text="Email"
            register={register("email")}
            error={errors.email?.message}
            placeholder="Enter your email"
          />
          {/* <Input
            text="Age"
            numberInput={15}
            register={register("age")}
            error={errors.age?.message}
          /> */}
          <Input
            text="Password"
            register={register("password")}
            error={errors.password?.message}
            placeholder="Enter your password"
          />
          <Button
            text="Sign Up"
            width={"100%"}
            type="submit"
            isLoading={isLoadingSignUp}
            loadingText="Submitting"
            marginTop={5}
            marginBottom={8}
          />

          <Button
            text="I already have account"
            width={"100%"}
            variant="outline"
            bg={useColorModeValue("white", "gray.900")}
            marginBottom={3}
            onClick={() => {
              navigate("/login");
            }}
          />
        </form>
      </Box>
    </div>
  );
};
export default Register;
