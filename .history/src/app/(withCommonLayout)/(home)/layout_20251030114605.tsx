import { ReactNode } from "react";

const Layout = ({
  children,
  events,
  categories,
  reviews,
}: {
  children: ReactNode;
  events: ReactNode;
  categories: ReactNode;
  researchs: ReactNode;
  reviews: ReactNode;
}) => {
  return (
    <>
      {children}
      {events}
      {categories}
      {reviews}
    </>
  );
};

export default Layout;
