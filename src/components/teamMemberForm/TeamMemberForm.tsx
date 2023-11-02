import { object, string } from "yup";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { useTeam } from "../../providers/TeamProvider";
import { Team } from "../../providers/Team";
import styles from "./teamMemberForm.module.css";
import styled from "styled-components";

const roles = ["Admin", "Member", "Lead"];

const FormikForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: start;
`;

const FormikLabel = styled.label`
  padding-right: 0.5rem;
`;

const Button = styled.button`
  outline: none;
  padding: 0.5rem;
  background-color: #dadada;
  border: 0.1rem solid #808080;
  border-radius: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #adadad;
  }
`;

export interface NewMember {
  name: string;
  role: string;
}

const TeamMemberForm = () => {
  const team = useTeam();
  const initValue = {
    name: "",
    role: "Admin",
  };

  const validationSchema = object().shape({
    name: string()
      .min(2, "Min length of 2 is required")
      .required("Name is required"),
    role: string().required("Role is required"),
  });

  const teamLength = team.teamList?.length;

  const onSubmit = (values: NewMember) => {
    const newTeamMember: Team = {
      ...values,
      id:
        ((team.teamList as Team[])[(teamLength as number) - 1] as Team).id + 1,
    };
    const newTeam: Team[] = [...(team.teamList as Team[]), newTeamMember];
    team.setTeamList(newTeam);
    localStorage.setItem("teams", JSON.stringify(newTeam));
  };

  return (
    <Formik
      initialValues={initValue}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <FormikForm>
          <div>
            <FormikLabel htmlFor="name">name</FormikLabel>
            <Field
              type="text"
              id="name"
              name="name"
              className={styles["text-input"]}
            />
            <ErrorMessage
              name="name"
              component="div"
              className={styles["error-message"]}
            />
          </div>
          <div>
            <FormikLabel htmlFor="role">Category</FormikLabel>
            <Field
              as="select"
              id="role"
              name="role"
              className={styles["text-input"]}
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="role"
              component="div"
              className={styles["error-message"]}
            />
          </div>
          <Button type="submit">Add new member</Button>
        </FormikForm>
      </Form>
    </Formik>
  );
};

export default TeamMemberForm;
