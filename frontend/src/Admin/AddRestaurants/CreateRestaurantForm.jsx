import React, { useState } from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { createRestaurant } from "../../State/Customers/Restaurant/restaurant.action";
import CloseIcon from "@mui/icons-material/Close";
import { uploadToCloudinary } from "../utils/UploadToCloudnary";
import { CircularProgress, IconButton } from "@mui/material";
import { topMeels } from "../../Data/topMeels";

const initialValues = {
  name: "",
  description: "",
  cuisineType: "",
  streetAddress: "",
  city: "",
  stateProvince: "",
  postalCode: "",
  country: "",
  email: "",
  mobile: "",
  openingHours: "Mon-Sun: 9:00 AM - 9:00 PM",
  images: [],
};

const CreateRestaurantForm = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwt");
  const [uploadImage, setUploadingImage] = useState(false);

  const handleSubmit = (values) => {
    const data = {
      name: values.name,
      description: values.description,
      cuisineType: values.cuisineType,
      address: {
        streetAddress: values.streetAddress,
        city: values.city,
        stateProvince: values.stateProvince,
        postalCode: values.postalCode,
        country: values.country,
      },
      contactInformation: {
        email: values.email,
        mobile: values.mobile,
      },
      openingHours: values.openingHours,
      images: values.images,
    };
    dispatch(createRestaurant({ data, token }));
  };

  const formik = useFormik({ initialValues, onSubmit: handleSubmit });

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    setUploadingImage(true);
    const image = await uploadToCloudinary(file);
    formik.setFieldValue("images", [...formik.values.images, image]);
    setUploadingImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };

  return (
    <div className="px-5 lg:px-32 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-bold text-2xl text-center py-2">Add New Restaurant</h1>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* 图片上传 */}
          <div className="flex flex-wrap gap-5">
            <input type="file" accept="image/*" id="fileInput" style={{ display: "none" }} onChange={handleImageChange} />
            <label className="relative" htmlFor="fileInput">
              <span className="w-24 h-24 cursor-pointer flex items-center justify-center p-3 border rounded-md border-gray-300">
                <AddPhotoAlternateIcon className="text-gray-500" />
              </span>
              {uploadImage && (
                <div className="absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center">
                  <CircularProgress />
                </div>
              )}
            </label>
            <div className="flex flex-wrap gap-2">
              {formik.values.images.map((image, index) => (
                <div key={index} className="relative">
                  <img className="w-24 h-24 object-cover" src={image} alt={`img ${index + 1}`} />
                  <IconButton onClick={() => handleRemoveImage(index)} size="small" sx={{ position: "absolute", top: 0, right: 0 }}>
                    <CloseIcon sx={{ fontSize: "1rem" }} />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>

          <TextField fullWidth label="Name" name="name" variant="outlined"
            onChange={formik.handleChange} value={formik.values.name} />

          <TextField fullWidth label="Description" name="description" variant="outlined"
            onChange={formik.handleChange} value={formik.values.description} />

          {/* Cuisine Type + Opening Hours */}
          <div className="grid grid-cols-2 gap-4">
            <FormControl fullWidth variant="outlined">
              <InputLabel>Cuisine Type</InputLabel>
              <Select name="cuisineType" label="Cuisine Type"
                onChange={formik.handleChange} value={formik.values.cuisineType}>
                {topMeels.map((item) => (
                  <MenuItem key={item.title} value={item.title}>{item.title}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField fullWidth label="Opening Hours" name="openingHours" variant="outlined"
              onChange={formik.handleChange} value={formik.values.openingHours} />
          </div>

          <TextField fullWidth label="Street Address" name="streetAddress" variant="outlined"
            onChange={formik.handleChange} value={formik.values.streetAddress} />

          {/* City + State + Postal */}
          <div className="grid grid-cols-3 gap-4">
            <TextField fullWidth label="City" name="city" variant="outlined"
              onChange={formik.handleChange} value={formik.values.city} />
            <TextField fullWidth label="State/Province" name="stateProvince" variant="outlined"
              onChange={formik.handleChange} value={formik.values.stateProvince} />
            <TextField fullWidth label="Postal Code" name="postalCode" variant="outlined"
              onChange={formik.handleChange} value={formik.values.postalCode} />
          </div>

          <TextField fullWidth label="Country" name="country" variant="outlined"
            onChange={formik.handleChange} value={formik.values.country} />

          {/* Email + Mobile */}
          <div className="grid grid-cols-2 gap-4">
            <TextField fullWidth label="Email" name="email" variant="outlined"
              onChange={formik.handleChange} value={formik.values.email} />
            <TextField fullWidth label="Mobile" name="mobile" variant="outlined"
              onChange={formik.handleChange} value={formik.values.mobile} />
          </div>

          <Button variant="contained" color="primary" type="submit">
            Create Restaurant
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateRestaurantForm;
