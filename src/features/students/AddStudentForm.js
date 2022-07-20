import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "./studentSlice";

const AddStudentForm = (props) => {
  const { value, setValue, onSubmit } = props;
  console.log(value);

  return (
    <div>
      <form onSubmit={onSubmit} className="form-inline mt-3 mb-3">
        <label className="sr-only">First Name</label>
        <input
          type="text"
          className="form-control mb-2 mr-sm-2"
          placeholder="First Name"
          value={value.firstName}
          key="firstName"
          id="firstName"
          onChange={(e) => setValue({ ...value, firstName: e.target.value })}
          required
        />
        <input
          type="text"
          className="form-control mb-2 mr-sm-2"
          placeholder="Last Name"
          value={value.lastName}
          key="lastName"
          id="lastName"
          onChange={(e) => setValue({ ...value, lastName: e.target.value })}
          required
        />
        <input
          type="text"
          className="form-control mb-2 mr-sm-2"
          placeholder="phone"
          value={value.phone}
          key="phone"
          id="phone"
          onChange={(e) => setValue({ ...value, phone: e.target.value })}
        />{" "}
        <input
          type="text"
          className="form-control mb-2 mr-sm-2"
          placeholder="email"
          value={value.email}
          key="email"
          id="email"
          onChange={(e) => setValue({ ...value, email: e.target.value })}
        />
      </form>
    </div>
  );
};

export default AddStudentForm;
