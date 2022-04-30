import React, { useState } from "react";
import "./styles/css/style.css";
import EditableRow from "./components/EditableRow";
import ReadOnlyRow from "./components/ReadOnlyRow";
import dummyData from "./dummy_data.json";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [data, setData] = useLocalStorage("people", dummyData);
  const [personID, setPersonID] = useState(null);
  const [search, setSearch] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [sortType, setSortType] = useState("");

  const [editFormData, setEditFormData] = useState({
    first_name: "",
    last_name: "",
    date: null,
  });

  const handleEditClick = (e, id, first_name, last_name, date) => {
    e.preventDefault();
    setPersonID(id);

    const formValues = {
      first_name: first_name,
      last_name: last_name,
      date: date,
    };

    setEditFormData(formValues);
  };

  const handleEditFormChange = (e) => {
    e.preventDefault();

    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleCancelClick = () => {
    setPersonID(null);
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();

    const editedPerson = {
      id: personID,
      first_name: editFormData.first_name,
      last_name: editFormData.last_name,
      date: editFormData.date,
    };

    const newPeople = [...data];

    const index = data.findIndex((person) => person.id === personID);

    newPeople[index] = editedPerson;

    setData(newPeople);
    setPersonID(null);
  };

  const handleDeleteClick = (personID) => {
    const newPeople = data.filter((person) => person.id !== personID);
    setData(newPeople);
  };

  const toggleSort = (e) => {
    if (e.target.getAttribute("sortname") === "name") {
      setIsSorted(!isSorted);
      setSortType("name");
    } else if (e.target.getAttribute("sortname") === "surname") {
      setIsSorted(!isSorted);
      setSortType("surname");
    } else if (e.target.getAttribute("sortname") === "date") {
      setIsSorted(!isSorted);
      setSortType("date");
    }
  };

  return (
    <>
      <h1 className="title">React - Upravovací tabulka s local storage</h1>
      <div className="menu">
        <div className="search">
          <label htmlFor="searchTerm">Hledej: </label>
          <input
            type="text"
            placeholder="jméno/příjmeni/datum"
            id="searchTerm"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* <button className="btn update" onClick={() => getData()}> */}
        <button className="btn update" onClick={() => setData(dummyData)}>
          Update/Refresh Dat
        </button>
      </div>
      <p className="tip">tip: kliknutím na nadpis z tabulky vyfiltruješ</p>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th onClick={(e) => toggleSort(e)} sortname="name">
                Jméno
              </th>
              <th onClick={(e) => toggleSort(e)} sortname="surname">
                Příjmeni
              </th>
              <th onClick={(e) => toggleSort(e)} sortname="date">
                Datum
              </th>
              <th className="edit-column">Úprava</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((person) => {
                if (search === "") {
                  return person;
                } else if (person.first_name.toLowerCase().includes(search.toLowerCase())) {
                  return person;
                } else if (person.last_name.toLowerCase().includes(search.toLowerCase())) {
                  return person;
                } else if (person.date.includes(search)) {
                  return person;
                }
              })
              .sort((a, b) => {
                if (isSorted && sortType === "name") {
                  if (a.first_name < b.first_name) {
                    return -1;
                  } else if (a.first_name > b.first_name) {
                    return 1;
                  }
                } else if (isSorted && sortType === "surname") {
                  if (a.last_name < b.last_name) {
                    return -1;
                  } else if (a.last_name > b.last_name) {
                    return 1;
                  }
                } else if (isSorted && sortType === "date") {
                  if (a.date < b.date) {
                    return -1;
                  } else if (a.date > b.date) {
                    return 1;
                  }
                } else if (!isSorted && sortType === "name") {
                  if (a.first_name > b.first_name) {
                    return -1;
                  } else if (a.first_name < b.first_name) {
                    return 1;
                  }
                } else if (!isSorted && sortType === "surname") {
                  if (a.last_name > b.last_name) {
                    return -1;
                  } else if (a.last_name < b.last_name) {
                    return 1;
                  }
                } else if (!isSorted && sortType === "date") {
                  if (a.date > b.date) {
                    return -1;
                  } else if (a.date < b.date) {
                    return 1;
                  }
                } else {
                  return 0;
                }
              })
              .map((person) => {
                return (
                  <tr key={person.id}>
                    <>
                      {personID === person.id ? (
                        <EditableRow
                          editFormData={editFormData}
                          handleEditFormChange={handleEditFormChange}
                          handleCancelClick={handleCancelClick}
                        />
                      ) : (
                        <ReadOnlyRow
                          {...person}
                          handleEditClick={handleEditClick}
                          handleDeleteClick={handleDeleteClick}
                        />
                      )}
                    </>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </form>
    </>
  );
}
export default App;
