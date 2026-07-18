import { Button, Card, CardContent, CardHeader } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateRestaurantStatus } from "../../State/Customers/Restaurant/restaurant.action";

const Row = ({ label, value }) => (
  <div className="flex">
    <p className="w-48 text-gray-500 font-medium">{label}</p>
    <p className="text-gray-800"><span className="pr-5">-</span>{value}</p>
  </div>
);

const Details = () => {
  const dispatch = useDispatch();
  const { auth, restaurant } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const r = restaurant.usersRestaurant;

  const handleRestaurantStatus = () => {
    dispatch(updateRestaurantStatus({ restaurantId: r?.id, jwt: auth.jwt || jwt }));
  };

  return (
    <div className="lg:px-20 px-5 py-8 space-y-6">
      <div className="flex justify-center items-center gap-5">
        <h1 className="text-2xl lg:text-5xl text-center font-bold">{r?.name}</h1>
        <Button
          onClick={handleRestaurantStatus}
          variant="contained"
          color={r?.open ? "error" : "success"}
          size="large"
        >
          {r?.open ? "Close" : "Open"}
        </Button>
      </div>

      {/* Restaurant Info */}
      <Card>
        <CardHeader title="Restaurant" />
        <CardContent>
          <div className="space-y-3">
            <Row label="Owner" value={r?.owner?.fullName} />
            <Row label="Restaurant Name" value={r?.name} />
            <Row label="Cuisine Type" value={r?.cuisineType} />
            <Row label="Opening Hours" value={r?.openingHours} />
            <div className="flex">
              <p className="w-48 text-gray-500 font-medium">Status</p>
              <div>
                <span className="pr-5">-</span>
                {r?.open
                  ? <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 font-medium text-sm">Open</span>
                  : <span className="px-4 py-1 rounded-full bg-red-100 text-red-600 font-medium text-sm">Closed</span>
                }
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="lg:flex gap-6">
        {/* Address */}
        <Card className="flex-1">
          <CardHeader title="Address" />
          <CardContent>
            <div className="space-y-3">
              <Row label="Street Address" value={r?.address?.streetAddress} />
              <Row label="City" value={r?.address?.city} />
              <Row label="Postal Code" value={r?.address?.postalCode} />
              <Row label="Country" value={r?.address?.country} />
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="flex-1 mt-6 lg:mt-0">
          <CardHeader title="Contact" />
          <CardContent>
            <div className="space-y-3">
              <Row label="Email" value={r?.contactInformation?.email} />
              <Row label="Mobile" value={r?.contactInformation?.mobile} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Details;
