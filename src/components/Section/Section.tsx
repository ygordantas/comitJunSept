import type { JSX } from "react";

type SectionProps = {
  title: string;
  description: string;
  children: JSX.Element | string | JSX.Element[];
};

export default function Section({
  title,
  description,
  children,
}: SectionProps) {
  //   console.log("Section component rendering");
  return (
    <section>
      <h2>{title}</h2>
      <p>{description}</p>
      {children}
    </section>
  );
}
