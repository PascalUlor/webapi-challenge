import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import CharCard from "./components/CharCard";
import CharForm from "./components/CharForm";

const baseUrl = `http://localhost:8000/api/projects/`;

function App() {
  const [chars, setChars] = useState([]);
  const [currentCharId, setCurrentCharId] = useState(null);
  const [newChar, setNewChar] = useState({
    name: "",
    description: ""
  });

  const handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setNewChar(newChar => ({ ...newChar, [name]: value }));
  };

  const FetchChars = () => {
    axios
      .get(`${baseUrl}`)
      .then(res => {
        console.log(res.data.data);
        setChars(res.data.data);
      })
      .catch(err => {
        return err.statusText;
      });
  };

  const GetCharsById = async id => {
    await axios
      .get(`${baseUrl}/${id}`)
      .then(res => {
        console.log(res.data.data);
        setCurrentCharId(res.data.data.id);
        const charEdit = chars.find(char => char.id === res.data.data.id);
        if (charEdit) {
          setNewChar({
            name: charEdit.name,
            description: charEdit.description
          });
        }
      })
      .catch(err => {
        return err.statusText;
      });
  };

  const addChar = event => {
    event.preventDefault();
    let CharDeet = {
      name: newChar.name,
      description: newChar.description
    };
    axios
      .post(`${baseUrl}`, CharDeet)
      .then(res => {})
      .catch(err => console.log(err));
    setNewChar({
      name: "",
      description: ""
    });
    FetchChars();
  };

  const UpdateChar = () => {
    axios
      .put(`${baseUrl}/${currentCharId}`, newChar)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
    FetchChars();
  };
  const DeleteUser = id => {
    axios
      .delete(`${baseUrl}/${id}`)
      .then(res => {
        console.log("-----Working", res.data);
        FetchChars();
      })
      .catch(err => {
        console.log("---------", err);
      });
  };

  useEffect(FetchChars, []);

  return (
    <>
      <Header> Lord Of The Rings</Header>
      <Main>
        <CharCard
          chars={chars}
          DeleteUser={DeleteUser}
          GetCharsById={GetCharsById}
        />
        <CharForm
          chars={chars}
          UpdateChar={UpdateChar}
          addChar={addChar}
          handleInputChange={handleInputChange}
          newChar={newChar}
          IsEdit={currentCharId}
        />
      </Main>
    </>
  );
}

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to top, rgba(80, 68, 18, 0.6) 10%, transparent),
    url(https://i.pinimg.com/originals/1c/e7/e3/1ce7e363167f52d3dcf0c801f862b9c1.jpg)
      center/cover no-repeat border-box,
    skyblue;
  width: 100vw;
  min-height: 100vh;
  position: relative;
  text-align: center;
`;

const Header = styled.h1`
  @import url("https://fonts.googleapis.com/css?family=Petrona&display=swap");
  font-family: "Petrona", serif;
  text-align: center;
  margin: 0 auto;
  font-size: 2rem;
`;

export default App;
