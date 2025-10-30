import { ReactNode } from "react";

const Layout = ({
  children,
  events,
  galleries,
  researchs,
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
      {galleries}
      {researchs}
      {reviews}
    </>
  );
};

export default Layout;
