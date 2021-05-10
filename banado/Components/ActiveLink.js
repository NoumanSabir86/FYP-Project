import { useRouter } from "next/router";

function ActiveLink({ children, href }) {
  const router = useRouter();
  const style = {
    marginRight: 10,
    color: router.asPath === href ? "#FF5E16" : "black",
    borderBottom: router.asPath === href ? "5px solid #FF5E16" : "0",
    paddingBottom: "15px",
  };

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      style={style}
      className="uppercase item font-medium tracking-wide  transition-colors duration-200 "
    >
      {children}
    </a>
  );
}

export default ActiveLink;
