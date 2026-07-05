import { Button, Card, Divider, Snackbar, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { Fragment, useEffect, useState } from "react";
import AddressCard from "../../components/Address/AddressCard";
import CartItemCard from "../../components/CartItem/CartItemCard";
import { useDispatch, useSelector } from "react-redux";

import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { Grid, TextField } from "@mui/material";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createOrder } from "../../../State/Customers/Orders/Action";
import { saveAddress, updateAddress, deleteAddress } from "../../../State/Authentication/Action";
import { findCart } from "../../../State/Customers/Cart/cart.action";
import { isValid } from "../../util/ValidToOrder";
import { cartTotal } from "./totalPay";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

const blankValues = { streetAddress: "", state: "", pincode: "", city: "" };

const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  pincode: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
});

const Cart = () => {
  const [openSnackbar, setOpenSnakbar] = useState(false);
  const dispatch = useDispatch();
  const { cart, auth } = useSelector((store) => store);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    dispatch(findCart(jwt));
  }, []);

  const handleSaveAddress = (values, { resetForm }) => {
    dispatch(saveAddress({
      jwt,
      address: { streetAddress: values.streetAddress, city: values.city, state: values.state, postalCode: values.pincode, country: "Canada" },
    }));
    resetForm();
    setOpenAddressModal(false);
  };

  const handleEditAddress = (values, { resetForm }) => {
    dispatch(updateAddress({
      jwt,
      addressId: editTarget.id,
      address: { streetAddress: values.streetAddress, city: values.city, state: values.state, postalCode: values.pincode, country: editTarget.country || "Canada" },
    }));
    if (selectedAddress?.id === editTarget.id) setSelectedAddress(null);
    resetForm();
    setEditTarget(null);
  };

  const handleRemoveAddress = (item) => {
    dispatch(deleteAddress({ jwt, addressId: item.id }));
    if (selectedAddress?.id === item.id) setSelectedAddress(null);
  };

  const handlePay = () => {
    if (!selectedAddress) return;
    const data = {
      jwt,
      order: {
        restaurantId: cart.cartItems[0].food?.restaurant.id,
        deliveryAddress: {
          fullName: auth.user?.fullName,
          streetAddress: selectedAddress.streetAddress,
          city: selectedAddress.city,
          state: selectedAddress.state,
          postalCode: selectedAddress.postalCode,
          country: selectedAddress.country || "Canada",
        },
      },
    };
    if (isValid(cart.cartItems)) {
      dispatch(createOrder(data));
    } else {
      setOpenSnakbar(true);
    }
  };

  const toFormValues = (addr) => ({
    streetAddress: addr.streetAddress || "",
    city: addr.city || "",
    state: addr.state || "",
    pincode: addr.postalCode || "",
  });

  const allAddresses = auth.user?.addresses || [];

  return (
    <Fragment>
      {cart.cartItems.length > 0 ? (
        <main className="lg:flex justify-between">
          <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
            {cart.cartItems.map((item, i) => (
              <CartItemCard key={i} item={item} />
            ))}

            <Divider />
            <div className="billDetails px-5 text-sm">
              <p className="font-extralight py-5">Bill Details</p>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-400">
                  <p>Item Total</p>
                  <p>${cartTotal(cart.cartItems)}</p>
                </div>
                <div className="flex justify-between text-gray-400">
                  <p>Deliver Fee</p>
                  <p>$21</p>
                </div>
                <div className="flex justify-between text-gray-400">
                  <p>Platform Fee</p>
                  <p>$5</p>
                </div>
                <div className="flex justify-between text-gray-400">
                  <p>GST and Restaurant Charges</p>
                  <p>$33</p>
                </div>
                <Divider />
                <div className="flex justify-between text-gray-400">
                  <p>Total Pay</p>
                  <p>${cartTotal(cart.cartItems) + 33}</p>
                </div>
              </div>
            </div>
          </section>

          <Divider orientation="vertical" flexItem />

          <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
            <div className="w-full max-w-2xl">
              <h1 className="text-center font-semibold text-2xl py-10">
                Choose Delivery Address
              </h1>

              <div className="space-y-3">
                {allAddresses.map((item, index) => (
                  <AddressCard
                    key={item.id || index}
                    item={item}
                    selectable
                    selected={selectedAddress?.id === item.id}
                    onSelect={() => setSelectedAddress(item)}
                    onEdit={() => setEditTarget(item)}
                    onRemove={() => handleRemoveAddress(item)}
                  />
                ))}

                <Card
                  className="flex items-center gap-4 p-4 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setOpenAddressModal(true)}
                >
                  <AddLocationAltIcon sx={{ color: "gray" }} />
                  <span className="text-gray-400">Add New Address</span>
                </Card>
              </div>

              {selectedAddress && (
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={handlePay}
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ px: 6, py: 1.5, fontSize: "1rem" }}
                  >
                    Pay ${cartTotal(cart.cartItems) + 33}
                  </Button>
                </div>
              )}
            </div>
          </section>
        </main>
      ) : (
        <div className="flex h-[90vh] justify-center items-center">
          <div className="text-center space-y-5">
            <RemoveShoppingCartIcon sx={{ width: "10rem", height: "10rem" }} />
            <p className="font-bold text-3xl">Your Cart Is Empty</p>
          </div>
        </div>
      )}

      {/* Add Address Dialog */}
      <Dialog open={openAddressModal} onClose={() => setOpenAddressModal(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          Add New Address
          <IconButton onClick={() => setOpenAddressModal(false)} size="small"><CloseIcon fontSize="small" /></IconButton>
        </DialogTitle>
        <Formik initialValues={blankValues} validationSchema={validationSchema} onSubmit={handleSaveAddress}>
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
              <Button onClick={() => setOpenAddressModal(false)} color="inherit">Cancel</Button>
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
          <Formik initialValues={toFormValues(editTarget)} validationSchema={validationSchema} onSubmit={handleEditAddress}>
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

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnakbar(false)}
        message="Please add items from only one restaurant at a time"
      />
    </Fragment>
  );
};

export default Cart;
