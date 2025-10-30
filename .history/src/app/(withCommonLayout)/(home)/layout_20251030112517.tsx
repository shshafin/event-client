import { ReactNode } from "react";

const Layout = ({
  children,
  events,
  galleries,
  researchs,
  reviews,
}: {
  children: ReactNode;
  colleges: ReactNode;
  galleries: ReactNode;
  researchs: ReactNode;
  reviews: ReactNode;
}) => {
  return (
    <>
      {children}
      {colleges}
      {galleries}
      {researchs}
      {reviews}
    </>
  );
};

export default Layout;
