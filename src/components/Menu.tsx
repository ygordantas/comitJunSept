import type { ElementType, PropsWithChildren, ReactNode } from "react";

type MenuProps = {
  buttons: ReactNode;
  container?: ElementType;
};

export default function Menu({
  children,
  buttons,
  container = "div",
}: PropsWithChildren<MenuProps>) {
  const Container = container as ElementType;
  return (
    <Container>
      <menu>{buttons}</menu>
      <div>{children}</div>
    </Container>
  );
}
