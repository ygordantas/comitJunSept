import { useEffect, useRef, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";

type DialogProps = {
  open: boolean;
};

export default function Dialog({
  children,
  open,
}: PropsWithChildren<DialogProps>) {
  const dialogRef = useRef(null);

  useEffect(() => {
    // syncing the component with some native browser api
    // console.log("useEffect called");
    if (open) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }

    return () => {
      // console.log("Cleanup function called");
      // this one will get executed before useEffect is called again
    };
  }, [open]); // dependencies that causes component to re-render (states, props, setState function)

  return createPortal(
    <dialog ref={dialogRef}>{open && children}</dialog>,
    document.getElementById("dialog")!
  );
}
