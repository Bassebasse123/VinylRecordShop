/* import { useContext } from "react";
import { DataContext } from "../store/context"; */
import { useForm } from "react-hook-form";

const Form = ({ onSubmit, inputs, buttonText, heading }) => {
  // const { usersState } = useContext(DataContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form className='form-container' onSubmit={handleSubmit(onSubmit)}>
      <h1>{heading}</h1>
      {inputs.map((input) => (
        <div key={input.name} className='info'>
          <input
            name={input.name}
            placeholder={input.placeholder}
            defaultValue={input.defaultValue}
            {...register(input.name, input.validation)}
          />

          <div className='error-message'>
            {errors[input.name] && <span>{errors[input.name].message}</span>}
          </div>
        </div>
      ))}
      {/* {usersState.errorMessage && <span>{usersState.errorMessage}</span>} */}

      <div className='submit'>
        <input className='button-bg' type='submit' value={buttonText} />
      </div>
    </form>
  );
};

export default Form;
