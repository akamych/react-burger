import React from "react";
import AppHeader from "../layout/header/Header";

type propsType = {
  page: JSX.Element;
};
const App = (props: propsType) => {
  const { page } = props;
  return (
    <>
      <AppHeader />
      {page}
    </>
  );
};

export default App;
