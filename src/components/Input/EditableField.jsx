// EditableField.js
import React, { useState } from 'react';

const EditableField = ({ label, value, onChange, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleEdit = () => {
    setIsEditing(true);
    onEdit(); // Call onEdit function when Edit button is clicked
  };

  const handleSave = () => {
    setIsEditing(false);
    onChange(editedValue);
  };

  const handleChange = (e) => {
    setEditedValue(e.target.value);
  };

  return (
    <div className="">
      {isEditing ? (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={editedValue}
            onChange={handleChange}
            className="border rounded px-2 py-1 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 focus:outline-none"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex items-center pt-2 space-x-2">
          <span className="text-white font-normal pr-2 ">{value}</span>
          <button
            onClick={handleEdit}
            className="bg-slate-700 text-white active:bg-slate-600 font-bold  text-sm px-3 py-1  rounded-2xl shadow hover:shadow-lg outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:underline focus:outline-none"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default EditableField;
