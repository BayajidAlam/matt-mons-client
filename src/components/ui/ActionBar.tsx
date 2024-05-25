import { Grid } from "antd";

type ActionBarProps = {
  title?: string;
  inline?: boolean;
  children?: React.ReactElement | React.ReactNode;
};

const ActionBar = ({ title, children, inline }: ActionBarProps) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  return (
    <div
      className={screens.xs ? undefined : "flex justify-between items-center"}
    >
      <h1 className="text-xl md:text-2xl font-semibold">{title}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "10px 0px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default ActionBar;
