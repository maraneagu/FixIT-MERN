import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik, Form } from "formik";
import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FlexBetween from "components/FlexBetween";

const CreatePostForm = () => {
  // Retrieve user ID and token from Redux store
  const userId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);

  // Access the theme palette
  const { palette } = useTheme();

  // Use the navigation function from react-router-dom
  const navigate = useNavigate();

  // Set initial form values
  const initialValues = {
    title: "",
    description: "",
    category: "",
    picturePath: "",
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("category", values.category);

      // If a new picture is selected, append the file name to the form data
      if (values.picturePath.name)
        formData.append("picturePath", values.picturePath.name);
      // If no new picture is selected, append the existing picture path
      else formData.append("picturePath", values.picturePath);

      // Make a POST request to create a new post
      const response = await fetch(`http://localhost:3001/posts/${userId}/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        // Navigate to the user's profile page after successful post creation
        navigate(`/profile/${userId}`);
      } else {
        throw new Error("Error creating post");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    // Wrap the form using Formik for form state management
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        setFieldValue,
      }) => (
        <Form>
          {/* Create a grid layout for the form */}
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          >
            {/* Title field */}
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

            {/* Description field */}
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

            {/* Category dropdown */}
            <InputLabel sx={{ marginBottom: "-22px" }}>Category</InputLabel>
            <Select
              value={values.category}
              onBlur={handleBlur}
              name="category"
              error={Boolean(touched.category) && Boolean(errors.category)}
              helperText={touched.category && errors.category}
              onChange={handleChange}
              sx={{ gridColumn: "span 4" }}
            >
              <MenuItem value="auto">Auto</MenuItem>
              <MenuItem value="tailoring">Tailoring</MenuItem>
              <MenuItem value="furniture">Furniture</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="instalation">Installation</MenuItem>
            </Select>

            {/* Picture upload */}
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
              {/* Dropzone for uploading pictures */}
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
                    {/* Display the selected picture name and an edit icon */}
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
                    
                    {/* Hidden input field for file selection */}
                    <input {...getInputProps()} />
                  </Box>
                )}
              </Dropzone>
            </Box>

            {/* Submit button */}
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
                Create Post
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CreatePostForm;
