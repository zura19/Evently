import "../globals.css";

export const metadata = {
  title: "Evently",
  description: "Authentication in Evently",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
