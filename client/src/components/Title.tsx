import type { ReactNode } from "react";

const Title = ({ element }: { element: ReactNode }) => (
  <div className="text-2xl font-bold text-primary">{element}</div>
);

export default Title;
