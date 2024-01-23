import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import IndexPage from "../pages/IndexPage";

test("renders learn react link", () => {
  render(<App page={<IndexPage />} />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
