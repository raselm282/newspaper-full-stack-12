import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import AuthContext from "../AuthContext/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleLogin from "../Components/GoogleLogin";
import Swal from "sweetalert2";
import loginLogo from '../assets/login_marathon.jpg'
import bgImg from '../assets/login_marathon.jpg'



const Login = () => {
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const { signIn, createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";
  // console.log("state in the location login page", location.state);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    signIn(data?.email, data?.password).then((result) => {
      const user = result.user;
      // console.log(user);
      Swal.fire({
        title: "User Login Successful.",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      navigate(from, { replace: true });
    });
    // createUser(data.email, data.password).then((result) => {
    //   const loggedUser = result.user;
    //   console.log(loggedUser);
    //   updateUserProfile(data.name, data.photoURL)
    //     .then(() => {
    //       // create user entry in the database
    //       const userInfo = {
    //         name: data.name,
    //         email: data.email,
    //         photo: data.photoURL,
    //       };
    //       axiosPublic.post("/users", userInfo).then((res) => {
    //         if (res.data.insertedId) {
    //           console.log("user added to the database");
    //           reset();
    //           Swal.fire({
    //             position: "top-end",
    //             icon: "success",
    //             title: "User created successfully.",
    //             showConfirmButton: false,
    //             timer: 1500,
    //           });
    //           navigate("/");
    //         }
    //       });
    //     })
    //     .catch((error) => console.log(error));
    // });
  };
  return (
    <>
      <Helmet>
        <title>Newspaper | Login</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="text-center lg:text-left">
            <img className="mx-auto w-auto h-20 sm:h-96 " src={loginLogo} alt="logo" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <h1 className="pt-3 text-center text-3xl font-bold">Login now!</h1>
            <div>
              <GoogleLogin></GoogleLogin>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  name="email"
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: true,
                  })}
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password && (
                  <span className="text-red-600">Password is required</span>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <p className="p-6">
              <small>
                You have no account ?{" "}
                <Link className="text-green-800 underline" to="/register">
                  Register
                </Link>
                .
              </small>
            </p>
          </div>
          {/* <div
          className="hidden bg-cover bg-center lg:block lg:w-1/2"
          style={{
            backgroundImage: `url(${bgImg})`,
          }}
        ></div> */}
        </div>
      </div>
    </>
  );
};

export default Login;
