import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [btn, setBtn] = useState(false);
  const userLogin = async (data) => {
    await axios
      .post("http://localhost:3000/login/", data)
      .then((res) => {
        toast.success(res.data.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        console.log(res);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        console.log(err);
      });
  };
  const initialValue = {
    email: "",
    password: "",
  };
  const validateSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is Required"),
    password: Yup.string()
      .min(8, "Password is too short")
      .required("Password is Required"),
  });
  const handleSubmit = (values, { resetForm }) => {
    setBtn(true);
    const { email, password } = values;
    const data = {
      email,
      password,
    };
    userLogin(data);
    console.log(data);
    resetForm();
    setBtn(false);
  };
  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <h1 className="font-extrabold my-8 hover:cursor-default text-4xl">
        HTVision Login
      </h1>
      <Formik
        initialValues={initialValue}
        validationSchema={validateSchema}
        onSubmit={handleSubmit}
      >
        <Form className="my-8 max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-2xl justify-center">
          <div className="flex items-baseline justify-between space-x-2 my-3">
            <label className="font-bold text-xl" for="email">
              Email:
            </label>
            <div className="flex flex-col">
              <Field
                className="px-2 py-1 rounded-xl border-black border-2  invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                type="email"
                name="email"
                placeholder="eg. name@htvision.com"
              />
              <ErrorMessage
                component="div"
                name="email"
                className="text-red-600"
              />
            </div>
          </div>

          <div className="flex items-baseline justify-between space-x-2 my-3">
            <label className="font-bold text-xl" for="password">
              Password:
            </label>
            <div className="flex flex-col">
              <Field
                className="px-2 py-1 rounded-xl border-black border-2 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
                type="password"
                name="password"
                placeholder="minimun 8 length"
              />
              <ErrorMessage
                component="div"
                name="password"
                className="text-red-600"
              />
            </div>
          </div>

          <div className="flex justify-center items-center mt-6">
            <button
              type="submit"
              className="text-xl font-bold border-black border-4 rounded-2xl bg-black text-white px-3 enabled:hover:bg-white enabled:hover:text-black"
              disabled={btn}
            >
              Login
            </button>
          </div>
          <ToastContainer />
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
