import React from "react";

const EditableRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
  return (
    <>
      <td>
        <input
          type="text"
          required
          placeholder="Zadej jméno"
          name="first_name"
          onChange={handleEditFormChange}
          value={editFormData.first_name}
        />
      </td>
      <td>
        <input
          type="text"
          required
          placeholder="Zadej přijmení"
          name="last_name"
          onChange={handleEditFormChange}
          value={editFormData.last_name}
        />
      </td>
      <td>
        <input
          type="date"
          required
          placeholder="Zadej datum"
          name="date"
          onChange={handleEditFormChange}
          value={editFormData.date}
        />
      </td>
      <td>
        <button type="submit" className="btn save">
          Uložit
        </button>
        <button type="submit" onClick={() => handleCancelClick()} className="btn cancel">
          Zrušit
        </button>
      </td>
    </>
  );
};

export default EditableRow;
