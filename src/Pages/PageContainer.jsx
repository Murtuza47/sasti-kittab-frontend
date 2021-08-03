import React from "react";
import { Container } from "react-bootstrap";
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";

export const PageContainer = ({ children }) => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  );
};
