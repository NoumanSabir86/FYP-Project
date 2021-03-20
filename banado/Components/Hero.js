export const Hero = (props) => {
  return (
    <div
      className="sm:w-full "
      style={{ backgroundColor: "#F0F1F1", height: "50vh" }}
    >
      <h2
        className="heading1 colorheading "
        style={{
          paddingTop: "10%",
          paddingLeft: "5%",
          textTransform: "uppercase",
        }}
      >
        {props.name}
      </h2>
    </div>
  );
};
