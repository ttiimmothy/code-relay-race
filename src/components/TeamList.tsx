import styled from "styled-components";
import { useTeam } from "../providers/TeamProvider";

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  color: #adadad;
  gap: 2rem;
`;

const IDDiv = styled.div`
  width: 1rem;
  text-align: start;
`;
const NameDiv = styled.div`
  width: 4rem;
  text-align: start;
`;
const Title = styled.h2`
  padding-bottom: 0.5rem;
`;

const TeamList = () => {
  const { teamList } = useTeam();

  return (
    <div>
      <Title>Team List</Title>
      {teamList &&
        teamList.map((team) => (
          <FlexDiv key={team.id}>
            <IDDiv>{team.id}</IDDiv>
            <NameDiv>{team.name}</NameDiv>
            <div>{team.role}</div>
          </FlexDiv>
        ))}
    </div>
  );
};

export default TeamList;
