import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPromotions } from '../../../State/Admin/Promotion/promotion.action';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const CustomerEvents = () => {
  const dispatch = useDispatch();
  const { promotion } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getAllPromotions());
  }, []);

  if (!promotion.promotions || promotion.promotions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <LocalOfferIcon sx={{ fontSize: 48, mb: 2, opacity: 0.4 }} />
        <p className="text-lg font-medium">No promotions available right now</p>
        <p className="text-sm mt-1">Check back later for deals!</p>
      </div>
    );
  }

  return (
    <div className="px-5 py-6">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Current Promotions</h1>
      <div className="space-y-4">
        {promotion.promotions.map((promo) => (
          <div key={promo.id} className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h2 className="font-semibold text-gray-900 text-base">{promo.name}</h2>
                <p className="text-sm text-gray-500 mt-0.5">{promo.restaurant?.name}</p>
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-pink-50 text-[#e91e63]">
                <LocalOfferIcon sx={{ fontSize: '0.75rem' }} />
                Active
              </span>
            </div>

            {(promo.startDate || promo.endDate) && (
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                <CalendarTodayIcon sx={{ fontSize: '0.85rem' }} />
                <span>{promo.startDate} – {promo.endDate}</span>
              </div>
            )}

            <div className="space-y-2">
              {promo.items?.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-t border-gray-50">
                  <div className="flex items-center gap-3">
                    {item.food?.images?.[0] && (
                      <img src={item.food.images[0]} alt={item.food.name}
                        className="w-10 h-10 rounded-lg object-cover" />
                    )}
                    <span className="text-sm text-gray-700">{item.food?.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-[#e91e63]">{item.discountPercent}% OFF</span>
                    {item.food?.price && (
                      <p className="text-xs text-gray-400 line-through">
                        ${item.food.price.toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerEvents;
