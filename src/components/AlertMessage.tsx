import { useEffect } from "react";

export default function AlertMessage({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("interval");
      onClose();
    }, 3000);

    return () => clearInterval(timer);
  }, [onClose]);

  return (
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid fuga
      inventore, dolor neque deserunt reprehenderit quam accusantium iure totam
      perferendis aperiam maxime ut est, cupiditate consequuntur, optio
      similique rem ex!
    </p>
  );
}
