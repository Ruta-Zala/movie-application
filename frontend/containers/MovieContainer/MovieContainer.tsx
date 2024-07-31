import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import { api, baseUrl } from "../../api/api";
import axios from "axios";

const data = [
  {
    id: "1",
    title: "movie 1",
    poster:
      "https://img.freepik.com/free-photo/movie-background-collage_23-2149876030.jpg",
    publishingYear: "2020",
  },
  {
    id: "1",
    title: "movie 1",
    poster:
      "https://img.freepik.com/free-photo/movie-background-collage_23-2149876030.jpg",
    publishingYear: "2020",
  },
  {
    id: "1",
    title: "movie 1",
    poster:
      "https://img.freepik.com/free-photo/movie-background-collage_23-2149876030.jpg",
    publishingYear: "2020",
  },
  {
    id: "1",
    title: "movie 1",
    poster:
      "https://img.freepik.com/free-photo/movie-background-collage_23-2149876030.jpg",
    publishingYear: "2020",
  },
  {
    id: "1",
    title: "movie 1",
    poster:
      "https://img.freepik.com/free-photo/movie-background-collage_23-2149876030.jpg",
    publishingYear: "2020",
  },
  {
    id: "1",
    title: "movie 1",
    poster:
      "https://img.freepik.com/free-photo/movie-background-collage_23-2149876030.jpg",
    publishingYear: "2020",
  },
];

function MovieContainer() {
  const router = useRouter();
  const { logout, isAuthenticated } = useAuth();
  const [moviesList, setMoviesList] = React.useState<Record<string, any>>([]);

  const fetchList = async () => {
    try {
      const response = await api.get("/api/movies");
      if (response) {
        setMoviesList(response);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };
  React.useEffect(() => {
    if (isAuthenticated) {
      fetchList();
    }
  }, [isAuthenticated]);

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        "@media(min-width: 1400px)": {
          maxWidth: "1400px !important",
        },
      }}
    >
      <Box
        pt={{ xs: "60px", md: "120px" }}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center" gap="12px">
          <Typography variant="h3" color="#fff">
            My Movies
          </Typography>
          <AddCircleOutlineIcon
            sx={{ color: "#fff", fontSize: "32px", cursor: "pointer" }}
            onClick={() => router.push("/add")}
          />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          gap="12px"
          sx={{ cursor: "pointer" }}
          onClick={() => logout()}
        >
          <Typography
            variant="h6"
            color="#fff"
            display={{ xs: "none", md: "block" }}
          >
            Logout
          </Typography>
          <LogoutIcon sx={{ color: "#fff", fontSize: "32px" }} />
        </Box>
      </Box>
      {moviesList?.length ? (
        <Box mt={{ xs: "60px", md: "120px" }}>
          <Grid container spacing={2} pb="50px">
            {moviesList?.map((i, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Card
                  sx={{
                    maxWidth: 345,
                    backgroundColor: "background.paper",
                    p: "5px",
                    borderRadius: "12px",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="Movie img"
                    image={`${baseUrl}/${i?.poster}`}
                    sx={{
                      borderRadius: "12px",
                      height: { xs: 246, md: 400 },
                      minWidth: { sm: 175, md: 266 },
                    }}
                  />
                  <CardContent
                    sx={{ mt: "12px", px: "10px", py: "10px !important" }}
                  >
                    <Box
                      display="flex"
                      alignContent="center"
                      justifyContent="space-between"
                    >
                      <Typography gutterBottom variant="body2" color="#fff">
                        { i?.title}
                      </Typography>
                      <DriveFileRenameOutlineIcon
                        sx={{
                          color: "#fff",
                          fontSize: "18px",
                          cursor: "pointer",
                        }}
                        onClick={() => router.push(`/edit/${i?.uuid}`)}
                      />
                    </Box>
                    <Typography variant="caption" color="#fff" mt="16px">
                      {i?.publishing_year}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          margin="auto"
        >
          <Typography variant="h3" color="#fff" textAlign="center">
            Your movie list is empty
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3, mb: 2, width: { xs: "100%", md: "auto" } }}
            onClick={() => router.push('/add')}
          >
            Add a new movie
          </Button>
        </Box>
      )}
    </Container>
  );
}

export default MovieContainer;
