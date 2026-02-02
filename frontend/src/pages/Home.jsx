import { useState } from "react";
import ProjectForm from "../components/ProjectForm";
import ProjectOutput from "../components/ProjectOutput";

const Home = () => {
  const [output, setOutput] = useState("");

  return (
    <>
      <ProjectForm setOutput={setOutput} />
      <ProjectOutput output={output} />
    </>
  );
};

export default Home;
