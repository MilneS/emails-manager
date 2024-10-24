import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { RootSate } from "@/appStore/store";
import { useSelector, useDispatch } from "react-redux";
import { FieldValues, useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { loginFields, registerFields } from "@/utils";
import { LoginField, User } from "@/appStore/interface/interface.model";
import { setIsLoggedIn, setUserData } from "@/appStore/authSlice";
import { getUser, createUser } from "../../services/user";

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
  const [userError, setUserError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const userData: User | null = useSelector(
    (state: RootSate) => state.authReducer.userData
  );

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
  const loginSubmition = async (data: FieldValues) => {
    const { loginEmail, loginPassword } = data;
    if (Object.keys(errors).length === 0) {
      const user = await getUser(loginEmail);
      if (user && loginPassword === user.password) {
        dispatch(setUserData(user));
        dispatch(setIsLoggedIn(true));
      } else {
        setUserError("Incorrect email or password.");
      }
    }
  };
  const registerSubmition = async (data: FieldValues) => {
    const { registerEmail, registerPassword, registerName } = data;
    if (Object.keys(errors).length === 0) {
      const user = await getUser(registerEmail);
      if (user) {
        setUserError("There is already a user with this email.");
      } else {
        const userData = {
          name: registerName,
          email: registerEmail,
          password: registerPassword,
          isAdmin: false,
        };
        createUser(registerName, registerEmail, registerPassword, false);
        dispatch(setUserData(userData));
        dispatch(setIsLoggedIn(true));
      }
    }
  };

  const errorsCheck = (fieldId: string) => {
    let errorCheck = false;
    let helperTextCheck: boolean | string | undefined = false;
    // error
    if (errors[fieldId]) {
      errorCheck = true;
    } else if (userError) {
      !isRegister
        ? (errorCheck = !!userError)
        : (errorCheck = !!(fieldId === "registerEmail" && userError));
    } else {
      errorCheck = false;
    }
    // helperText
    if (!!userError) {
      !isRegister
        ? (helperTextCheck = userError)
        : (helperTextCheck = fieldId === "registerEmail" && userError);
    } else {
      !!errors[fieldId]?.message
        ? (helperTextCheck = `${errors[fieldId]?.message}`)
        : (helperTextCheck = undefined);
    }
    return { errorCheck, helperTextCheck };
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
        onSubmit={handleSubmit((data) =>
          isRegister ? registerSubmition(data) : loginSubmition(data)
        )}
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
              error={errorsCheck(field.id).errorCheck}
              helperText={errorsCheck(field.id).helperTextCheck}
              onChange={() => {
                clearErrors(field.id);
                setUserError(null);
              }}
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
