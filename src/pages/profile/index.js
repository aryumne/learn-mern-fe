import React, { useEffect, useState } from "react";
import BoxSection from "../../component/BoxSection";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Avatar from '@mui/material/Avatar';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { uid } = useParams();
  const [user, setUser] = useState({});
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    return async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/user/${uid}`);
        const result = await response.json();
        if (!response.ok) {
          console.log(result);
          throw new Error('Failed to get data, try again later!');
        }
        console.log(result);
        setUser(result.data);
      } catch (e) {
        console.log(e.message);
      }
      setIsloading(false);
    }
  }, []);
  return (
    <BoxSection>
      <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <Paper key={user.id} sx={{ flexGrow: 1, width: 300, p: 3, pt: 4, mb: 1 }} elevation={3}>
          <Avatar src={user.image} alt={user.name} sx={{ width: 150, height: 150, m: 'auto', mb: 2 }} />
          <Divider sx={{ mt: 3, mb: 1 }} />
          <Typography variant="h5" fontWeight='bold' textAlign='center'>{user.name}</Typography>
          <Typography variant="subtitle1" textAlign='center' gutterBottom>{user.id}</Typography>
          <Typography variant="h6" textAlign='center'>{user.email}</Typography>
        </Paper>
      </Box>
    </BoxSection>
  );
};

export default Profile;
