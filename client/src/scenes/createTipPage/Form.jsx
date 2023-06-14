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

const CreateTipForm = () => {
  const userId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    description: "",
    category:"",
    videoPath: "",
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append("videoPath", values.videoPath);

      // //daca schimbam poza,
      // if (values.picturePath.name)
      //   formData.append("picturePath", values.picturePath.name);
      // // daca schimbam orice dar nu poza
      // else formData.append("picturePath", values.picturePath);

      const response = await fetch(
        `http://localhost:3001/tips/${userId}/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
        //"Content-Type": "application/json", asta imi dadea eroarea cu cors.
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate(`/profile/${userId}`);
      } else {
        throw new Error("Error creating tip");
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
        setFieldValue,
        handleSubmit,
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
              error={
                Boolean(touched.title) && Boolean(errors.title)
              }
              helperText={touched.title && errors.title}
              sx={{ gridColumn: "span 4" }}
            />

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

            <InputLabel sx={{ marginBottom: '-22px' }}>Category</InputLabel>
            <Select
              value={values.category}
              onBlur={handleBlur}
              name="category"
              error={Boolean(touched.category) && Boolean(errors.category)}
              helperText={touched.category && errors.category}
              onChange={handleChange}
              sx={{ gridColumn: 'span 4' }}
            >
              <MenuItem value="auto" >Auto</MenuItem>
              <MenuItem value="tailoring" >Tailoring</MenuItem>
              <MenuItem value="furniture" >Furniture</MenuItem>
              <MenuItem value="electronics" >Electronics</MenuItem>
              <MenuItem value="instalation" >Instalation</MenuItem>
            </Select>

            <TextField
              label="VideoPath"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.videoPath}
              name="videoPath"
              error={
                Boolean(touched.videoPath) && Boolean(errors.videoPath)
              }
              helperText={touched.videoPath && errors.videoPath}
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
                Create Tip
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default CreateTipForm;
