import { FC } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./style.css";

interface ResizableProps {
  direction?: "horizontal" | "vertical";
  children: any;
}

const Resizable: FC<ResizableProps> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  if (direction === "horizontal") {
    resizableProps = {
      width: window.innerWidth * 0.75,
      height: Infinity,
      minConstraints: [window.innerWidth * 0.2, Infinity],
      maxConstraints: [window.innerWidth * 0.75, Infinity],
      resizeHandles: ["e"],
    };
  } else {
    resizableProps = {
      width: Infinity,
      height: 300,
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      resizeHandles: ["s"],
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
