import React from "react";
import ApplicationList from "../../components/Application/ApplicationList";
import ClientNavbar from "../../components/Navigate/ClientNavbar/ClientNavbar";

export default function Applications() {
  return (
    <div>
      <ClientNavbar />
      <ApplicationList />
    </div>
  );
}
