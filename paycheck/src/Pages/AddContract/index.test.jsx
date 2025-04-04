import React from "react";
import { render, screen } from "@testing-library/react";
import AddContractPage from "./index";

test("renders AddContractPage component", () => {
    render(<AddContractPage />);
    const titleElement = screen.getByText(/Cadastrar Contrato/i);
    expect(titleElement).toBeInTheDocument();
});