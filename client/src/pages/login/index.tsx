import { SubmitHandler, useForm } from "react-hook-form";
import Box from "../../components/Box";
import { useLogin } from "../../api/user/hooks.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../lib/formSchema.ts";
import FormError from "../../components/FormError.tsx";

interface Inputs {
  username: string;
  password: string;
}

/**
 * Page de login
 *
 * @returns {JSX.Element}
 */
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<Inputs>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });
  const login = useLogin();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    login.mutate(data);
  };

  return (
    <>
      <Box>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl">Login</h1>
        </div>
      </Box>
      <Box>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-96 mx-auto border border-slate-200 px-4 py-2 gap-8"
        >
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="w-full border border-slate-100 my-2 px-2 py-1"
              {...register("username")}
            />
            <FormError fieldError={errors.username} />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full border border-slate-100 my-2 px-2 py-1"
              {...register("password")}
            />
            <FormError fieldError={errors.password} />
          </div>
          <button
            type="submit"
            className="bg-success px-6 py-2 my-2 text-white rounded-md hover:underline"
            disabled={isSubmitting || !isValid}
          >
            Login
          </button>
        </form>
      </Box>

      <p>username : test_api</p>
      <p>Password : api123456</p>
    </>
  );
}

export default Login;
