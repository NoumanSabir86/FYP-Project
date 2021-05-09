export const Hero = (props) => {
  return (
    <div
      className="sm:w-full "
      style={{
        backgroundColor: "#F0F1F1",
        height: "40vh",
        padding: "8%",
        verticalAlign: "middle",
        textAlign: "center",
      }}
    >
      <h2
        className="heading1 colorheading "
        style={{
          textTransform: "Capitalize",
          fontSize: "50px",
          fontFamily: "open sans",
        }}
      >
        {props.name}
      </h2>
    </div>
  );
};
