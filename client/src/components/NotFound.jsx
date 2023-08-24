import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h3>Page not found</h3>
      <button type='button' onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default NotFound;
