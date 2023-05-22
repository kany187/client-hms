import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Stack,
  Heading,
  Image,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import user, { User } from "../../services/user/user-service";

import hpt from "../../assets/hospital.jpg";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";

const schema = z.object({
  name: z.string().min(3, { message: "Name should be at least 3 characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(5, { message: "Password should be at least 5 characters" }),
});

type FormData = z.infer<typeof schema>;

export const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const leastDestructiveRef = useRef<HTMLButtonElement>(null);

  const [error, setError] = useState("");

  const onSubmit = async (data: User) => {
    try {
      const response = await user.register(data);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      reset();
      setIsAlertOpen(true);
    } catch (err: any) {
      if (err.response && err.response.status === 400) {
        setError(err.response.data);
      }
    }
  };
  return (
    <>
      <Flex>
        <Box w="100%" h="950">
          <Stack direction="row" align="center" pt="250px" justify="center">
            <Text>Already have an account?</Text>
            <Link to="/login">
              {" "}
              <Text color="teal">Click here</Text>
            </Link>
          </Stack>
          <Text align="center" pt="25px">
            <Heading>Register</Heading>
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl w="25%" ml="340px" pt="15px">
              <FormLabel>Name</FormLabel>
              <Input {...register("name")} placeholder="Name" />
              {errors.name && (
                <Text color="red" pt="1">
                  {errors.name.message}
                </Text>
              )}
              {error && (
                <Text color="red" pt="1">
                  {error}
                </Text>
              )}
            </FormControl>
            <FormControl w="25%" ml="340px" pt="15px">
              <FormLabel>Email</FormLabel>
              <Input {...register("email")} placeholder="Email" />
              {errors.email && (
                <Text color="red" pt="1">
                  {errors.email.message}
                </Text>
              )}
            </FormControl>

            <FormControl w="25%" ml="340px" pt="15px">
              <FormLabel>Password</FormLabel>
              <Input
                {...register("password")}
                placeholder="Password"
                type="password"
              />
              {errors.password && (
                <Text color="red" pt="1">
                  {errors.password.message}
                </Text>
              )}
            </FormControl>

            <Button colorScheme="blue" w="25%" type="submit" ml="340" mt="5">
              Register
            </Button>
            {/* <Button colorScheme="blue" w="25%">
                Register with google
              </Button> */}
          </form>
          {errors ? (
            <Box mt="100">
              <Footer />
            </Box>
          ) : (
            <Box mt="300">
              <Footer />
            </Box>
          )}
        </Box>
        <Box w="100%" h="950" bg="blue.500">
          <Image src={hpt} objectFit="cover" boxSize="950px" w="100%" />
        </Box>
      </Flex>

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={leastDestructiveRef}
        onClose={() => setIsAlertOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Account created successfully!
            </AlertDialogHeader>
            <AlertDialogBody>
              Your account has been created successfully. You can now log in
              using your email and password.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                colorScheme="blue"
                onClick={() => navigate("/login")}
                ml={3}
              >
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
