import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setTip as setTipRedux } from "state";

const EditTipForm = ({ tipId }) => {
  // State for storing the tip
  const [tip, setTip] = useState(null);

  // Retrieve the token from the Redux store
  const token = useSelector((state) => state.token);

  // Access the theme palette and navigation function from Material-UI
  const { palette } = useTheme();
  const navigate = useNavigate();

  // Dispatch function for updating the tip in Redux store
  const dispatch = useDispatch();

  // Fetch the tip data from the server upon component mount
  useEffect(() => {
    const getTip = async () => {
      try {
        const response = await fetch(`http://localhost:3001/tips/${tipId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        // Update the tip in Redux store
        dispatch(setTip(data));

        if (response.ok) {
          // Set the tip in component state
          setTip(data);
        } else {
          throw new Error("Error fetching tip data");
        }
      } catch (error) {
        console.log("Error fetching tip:", error);
      }
    };

    getTip();
  }, [tipId, token]);

  // Set initial form values based on the fetched tip data
  const initialValues = {
    title: tip?.title || "",
    description: tip?.description || "",
    videoPath: tip?.videoPath || "",
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("videoPath", values.videoPath);

      const response = await fetch(
        `http://localhost:3001/tips/${tipId}/edit`,
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
        setTip(data);
        dispatch(setTipRedux({ tip: data }));
        navigate(`/tips`);
      } else {
        throw new Error("Error updating user");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // If tip data is not fetched yet, show a loading message
  if (!tip) {
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
      }) => (
        <Form>
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

            {/* Tip VideoPath field */}
            <TextField
              label="VideoPath"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.videoPath}
              name="videoPath"
              error={Boolean(touched.videoPath) && Boolean(errors.videoPath)}
              helperText={touched.videoPath && errors.videoPath}
              sx={{ gridColumn: "span 4" }}
            />

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
                Edit tip
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default EditTipForm;
