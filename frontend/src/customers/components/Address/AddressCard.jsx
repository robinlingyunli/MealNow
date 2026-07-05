import { Card, Radio } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import React from "react";

const AddressCard = ({ item, selected, onSelect, selectable, onEdit, onRemove }) => {
  return (
    <Card
      className="flex items-center justify-between w-full p-4"
      onClick={selectable ? onSelect : undefined}
      sx={{
        cursor: selectable ? "pointer" : "default",
        border: selectable && selected ? "1px solid #1976d2" : "1px solid transparent",
      }}
    >
      <div className="flex items-center gap-3">
        {selectable && (
          <Radio checked={!!selected} onChange={onSelect} size="small" sx={{ p: 0 }} />
        )}
        <HomeIcon fontSize="small" sx={{ color: "gray" }} />
        <div className="space-y-1 text-gray-500">
          <h1 className="font-semibold text-white text-sm">Home</h1>
          <p className="text-sm">
            {item.streetAddress}, {item.city || item.postalCode}, {item.state}
          </p>
        </div>
      </div>

      {(onEdit || onRemove) && (
        <div className="flex items-center gap-3 text-sm shrink-0 ml-4" onClick={(e) => e.stopPropagation()}>
          {onEdit && (
            <button onClick={onEdit} className="text-blue-400 hover:text-blue-300 transition-colors">
              Edit
            </button>
          )}
          {onEdit && onRemove && <span className="text-gray-600">|</span>}
          {onRemove && (
            <button onClick={onRemove} className="text-blue-400 hover:text-blue-300 transition-colors">
              Remove
            </button>
          )}
        </div>
      )}
    </Card>
  );
};

export default AddressCard;
