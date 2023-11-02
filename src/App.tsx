import styled from "styled-components";
import "./App.css";
import TeamList from "./components/TeamList";
import TeamMemberForm from "./components/teamMemberForm/TeamMemberForm";

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 96rem;
  align-items: start;
  gap: 2rem;
  padding: 2rem 4rem;
`;

function App() {
  return (
    <MainDiv>
      <TeamList />
      <TeamMemberForm />
    </MainDiv>
  );
}

export default App;
