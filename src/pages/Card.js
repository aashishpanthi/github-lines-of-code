import { useSearchParams, useNavigate } from "react-router-dom";

const Card = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const query = searchParams.get("user");

  if (!query) {
    navigate("/");
  }

  return <div>Card</div>;
};

export default Card;
