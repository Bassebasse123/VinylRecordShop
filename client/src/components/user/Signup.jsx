import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../store/context";
import { signup } from "../../apiCalls/usersApiCalls";

import gif01 from "../../assets/01.gif";

import Form from "../Form";

const Signup = () => {
  const { dispatchUsers, usersState } = useContext(DataContext);

  const navigate = useNavigate();

  useEffect(() => {
    usersState.isUserLoggedIn && navigate("/records");
  }, [usersState.isUserLoggedIn, navigate]);

  const onSubmit = async (data) => {
    try {
      await signup(dispatchUsers, data);
    } catch (err) {
      console.log("err ->", err);
    }
  };

  const inputs = [
    {
      name: "firstName",
      placeholder: "First name",
      defaultValue: "test",
      validation: {
        required: "Please put your first name.",
      },
    },
    {
      name: "lastName",
      placeholder: "Last name",
      defaultValue: "test",
      validation: {
        required: "Please put your last name.",
      },
    },
    {
      name: "email",
      placeholder: "Email",
      defaultValue: "test@test.com",
      // validation: {
      //   required: "Please put your email sir.",
      //   pattern: {
      //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      //     message: "Email is invalid. Please fix",
      //   },
      // },
    },
    {
      name: "password",
      placeholder: "Password",
      defaultValue: "test1234",
      validation: {
        required: "Required",
        minLength: {
          value: 5,
          message: "Password must be at least 5 characters",
        },
      },
    },
  ];

  return (
    <div className='layout'>
      <Form
        onSubmit={onSubmit}
        inputs={inputs}
        buttonText='Sign Up'
        heading='Hello there'
      />
      <div className='right'>
        <img src={gif01} alt='gif01' />
      </div>
    </div>
  );
};

export default Signup;
