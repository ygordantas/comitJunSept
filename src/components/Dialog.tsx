import type { PropsWithChildren } from "react";

type DialogProps = {
  open: boolean;
};

export default function Dialog({
  children,
  open,
}: PropsWithChildren<DialogProps>) {
  return <dialog open={open}>{children}</dialog>;
}
