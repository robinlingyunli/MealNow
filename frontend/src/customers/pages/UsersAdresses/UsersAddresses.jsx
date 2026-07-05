import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AddressCard from "../../components/Address/AddressCard";
import { saveAddress, updateAddress, deleteAddress } from "../../../State/Authentication/Action";

const blankValues = { streetAddress: "", state: "", pincode: "", city: "" };

const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  pincode: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
});


const UsersAddresses = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const jwt = localStorage.getItem("jwt");

  const [addOpen, setAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  const handleAdd = (values, { resetForm }) => {
    dispatch(saveAddress({
      jwt,
      address: { streetAddress: values.streetAddress, city: values.city, state: values.state, postalCode: values.pincode, country: "Canada" },
    }));
    resetForm();
    setAddOpen(false);
  };

  const handleEdit = (values, { resetForm }) => {
    dispatch(updateAddress({
      jwt,
      addressId: editTarget.id,
      address: { streetAddress: values.streetAddress, city: values.city, state: values.state, postalCode: values.pincode, country: editTarget.country || "Canada" },
    }));
    resetForm();
    setEditTarget(null);
  };

  const handleRemove = (addressId) => {
    dispatch(deleteAddress({ jwt, addressId }));
  };

  const toFormValues = (addr) => ({
    streetAddress: addr.streetAddress || "",
    city: addr.city || "",
    state: addr.state || "",
    pincode: addr.postalCode || "",
  });

  return (
    <div className="lg:px-10">
      <h1 className="text-xl text-center py-7 font-semibold">Addresses</h1>

      <div className="grid grid-cols-2 gap-4">
        {/* Add Address card */}
        <div
          className="flex items-center justify-center border border-dashed border-gray-500 rounded-lg p-8 cursor-pointer hover:border-gray-300 transition-colors min-h-[100px]"
          onClick={() => setAddOpen(true)}
        >
          <span className="text-gray-400 text-lg font-medium">Add Address</span>
        </div>

        {/* Existing address cards */}
        {auth.user?.addresses.map((item) => (
          <AddressCard
            key={item.id}
            item={item}
            onEdit={() => setEditTarget(item)}
            onRemove={() => handleRemove(item.id)}
          />
        ))}
      </div>

      {/* Add Address Dialog */}
      <Dialog open={addOpen} onClose={() => setAddOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          Add New Address
          <IconButton onClick={() => setAddOpen(false)} size="small"><CloseIcon fontSize="small" /></IconButton>
        </DialogTitle>
        <Formik initialValues={blankValues} validationSchema={validationSchema} onSubmit={handleAdd}>
          <Form>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Field name="streetAddress" as={TextField} label="Street Address" fullWidth variant="outlined"
                    helperText={<ErrorMessage name="streetAddress">{(msg) => <span className="text-red-600">{msg}</span>}</ErrorMessage>} />
                </Grid>
                <Grid item xs={6}>
                  <Field name="city" as={TextField} label="City" fullWidth variant="outlined"
                    helperText={<ErrorMessage name="city">{(msg) => <span className="text-red-600">{msg}</span>}</ErrorMessage>} />
                </Grid>
                <Grid item xs={6}>
                  <Field name="state" as={TextField} label="State / Province" fullWidth variant="outlined"
                    helperText={<ErrorMessage name="state">{(msg) => <span className="text-red-600">{msg}</span>}</ErrorMessage>} />
                </Grid>
                <Grid item xs={6}>
                  <Field name="pincode" as={TextField} label="Postal Code" fullWidth variant="outlined"
                    helperText={<ErrorMessage name="pincode">{(msg) => <span className="text-red-600">{msg}</span>}</ErrorMessage>} />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ padding: "1rem" }}>
              <Button onClick={() => setAddOpen(false)} color="inherit">Cancel</Button>
              <Button type="submit" variant="contained" color="primary">Save Address</Button>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>

      {/* Edit Address Dialog */}
      {editTarget && (
        <Dialog open={!!editTarget} onClose={() => setEditTarget(null)} fullWidth maxWidth="sm">
          <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            Edit Address
            <IconButton onClick={() => setEditTarget(null)} size="small"><CloseIcon fontSize="small" /></IconButton>
          </DialogTitle>
          <Formik initialValues={toFormValues(editTarget)} validationSchema={validationSchema} onSubmit={handleEdit}>
            <Form>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Field name="streetAddress" as={TextField} label="Street Address" fullWidth variant="outlined"
                      helperText={<ErrorMessage name="streetAddress">{(msg) => <span className="text-red-600">{msg}</span>}</ErrorMessage>} />
                  </Grid>
                  <Grid item xs={6}>
                    <Field name="city" as={TextField} label="City" fullWidth variant="outlined"
                      helperText={<ErrorMessage name="city">{(msg) => <span className="text-red-600">{msg}</span>}</ErrorMessage>} />
                  </Grid>
                  <Grid item xs={6}>
                    <Field name="state" as={TextField} label="State / Province" fullWidth variant="outlined"
                      helperText={<ErrorMessage name="state">{(msg) => <span className="text-red-600">{msg}</span>}</ErrorMessage>} />
                  </Grid>
                  <Grid item xs={6}>
                    <Field name="pincode" as={TextField} label="Postal Code" fullWidth variant="outlined"
                      helperText={<ErrorMessage name="pincode">{(msg) => <span className="text-red-600">{msg}</span>}</ErrorMessage>} />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ padding: "1rem" }}>
                <Button onClick={() => setEditTarget(null)} color="inherit">Cancel</Button>
                <Button type="submit" variant="contained" color="primary">Update</Button>
              </DialogActions>
            </Form>
          </Formik>
        </Dialog>
      )}
    </div>
  );
};

export default UsersAddresses;
