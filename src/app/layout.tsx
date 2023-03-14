export const metadata = {
  title: "memos.pub",
  description: "Markdown blogging without sign up",
};

interface Props {
  children: React.ReactNode;
}

const RootLayout = ({ children }: Props): JSX.Element => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
