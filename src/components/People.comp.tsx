import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPeople, useAppSelector } from "../hooks";
import { addPeople, Person } from "../store/people";

interface Props {}

const People = (props: Props) => {
  const dispatch = useDispatch();
  const [person, setPerson] = useState<Person>({
    name: "",
    fileNo: "",
    civilID: "",
  });

  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const { fileNo, civilID } = person;
    if (fileNo.length != 5 || civilID.length != 12) {
      return alert("error");
    }
    dispatch(addPeople(person));
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setPerson({
      ...person,
      [name]: value,
    });
  };

  const people = selectPeople();

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="civil_id">Civil ID</label>
        <input name="civilID" onChange={handleInputChange} id="civil_id" type="text" />
        <label htmlFor="name">Name</label>
        <input name="name" onChange={handleInputChange} id="name" type="text" />
        <label htmlFor="File_no">File No</label>
        <input name="fileNo" onChange={handleInputChange} id="file_no" type="text" />
        <button type="submit">Add</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Civil ID</th>
            <th>File NO</th>
          </tr>
        </thead>
        <tbody>
          {people.map(({ civilID, fileNo, name, id }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{civilID}</td>
              <td>{fileNo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default People;
