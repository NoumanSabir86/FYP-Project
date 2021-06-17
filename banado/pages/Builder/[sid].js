import React from "react";

import { Footer } from "../../Components/Footer";
import { Navbar } from "../../Components/Navbar";
import cookie from "cookie";
import axios from "axios";
import WhatsAppWidget from "react-whatsapp-widget";
import CompanyDisqus from "../../Components/CompanyDisqus";
const SingleCompany = (props) => {
  const builder = props.record;

  const cutPhone = builder.phoneNumber.substring(1);

  const completePhone = "+92" + cutPhone;

  return (
    <>
      <Navbar />
      <div>
        <div
          className="sm:w-full "
          style={{
            background: `url(${builder.coverImage}) no-repeat`,
            height: "50vh",

            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="flex flex-row px-32 gap-8 border-b">
          <div>
            <div className="flex -mt-20">
              <div
                style={{
                  border: "1px solid #B8B8B8",
                  backgroundColor: "white",
                  height: "150px",
                  background: `white url(${builder.logo})`,
                  backgroundSize: "contain",
                  width: "150px",
                  backgroundPosition: "center center",
                  backgroundRepeat: "no-repeat",
                  borderRadius: "999px",
                }}
              ></div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex flex-col">
              <div>
                <span className="mytext" style={{ fontSize: "21px" }}>
                  Company Name
                </span>
                : <span className="mytext text-xs"> {builder.companyName}</span>
              </div>
              <div>
                <span className="mytext" style={{ fontSize: "21px" }}>
                  Business Entity
                </span>
                :{" "}
                <span className="mytext text-xs">
                  {" "}
                  {builder.businessEntity}
                </span>
              </div>
              <div>
                <span className="mytext" style={{ fontSize: "21px" }}>
                  Location
                </span>
                : <span className="mytext text-xs"> {builder.location}</span>
              </div>
            </div>
          </div>

          <div className="p-4 ml-40">
            <div className="flex flex-col">
              <div>
                <span className="mytext" style={{ fontSize: "21px" }}>
                  Established In:
                </span>
                :{" "}
                <span className="mytext text-xs"> {builder.establishedIn}</span>
              </div>
              <div>
                <span className="mytext" style={{ fontSize: "21px" }}>
                  No. of Employees
                </span>
                :{" "}
                <span className="mytext text-xs"> {builder.noOfEmployees}</span>
              </div>
              <div>
                <span className="mytext" style={{ fontSize: "21px" }}>
                  Phone Number
                </span>
                :{" "}
                <a
                  href={`tel:${builder.phoneNumber}`}
                  className="mytext text-xs"
                >
                  {" "}
                  {builder.phoneNumber}
                </a>
              </div>
            </div>
          </div>

          <div className="p-4 ml-12 ">
            <button
              onClick={() => {
                builder.portfolio
                  ? (window.location.href = builder.portfolio)
                  : alert("This company has not yet uploaded their portfolio");
              }}
              className="bg-red-500 transform shadow-2xl transition-all hover:scale-110 rounded colortheme text-white px-4 py-2 mt-4 "
            >
              View Portfolio
            </button>
          </div>
        </div>
        {/* Header Completed */}

        <div className="flex flex-col px-32 mt-20">
          <div>
            <h1
              className="heading2 pb-2"
              style={{
                textTransform: "Capitalize",
                fontSize: "30px",
                fontFamily: "open sans",
                borderBottom: "5px solid orange",
                width: "250px",
              }}
            >
              About Company
            </h1>
          </div>
          <div className="mt-4">
            <p className="mytext">{builder.aboutCompany}</p>
          </div>
        </div>

        <div className="flex flex-col px-32 mt-20">
          <div>
            <h1
              className="heading2 pb-2"
              style={{
                textTransform: "Capitalize",
                fontSize: "30px",
                fontFamily: "open sans",
                borderBottom: "5px solid orange",
                width: "370px",
              }}
            >
              Question and Answers
            </h1>
          </div>
          <div className="mt-4 pb-10">
            <CompanyDisqus post={builder} />
          </div>
        </div>
      </div>
      <WhatsAppWidget phoneNumber={completePhone} />
      <Footer />
    </>
  );
};

export const getServerSideProps = async (context) => {
  try {
    const parsedCookies = cookie.parse(context.req.headers.cookie);
    const data1 = await axios.get(
      "http://localhost:3001/api/users/builderAdditionalDetails/" +
        parsedCookies.sid
    );

    return { props: { record: data1.data } };
  } catch (error) {
    return { props: { mango: context.req.headers.cookie } };
  }
};

export default SingleCompany;
