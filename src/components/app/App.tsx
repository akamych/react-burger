import { useEffect } from "react";
import AppHeader from "../layout/header/Header";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../services/Store";
import { fetchIngredientsAction } from "../../services/actions/IngredientsActions";
import Modal from "../modal/Modal";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchIngredientsAction());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      <Outlet />
      <Modal />
    </>
  );
};

export default App;
