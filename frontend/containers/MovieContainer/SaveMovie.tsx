import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  FormHelperText,
  Grid,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import PublishIcon from "@mui/icons-material/Publish";
import { useRouter } from "next/router";
import { api, baseUrl } from "../../api/api";
import axios from "axios";

// Define the validation schema using yup
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  publishing_year: yup
    .number()
    .typeError("Publishing year must be a number")
    .required("Publishing year is required"),
  poster: yup.mixed().required("Poster is required")
  .test('fileType', 'Poster must be an image', (value: Record<string, any>) => {
    return value && value[0] && ['image/jpeg', 'image/png'].includes(value[0].type);
  }),
});

const SaveMovie = ({ isEdit }: { isEdit?: boolean }) => {
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [editData, setEditData] = useState(null);
  const router = useRouter();

  const fetchMovie = async (id: string) => {
    try {
      const response = await api.get(`/api/movies/${id}`);

      if (response) {
        setEditData(response);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };
  React.useEffect(() => {
    if (router?.query?.id && isEdit) {
      fetchMovie(router?.query?.id);
    }
  }, [router?.query?.id, isEdit]);

  const defaultValues = React.useMemo(
    () => ({
      title: isEdit && editData ? editData?.title : "",
      publishing_year:
        isEdit && editData
          ? `202${editData?.publishing_year}`?.substring(0, 4)
          : "",
      poster: isEdit && editData ? `${baseUrl}/${editData?.poster}` : "",
    }),
    [editData, isEdit]
  );

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onDrop = (acceptedFiles: any) => {
    setValue("poster", acceptedFiles);
    const file = acceptedFiles[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPosterPreview(previewUrl);
    }
  };

  React.useEffect(() => {
    reset(defaultValues);
    if (defaultValues?.poster) {
      const fetchAndSetPosterBlob = async () => {
        try {
          const url = defaultValues?.poster
          const response = await fetch(url);
          const lastSlashIndex = url.lastIndexOf('/');
          const filename =  url.substring(lastSlashIndex + 1);
          const contentType = response.headers.get('Content-Type') || 'application/octet-stream';
          const blob = await response.blob();
          // Create a File object from the Blob
          const file = new File([blob], filename, { type:contentType });
          setValue("poster", [file]);
          setPosterPreview(url);
        } catch (error) {
          console.error("Error fetching the poster image:", error);
        }
      };

      fetchAndSetPosterBlob();
    }
  }, [defaultValues, reset, setValue]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png",
  });

  const onSubmit = async (data: Record<string, any>) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("publishing_year", data.publishing_year);
    formData.append("poster", data.poster[0]);

    try {
      let response = null;
      if (router?.query?.id) {
        response = await api.put(`/api/movies/${router?.query?.id}`, formData);
      } else {
        response = await api.post("/api/movies", formData);
      }

      if (response) {
        router.push("/movies");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        "@media(min-width: 1400px)": {
          maxWidth: "1400px !important",
        },
        my: { xs: "60px", md: "120x" },
      }}
    >
      <Typography variant="h3" component="h1" sx={{ color: "#fff" }}>
        {isEdit ? "Edit" : "Create Movie"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4} mt="15px">
            <Box>
              <Box
                {...getRootProps()}
                border={1}
                p={2}
                borderRadius={1}
                sx={{
                  borderColor: errors.poster ? "error.main" : "grey.400",
                  borderStyle: "dashed",
                  height: { xs: 290, md: 400 },
                  width: { xs: 290, md: 400 },
                  backgroundColor: "background.paper",
                  position: "relative",
                  margin: { xs: "auto", md: 0 },
                }}
              >
                <input {...getInputProps()} name="poster" />
                {posterPreview ? (
                  <Box mt={2}>
                    <Box
                      component="img"
                      src={posterPreview}
                      alt="Poster Preview"
                      style={{
                        width: "100%",
                        maxHeight: "300px",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    gap="10px"
                    sx={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      right: 0,
                      left: 0,
                    }}
                  >
                    <PublishIcon sx={{ fontSize: "32px", color: "#fff" }} />
                    <Typography variant="caption" color="#fff">
                      Upload Image Here
                    </Typography>
                  </Box>
                )}
              </Box>

              {errors.poster && (
                <FormHelperText error>{errors.poster.message}</FormHelperText>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Title"
                    variant="outlined"
                    fullWidth
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    size="small"
                    margin="normal"
                  />
                )}
              />
              <Controller
                name="publishing_year"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    placeholder="Publishing Year"
                    variant="outlined"
                    type="number"
                    error={!!errors.publishing_year}
                    helperText={errors.publishing_year?.message}
                    size="small"
                    margin="normal"
                    inputProps={{ maxLength: 4, minLength: 4 }}
                    sx={{ width: { xs: "100%", md: "auto" } }}
                  />
                )}
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent={{ xs: "center", md: "start" }}
              gap="10px"
              my="50px"
            >
              <Button
                variant="outlined"
                color="secondary"
                sx={{ mt: 2, width: { xs: "100%", md: "auto" } }}
                onClick={() => router.push("/movies")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2, width: { xs: "100%", md: "auto" } }}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SaveMovie;
