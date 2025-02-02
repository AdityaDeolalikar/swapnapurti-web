import React from "react";
import { redirect } from "next/navigation";

const page = () => {
  const userRole = "admin"; // Example: dynamically get this from auth

  // Redirect to the correct role's dashboard
  switch (userRole) {
    case "admin":
      redirect("/dashboard/admin");
    case "managing-director":
      redirect("/dashboard/managing-director");
    case "accountant":
      redirect("/dashboard/accountant");
    case "event-manager":
      redirect("/dashboard/event-manager");
    case "promoting-manager":
      redirect("/dashboard/promoting-manager");
    default:
      redirect("/"); // Redirect to homepage if unauthorized
  }
  return <div>Dashboard</div>;
};

export default page;
