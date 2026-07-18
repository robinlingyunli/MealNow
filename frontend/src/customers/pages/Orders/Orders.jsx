import React, { useEffect } from 'react'
import OrderCard from '../../components/Order/OrderCard'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersOrders, deleteOrderAction } from '../../../State/Customers/Orders/Action'
import { Button, Chip } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

const Orders = () => {
  const { order, auth } = useSelector((store) => store)
  const dispatch = useDispatch()
  const jwt = localStorage.getItem("jwt")

  useEffect(() => {
    dispatch(getUsersOrders(auth.jwt || jwt))
  }, [auth.jwt])

  const handleDelete = (orderId) => {
    dispatch(deleteOrderAction(orderId, auth.jwt || jwt))
  }

  return (
    <div className="flex items-center flex-col px-4 pb-10">
      <h1 className="text-xl text-center py-7 font-semibold">My Orders</h1>
      <div className="space-y-6 w-full lg:w-2/3">
        {order.orders.map((o) => (
          <div key={o.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <Chip
                label={o.orderStatus}
                size="small"
                sx={{
                  backgroundColor: o.orderStatus === 'DELIVERED' ? '#dcfce7' : '#fef9c3',
                  color: o.orderStatus === 'DELIVERED' ? '#16a34a' : '#92400e',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                }}
              />
              <Button
                size="small"
                startIcon={<DeleteOutlineIcon fontSize="small" />}
                onClick={() => handleDelete(o.id)}
                sx={{
                  color: '#ef4444',
                  fontSize: '0.75rem',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#fee2e2' },
                }}
              >
                Delete
              </Button>
            </div>
            <div className="divide-y divide-gray-50">
              {o.items.map((item) => (
                <OrderCard key={item.id} order={item} />
              ))}
            </div>
            <div className="flex justify-end px-5 py-3 border-t border-gray-100">
              <span className="text-sm text-gray-500 mr-2">Order Total</span>
              <span className="font-semibold text-gray-900">
                ${o.totalAmount?.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
        {order.orders.length === 0 && (
          <p className="text-center text-gray-400 py-10">No orders yet.</p>
        )}
      </div>
    </div>
  )
}

export default Orders
