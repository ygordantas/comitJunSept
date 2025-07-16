import { useRef, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";

type DialogProps = {
  open: boolean;
};

export default function Dialog({
  children,
  open,
}: PropsWithChildren<DialogProps>) {
  const dialogRef = useRef(null);

  if (open) {
    dialogRef.current?.showModal();
  } else {
    dialogRef.current?.close();
  }

  return createPortal(
    <dialog ref={dialogRef}>{children}</dialog>,
    document.getElementById("dialog")!
  );
}
