import type { ReactNode } from "react";

type NonNullReactNode = NonNullable<ReactNode>;

interface TeamProps {
  src: string;
  alt: string;
  name: NonNullReactNode;
  institution?: NonNullReactNode;
}

interface TeamCollectionProps {
  title: NonNullReactNode;
  children: NonNullReactNode;
}

export type { TeamProps, TeamCollectionProps };
