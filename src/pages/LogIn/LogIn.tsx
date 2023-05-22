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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import auth, { User } from "../../services/user/auth-service";
import { AxiosError } from "axios";
import hpt from "../../assets/hospital.jpg";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Footer } from "../../components/Footer/Footer";
import { useState } from "react";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type FormData = z.infer<typeof schema>;

export const LogIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [error, setError] = useState("");

  const onSubmit = async (user: User) => {
    try {
      const response = await auth.login(user);
      const token = JSON.stringify(response).slice(1, -1);
      localStorage.setItem("token", token);
      reset();
      window.location.href = "/";
    } catch (err) {
      setError((err as AxiosError).message);
    }
  };

  return (
    <div>
      <Flex>
        <Box w="100%" h="950">
          <Stack direction="row" align="center" pt="250px" justify="center">
            <Text>Don't have an account</Text>
            <Link to="/register">
              <Text color="teal">Click here</Text>
            </Link>
          </Stack>
          <Text align="center" pt="25px">
            <Heading>Welcome again!</Heading>
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl w="25%" ml="340px" pt="25px">
              <FormLabel>Email</FormLabel>
              <Input {...register("email")} placeholder="Email" required />
              {errors.email && (
                <Text color="red" pt="1">
                  {errors.email.message}
                </Text>
              )}
              {error && (
                <Text color="red" pt="1">
                  Invalid email or password
                </Text>
              )}
            </FormControl>

            <FormControl w="25%" ml="340px" pt="10px">
              <FormLabel>Password</FormLabel>
              <Input
                {...register("password")}
                placeholder="Password"
                type="password"
                required
              />
              {errors.password && <p>{errors.password.message}</p>}
            </FormControl>
            <Button colorScheme="blue" w="25%" type="submit" ml="340" mt="5">
              Login
            </Button>
          </form>
          <Stack direction="row" ml="330" pt="10">
            <Text align="center">Forgot your password?</Text>
            <Text color="teal">Click here</Text>
          </Stack>

          <Box mt="250">
            <Footer />
          </Box>
        </Box>
        <Box w="100%" h="950" bg="blue.500">
          <Image src={hpt} objectFit="cover" boxSize="950px" w="100%" />
        </Box>
      </Flex>
    </div>
  );
};
