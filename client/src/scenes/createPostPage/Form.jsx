import { Box, Button, TextField, useTheme } from "@mui/material";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const CreatePostForm = () => {
  const userId = useSelector((state) => state.user._id);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const initialValues = {
    description: "",
  };

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${userId}/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            description: values.description,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate(`/profile/${userId}`);
      } else {
        throw new Error("Error creating post");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <Form>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          >
            <TextField
              label="Description"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.description}
              name="description"
              error={
                Boolean(touched.description) && Boolean(errors.description)
              }
              helperText={touched.description && errors.description}
              sx={{ gridColumn: "span 4" }}
            />

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
