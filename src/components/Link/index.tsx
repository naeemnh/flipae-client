import { IPosition } from "@/types";

interface EmployeeLinkProps {
  from: IPosition
  to: IPosition
}

export default function EmployeeLink({from, to}: EmployeeLinkProps) {
  return (
    <svg style={{ position: 'absolute', top: 0, left: 0 }}>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke="black"
      />
    </svg>
  );
};