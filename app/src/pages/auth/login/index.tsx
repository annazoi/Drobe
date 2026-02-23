import { Box, Heading, VStack, Text, Center } from "@chakra-ui/react";
import Input from "../../../components/ui/Input";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SignInSchema } from "../../../validation-schemas/auth";
import { useMutation } from "react-query";
import { signIn } from "../../../services/auth";
import { authStore } from "../../../store/authStore";
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
        reset();
        navigate("/home");
      },
    });
  }

  return (
    <Center w="100%" bg="neutral.50" py={12}>
      <VStack spacing={12} w="100%" maxW="550px" px={6}>
        <VStack spacing={3} textAlign="center">
          <Heading size="3xl" fontWeight="900" letterSpacing="tight">
            DROBE
          </Heading>
          <Text color="neutral.400" textTransform="uppercase" letterSpacing="0.3em" fontSize="xs" fontWeight="600">
            Sign in to your digital closet
          </Text>
        </VStack>

        <Box 
          as="form" 
          onSubmit={handleSubmit(onSubmit)} 
          w="100%"
          bg="white"
          p={10}
          boxShadow="0 20px 40px rgba(0,0,0,0.03)"
          border="1px solid"
          borderColor="neutral.100"
        >
          <VStack spacing={6}>
            <Input
              label="EMAIL"
              register={register("email")}
              error={errors.email?.message}
              placeholder="YOUR@EMAIL.COM"
            />
            <Input
              label="PASSWORD"
              type="password"
              register={register("password")}
              error={errors.password?.message}
              placeholder="••••••••"
            />
            
            <VStack w="100%" spacing={4} pt={4}>
              <Button
                text="SIGN IN"
                type="submit"
                isLoading={isLoadingSignIn}
                width="100%"
                size="lg"
              />
              
              <Button
                text="CREATE ACCOUNT"
                variant="ghost"
                width="100%"
                onClick={() => navigate("/register")}
                fontSize="xs"
                letterSpacing="widest"
              />
            </VStack>
          </VStack>
        </Box>
      </VStack>
    </Center>
  );
};

export default Login;
