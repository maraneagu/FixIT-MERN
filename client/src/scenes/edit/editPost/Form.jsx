import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  InputLabel,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setPost as setPostRedux } from "state";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FlexBetween from "components/FlexBetween";

const EditPostForm = ({ postId }) => {
  const [post, setPost] = useState(null);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getPost = async () => {
        try {
            const response = await fetch(`http://localhost:3001/posts/${postId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            dispatch(setPost(data));

            if (response.ok) {
            const data = await response.json();

            setPost(data);
            } else {
            throw new Error("Error fetching post data");
            }
        } catch (error) {
            console.log("Error fetching post:", error);
        }
    };

    getPost();
  }, [postId, token]);

  const initialValues = {
    title: post?.title || "",
    description: post?.description || "",
    picturePath: post?.picturePath || "",
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);

      //daca schimbam poza,
      if (values.picturePath.name)
        formData.append("picturePath", values.picturePath.name);
      // daca schimbam orice dar nu poza
      else formData.append("picturePath", values.picturePath);
      
      const response = await fetch(
        `http://localhost:3001/posts/${postId}/edit`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setPost(data);
        dispatch(setPostRedux({ post: data }));
        navigate(`/show/${postId}`);
      } else {
        throw new Error("Error updating user");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <Form>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          >
            <TextField
              label="Title"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.title}
              name="title"
              error={Boolean(touched.title) && Boolean(errors.title)}
              helperText={touched.title && errors.title}
              sx={{ gridColumn: "span 4" }}
            />

            <TextField
              label="Description"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              name="description"
              error={Boolean(touched.description) && Boolean(errors.description)}
              helperText={touched.description && errors.description}
              sx={{ gridColumn: "span 4" }}
            />

            <InputLabel id="picture-label" sx={{ marginBottom: "-22px" }}>
              Post Picture
            </InputLabel>
            <Box
              gridColumn="span 4"
              border={`1px solid ${palette.neutral.medium}`}
              borderRadius="5px"
              p="1rem"
              name="picturePath"
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  setFieldValue("picturePath", acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    {!values.picturePath.name ? (
                      <FlexBetween>
                        <Typography>{values.picturePath}</Typography>
                        <EditOutlinedIcon />
                      </FlexBetween>
                    ) : (
                      <FlexBetween>
                        <Typography>{values.picturePath.name}</Typography>
                        <EditOutlinedIcon />
                      </FlexBetween>
                    )}
                    <input {...getInputProps()} />
                  </Box>
                )}
              </Dropzone>
            </Box>

            <Box sx={{ gridColumn: "span 4", placeSelf: "center" }}>
              <Button
                fullWidth
                type="submit"
                sx={{
                  m: "0.5rem 0",
                  p: "1rem",
                  backgroundColor: palette.login.button,
                  color: palette.background.alt,
                  "&:hover": {
                    backgroundColor: palette.login.buttonHover,
                    color: palette.login.buttonTextHover,
                  },
                }}
              >
                Edit post
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default EditPostForm;
