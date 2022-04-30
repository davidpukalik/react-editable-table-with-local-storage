import React from "react";

const ReadOnlyRow = ({ first_name, last_name, date, id, handleEditClick, handleDeleteClick }) => {
  return (
    <>
      <td>{first_name}</td>
      <td>{last_name}</td>
      <td>{date}</td>
      <td>
        <button
          type="button"
          onClick={(e) => handleEditClick(e, id, first_name, last_name, date, id)}
          className="btn edit"
        >
          Upravit
        </button>
        <button type="button" onClick={() => handleDeleteClick(id)} className="btn delete">
          Smazat
        </button>
      </td>
    </>
  );
};

export default ReadOnlyRow;
