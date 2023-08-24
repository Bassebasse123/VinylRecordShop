/* import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import { DataContext } from "../../store/context";
// import { updateUser } from "../../apiCalls/usersApiCalls";

import Form from "../Form";

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { usersState } = useContext(DataContext);
  const user = usersState.user;

  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (user.avatar) {
      setAvatar(user.avatar);
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      // const response = await updateUser(usersDispatch, data);
      console.log("");
    } catch (error) {
      console.log(error);
    }
  };

  const onAvatarChange = (e) => {
    const fileSelected = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.readAsDataURL(fileSelected);

    fileReader.onloadend = () => {
      setAvatar(fileReader.result);
    };
  };

  const updateAvatar = async () => {
    try {
      console.log("");
    } catch (error) {
      console.log(error);
    }
  };

  const inputs = [
    {
      name: "firstName",
      placeholder: "First name",
      defaultValue: user.firstName,
      validation: {
        required: "Please put your first name.",
      },
    },
    {
      name: "lastName",
      placeholder: "Last name",
      defaultValue: user.lastName,
      validation: {
        required: "Please put your last name.",
      },
    },
    {
      name: "email",
      placeholder: "Email",
      defaultValue: user.email,
      validation: {
        required: "Please put your email sir.",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "Email is invalid. Please fix",
        },
      },
    },
  ];

  return (
    <div className='form-container'>
      <h1>Your profile, {user.firstName}</h1>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        inputs={inputs}
        buttonText='Save'
      />
      <input
        type='file'
        accept='image/*'
        name='avatar'
        onChange={onAvatarChange}
      />
      <div className='submit'>
        <input
          type='submit'
          className='button-bg'
          value='Update Avatar'
          onClick={updateAvatar}
        />
      </div>
    </div>
  );
};

export default Profile;
 */
