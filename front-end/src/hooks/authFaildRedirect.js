import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../redux/slices/auth";

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  if (!isAuth) navigate("/", { replace: true });
};
