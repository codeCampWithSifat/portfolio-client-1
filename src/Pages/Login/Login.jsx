import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLogin from "../../Components/SocialLogin";

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        navigate(from, { replace: true });
        console.log(user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        const errorMessage = error.errorMessage;
        console.log(errorMessage);
      });
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;

    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  // if (loading) {
  //   return <LoadingButton />;
  // }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="h-[600px] flex justify-center items-center mt-20">
        <div className="w-96 p-4">
          <h2 className="text-3xl text-center">Please Login</h2>

          <form onSubmit={handleLogin}>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-md"> Email</span>
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full "
              />
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-md">Password</span>
              </label>
              <input
                type="password"
                name="password"
                className="input input-bordered w-full "
              />
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <LoadCanvasTemplate />
              </label>
              <input
                type="text"
                name="captcha"
                placeholder="Type Captcha Above"
                className="input input-bordered w-full "
                onBlur={handleValidateCaptcha}
              />
            </div>
            <input
              type="submit"
              className="input input-bordered w-full bg-primary text-white my-4"
              value="Login"
              disabled={disabled}
            />
          </form>
          <p>
            Do Not Have Any Account{" "}
            <Link to="/signup" className="text-red-500">
              Please SignUp
            </Link>
          </p>
          <div className="divider">OR</div>
          <SocialLogin />
        </div>
      </div>
    </>
  );
};

export default Login;
