import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography } from "@mui/material";
interface FirstPageProps {
  setIsFirstPageFilled: React.Dispatch<React.SetStateAction<boolean>>;
}
interface FormData {
  name: string;
  phoneNumber: string;
  email: string;
}

const FirstPage = ({ setIsFirstPageFilled }: FirstPageProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phoneNumber: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState<FormData>({
    name: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { name, phoneNumber, email } = formData;

    // Validate form data
    const errors: FormData = {
      name: name ? "" : "Name is required.",
      phoneNumber: phoneNumber ? "" : "Phone number is required.",
      email: email ? "" : "Email is required.",
    };

    // Phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    console.log(phoneNumber.length);
    if (!phoneRegex.test(phoneNumber)) {
      errors.phoneNumber = "Invalid phone number format.";
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      errors.email = "Invalid email format.";
    }

    if (!name || !phoneNumber || !email) {
      setFormErrors(errors);
    } else {
      // Save data to localStorage
      if (phoneNumber.length === 10) {
        localStorage.setItem("userData", JSON.stringify(formData));
        setIsFirstPageFilled(true);
        navigate("/home");
      } else {
        setFormErrors(errors);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center">
        Enter Your Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!formErrors.name}
          helperText={formErrors.name}
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!formErrors.phoneNumber}
          helperText={formErrors.phoneNumber}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!formErrors.email}
          helperText={formErrors.email}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default FirstPage;
