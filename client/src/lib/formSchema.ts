import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().min(3).required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const searchSchema = yup.object().shape({
  search: yup.string(),
});

export const editClientSchema = yup.object().shape({
  nom: yup.string().min(3).required("Name is required"),
  email: yup.string().email().required("Email is required"),
  tel: yup
    .string()
    .length(10, "Should have 10 digit")
    .required("Phone is required"),
  adresse: yup.string().required("Address is required"),
  code_postal: yup.string().required("Postal code is required"),
  ville: yup.string().required("City is required"),
});
