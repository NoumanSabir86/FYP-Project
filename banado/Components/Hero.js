export const Hero = (props) => {
  return (
    <div
      className="sm:w-full text-center "
      style={{
        backgroundColor: "#F0F1F1",

        padding: "8%",
        verticalAlign: "middle",
        textAlign: "center",
      }}
    >
      <h2
        className="mytitle colorheading "
        style={{
          textTransform: "Capitalize",

          fontFamily: "open sans",
        }}
      >
        {props.name}
      </h2>
    </div>
  );
};
