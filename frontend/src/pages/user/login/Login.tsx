import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";
import { UserService } from "../../../core/service/user/UserService";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import {
    Container,
    TextField,
    Button,
    Typography,
    Link,
    Box,
    FormControl,
    FormHelperText
} from '@mui/material';

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Email inválido')
        .required('Email é obrigatório'),
    password: yup
        .string()
        .required('Senha é obrigatória'),
});

export default function Login() {
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
        <Container maxWidth="sm" sx={{ mt: '8rem' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '& .MuiTextField-root': { 
                            m: 1,
                            width: {
                              xs: '100%', // Full width on extra small screens
                              sm: '50ch' // Limited to 50ch on larger screens
                         }, 
                    }}
                }
                    noValidate
                    autoComplete="off"
                >
                    <Typography variant="h4" component="h1" gutterBottom>
                        Iniciar Sessão
                    </Typography>
                    <FormControl error={!!errors.email}>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) =>
                                <TextField
                                    {...field}
                                    label="Digite seu e-mail"
                                    error={!!errors.email}
                                    helperText={errors.email && String(errors.email.message)}
                                    variant="outlined"
                                />}
                        />
                    </FormControl>
                    <FormControl error={!!errors.password}>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) =>
                                <TextField
                                    {...field}
                                    label="Senha"
                                    type="password"
                                    error={!!errors.password}
                                    helperText={errors.password && String(errors.password.message)}
                                    variant="outlined"
                                />}
                        />
                    </FormControl>
                    <Button style={{marginTop: "1rem", backgroundColor:"red"}} variant="contained" type="submit">
                        Entrar
                    </Button>
                    <br/>
                    <Typography variant="body2" color="text.secondary">
                        Ainda não tem conta? <Link component={RouterLink} to="/register" color="primary">Registre-se</Link>
                    </Typography>
                </Box>
            </form>
        </Container>
    );
}
