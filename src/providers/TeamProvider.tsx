/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { Team } from "./Team";

const TeamContext = createContext<TeamInfo | null>(null);

interface TeamInfo {
  teamList: Team[] | null;
  setTeamList: React.Dispatch<React.SetStateAction<Team[] | null>>;
}

export const useTeam = () => {
  const context = useContext<TeamInfo | null>(TeamContext);
  if (!context) {
    throw new Error("useTeam must be used within a LanguageProvider");
  }
  return context;
};

export const TeamProvider = ({ children }: { children: React.ReactNode }) => {
  const [teamList, setTeamList] = useState<Team[] | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("teams")) {
      localStorage.setItem(
        "teams",
        JSON.stringify([
          {
            id: 1,
            name: "Timothy",
            role: "Admin",
          },
          {
            id: 2,
            name: "Tom",
            role: "Admin",
          },
          {
            id: 3,
            name: "Timothy",
            role: "Admin",
          },
        ])
      );
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("teams")) {
      setTeamList(JSON.parse(localStorage.getItem("teams") as string));
    }
  }, []);

  return (
    <TeamContext.Provider value={{ teamList, setTeamList }}>
      {children}
    </TeamContext.Provider>
  );
};
