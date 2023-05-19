import React from 'react';
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Box,
    VStack,
    Text,
    Link as ChakraLink,
    FormErrorMessage
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { UserService } from "../../../core/service/user/UserService";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Email inválido')
        .required('Email é obrigatório'),
    firstName: yup
        .string()
        .required('Nome é obrigatório'),
    lastName: yup
        .string()
        .required('Sobrenome é obrigatório'),
    password: yup
        .string()
        .min(8, 'A senha deve ter pelo menos 8 caracteres')
        .required('Senha é obrigatória'),
    confirmpassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'As senhas devem corresponder')
        .required('Confirmação de senha é obrigatória'),
});

export default function Register() {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data: any) => {
        console.log(data);
        try {
            const res = await UserService.Login(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box width="100%" maxW="500px" mx="auto" mt="3rem" >
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={2}>
                    <Text fontSize="2xl" fontWeight="bold">Criar Conta</Text>
                    <FormControl id="email" isInvalid={!!errors.email}>
                        <FormLabel>Digite seu e-mail</FormLabel>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Input placeholder="Email" type="email" {...field} />
                            )}
                        />
                        <FormErrorMessage>
                            {errors.email?.message && errors.email?.message.toString()}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl id="firstName" isInvalid={!!errors.firstName}>
                        <FormLabel>Nome</FormLabel>
                        <Controller
                            name="firstName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Input placeholder="Nome" type="text" {...field} />
                            )}
                        />
                        <FormErrorMessage>
                            {errors.firstName?.message && errors.firstName?.message.toString()}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl id="lastName" isInvalid={!!errors.lastName}>
                        <FormLabel>Sobrenome</FormLabel>
                        <Controller
                            name="lastName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Input placeholder="Sobrenome" type="text" {...field} />
                            )}
                        />
                        <FormErrorMessage>
                            {errors.lastName?.message && errors.lastName?.message.toString()}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl id="password" isInvalid={!!errors.password}>
                        <FormLabel>Senha</FormLabel>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Input placeholder="Senha" type="password" {...field} />
                            )}
                        />
                        <FormErrorMessage>
                            {errors.password?.message && errors.password?.message.toString()}
                        </FormErrorMessage>
                    </FormControl>
                    <FormControl id="confirmpassword" isInvalid={!!errors.confirmpassword}>
                        <FormLabel>Confirmar Senha</FormLabel>
                        <Controller
                            name="confirmpassword"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Input placeholder="Confirmar Senha" type="password" {...field} />
                            )}
                        />
                        <FormErrorMessage>
                            {errors.confirmpassword?.message && errors.confirmpassword?.message.toString()}
                        </FormErrorMessage>
                    </FormControl>
                    <br/>
                    <Button width="full" colorScheme="blue" type="submit">
                        Criar Conta
                    </Button>
                    <Text fontSize="sm">
                        Já tem conta? <ChakraLink as={RouterLink} to="/login" color="blue.500">Iniciar Sessão</ChakraLink>
                    </Text>
                </VStack>
            </form>
        </Box>
    );
}
