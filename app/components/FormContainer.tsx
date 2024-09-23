// components/FormContainer.tsx
import React from "react";
import FormGithub from "./FormGitHub";
import GitHubTitleAnimated from "./GitHubTitleAnimated";
import { CommitsData } from "../apiService/fetchCommits";
import "../styles/form-container.css";

interface FormContainerProps {
  onDataFetch: (data: CommitsData) => void;
  submit: boolean;
  setFadingOut: (value: boolean) => void;
  setFadingIn: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
  setIsHidden: (value: boolean) => void;
}

const FormContainer: React.FC<FormContainerProps> = ({
  onDataFetch,
  submit,
  setFadingOut,
  setFadingIn,
  setIsLoading,
  setIsHidden,
}) => {
  return (
    <header className={`${submit ? "header-grid" : "header-flex"}`}>
      <GitHubTitleAnimated />
      <div className={`${submit ? "form-header" : ""}`}>
        <FormGithub
          onDataFetch={onDataFetch}
          submit={submit}
          setFadingOut={setFadingOut}
          setFadingIn={setFadingIn}
          setIsLoading={setIsLoading}
          setIsHidden={setIsHidden}
        />
      </div>
    </header>
  );
};

export default FormContainer;
