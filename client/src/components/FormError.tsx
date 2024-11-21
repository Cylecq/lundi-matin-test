import { FieldError } from "react-hook-form";

type Props = {
  fieldError?: FieldError;
};

const FormError = ({ fieldError }: Props) => {
  if (!fieldError) {
    return null;
  }

  return <p className="text-red-500 text-sm">{fieldError.message}</p>;
};

export default FormError;
