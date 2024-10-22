import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { RootSate } from "@/appStore/store";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { loginFields, registerFields } from "@/utils";
import { LoginField } from "@/appStore/interface/interface.model";

const centerColStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};
const cardStyle = {
  width: "25rem",
  height: "fit-content",
  p: "3rem",
  m: 0,
};
const StyledTextField = styled(TextField)(() => ({
  marginBottom: "1rem",
  width: "100%",
}));

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);

  const {
    register,
    watch,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm();

  const validationData = (field: LoginField) => {
    return {
      required: field.isRequired,
      validate:
        field.id === "confirmPassword"
          ? (val: string) => {
              if (
                watch(isRegister ? "registerPassword" : "loginPassword") != val
              ) {
                return "Your passwords do no match.";
              }
            }
          : undefined,
      pattern:
        field.type === "email"
          ? {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address",
            }
          : undefined,
      minLength: {
        value: field.minLength,
        message: `This field needs to be at least ${field.minLength} chars. long`,
      },
      maxLength: {
        value: field.maxLength,
        message: `This cannot exceed ${field.maxLength} chars.`,
      },
    };
  };

  return (
    <Card sx={cardStyle}>
      <Typography variant="h5" mb="2rem">
        {isRegister ? "Register" : "Login"}
      </Typography>
      <Box
        sx={centerColStyle}
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        {(isRegister ? registerFields : loginFields).map(
          (field: LoginField) => (
            <StyledTextField
              key={field.id}
              {...register(field.id, validationData(field))}
              id={`field-${field.id}`}
              type={field.type}
              label={field.name}
              variant="outlined"
              error={!!errors[field.id]}
              helperText={
                errors[field.id]?.message
                  ? `${errors[field.id]?.message}`
                  : undefined
              }
              onChange={() => clearErrors(field.id)}
            />
          )
        )}
        <Button type="submit" variant="contained" sx={{ my: "1rem" }}>
          Submit
        </Button>
      </Box>
      <Button
        variant="text"
        sx={{ marginTop: "2rem" }}
        onClick={() => {
          setIsRegister(!isRegister);
          reset();
        }}
      >
        {isRegister ? "or login" : "or sign up"}
      </Button>
    </Card>
  );
};
export default Login;
