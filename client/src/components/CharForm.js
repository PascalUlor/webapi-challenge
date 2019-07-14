import React, { useContext } from "react";
import styled from "styled-components";
import ProjectContext from "../App";

const CharForm = props => {
  const value = useContext(ProjectContext);
  // const { UpdateChar, addChar, handleInputChange, newChar, IsEdit } = props;
  const Method = value.IsEdit ? value.UpdateChar : value.addChar;
  return (
    <Cover>
      <Form onSubmit={Method}>
        <input
          type="text"
          placeholder="Enter Name"
          value={value.newChar.name}
          onChange={value.handleInputChange}
          name="name"
        />
        <textarea
          type="text"
          placeholder="Enter description"
          value={value.newChar.description}
          onChange={value.handleInputChange}
          name="description"
        />
        <button>Submit</button>
      </Form>
    </Cover>
  );
};

const Cover = styled.div`
  background-color: skyblue;
  margin: 0 2rem;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 10rem;
  padding: 2rem;
  input {
    height: 2rem;
    width: 10rem;
    border: 1px solid skyblue;
  }
  textarea {
    border: 1px solid skyblue;
    height: 3rem;
    width: 15rem;
  }
  button {
    background-color: #41422e;
    color: #fff;
    border-radius: 8px;
    width: 5rem;
    height: 2rem;
  }
`;

export default CharForm;
