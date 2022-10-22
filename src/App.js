import React from "react";
import { RouterProvider } from "react-router-dom";
import Router from "./routes";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { AuthCtxProvider } from "./configs/context/AuthContext";
import Authentication from "./utils/Authentication";

function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex' }}>
      <LinearProgress />
    </Box>
  );
}

function App() {
  const { token, userId, login, logout } = Authentication();

  const AuthCtxValue = {
    isLoggedIn: !!token,
    userId: userId,
    token: token,
    login: login,
    logout: logout
  }

  return (
    <AuthCtxProvider valueCtx={AuthCtxValue}>
      <RouterProvider router={Router} fallbackElement={<CircularIndeterminate />} />
    </AuthCtxProvider>
  );
}

export default App;
