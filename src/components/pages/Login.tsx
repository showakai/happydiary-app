import { Box, Button, Typography } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

interface LoginProps {
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

function Login() {
  const { setIsAuth }: LoginProps = useAppContext();
  const navigate = useNavigate();

  const onClickLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const userId = result.user.uid;
        console.log(userId);
        localStorage.setItem("isAuth", JSON.stringify(true));
        setIsAuth(true);
        navigate("/");
      })
      .catch((error) => {
        throw error;
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        backgroundColor: (theme) => theme.palette.primary.main,
      }}
    >
      <Typography variant="h4" fontWeight={700} color="#555">
        iikoto
      </Typography>
      <Typography>Googleでログインする</Typography>
      <Button
        onClick={onClickLogin}
        sx={{
          color: "white",
          backgroundColor: (theme) => theme.palette.pink.main,
        }}
        variant="contained"
      >
        ログイン
      </Button>
    </Box>
  );
}

export default Login;
