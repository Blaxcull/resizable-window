import { useEffect } from "react";
import startDrag from "@/utils/window/drag";
import { maximize } from "@/utils/window/maximize";
import { Resize } from "@/utils/window/resize";
import { OnEdge } from "@/utils/window/onEdge";

type WindowProps = {
  /** Inner content to display */
  children?: React.ReactNode;
  /** CSS class overrides for the entire window */
  className?: string;
  /** CSS class overrides for the title bar area */
  titleBarClassName?: string;
  /** Content displayed inside the title bar */
  titleBarContent?: React.ReactNode;
};

export default function Window({
  children,
  className = "",
  titleBarClassName = "",
  titleBarContent,
}: React.PropsWithChildren<WindowProps>) {
  useEffect(() => {
    const title = document.querySelector<HTMLDivElement>("#window .titlebar");
    if (!title) return;

    const handleDouble = () => maximize();
    title.addEventListener("dblclick", handleDouble);

    return () => title.removeEventListener("dblclick", handleDouble);
  }, []);

  return (
    <div
      id="window"
      className={`box-border absolute w-96 h-96 border-2  ${className}`}
     
      onMouseMove={(e) => OnEdge(e)}
      onMouseDown={(e) => Resize(e)}
    >
      <div
        className={`h-6 bg-black titlebar ${titleBarClassName}`}
        onMouseDown={(e) => startDrag(e)}
      >
        <div>{titleBarContent}</div>
      </div>

      {children && <div className="h-full">{children}</div>}
    </div>
  );
}
