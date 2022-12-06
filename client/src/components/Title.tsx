interface TitleProps {
  children: NonNullable<React.ReactNode>;
}

const Title: React.FunctionComponent<TitleProps> = ({ children }) => (
  <div className="text-2xl font-bold text-primary">{children}</div>
);

export default Title;
