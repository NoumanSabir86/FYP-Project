import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";

import { ToastContainer, toast } from "react-nextjs-toast";
import { storage } from "./../firebase";
import ProgressBar from "@ramonak/react-progress-bar";
import { Navbar } from "../Components/Navbar";
import axios from "axios";
import UserServices from "../Services/UserServices";

const BuilderDash = () => {
  const [builderId, setbuilderId] = useState("");
  const [companyName, setcompanyName] = useState("");
  const [establishedIn, setestablishedIn] = useState("");
  const [noOfEmployees, setnoOfEmployees] = useState();
  const [location, setlocation] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [logo, setlogo] = useState("");
  const [coverImage, setcoverImage] = useState("");
  const [aboutCompany, setaboutCompany] = useState("");
  const [businessEntity, setBusinessEntity] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [done, setDone] = useState(false);

  const [progress1, setProgress1] = useState(0);
  const [progress2, setProgress2] = useState(0);
  const [progress3, setProgress3] = useState(0);

  const [action, setAction] = useState("");

  const [URL1, setURL1] = useState("");
  const [URL2, setURL2] = useState("");

  const dispatch = useDispatch();
  React.useEffect(async () => {
    setbuilderId(UserServices.getLoggedinfo()._id);

    await axios
      .get(
        `http://localhost:3001/api/users/builderAdditionalDetails/${
          UserServices.getLoggedinfo()._id
        }`
      )
      .then((res) => {
        if (res.data != false) {
          setcompanyName(res.data.companyName);
          setestablishedIn(res.data.establishedIn);
          setnoOfEmployees(res.data.noOfEmployees);
          setlocation(res.data.location);
          setphoneNumber(res.data.phoneNumber);
          setlogo(res.data.logo);
          setcoverImage(res.data.coverImage);
          setaboutCompany(res.data.aboutCompany);
          setBusinessEntity(res.data.businessEntity);
          setPortfolio(res.data.portfolio);
          setAction("Update");
          setDone(true);
        } else {
          setAction("Add");
        }
      });
  }, []);

  const notify = (error, type) => {
    toast.notify(error, {
      duration: 5,
      type: type,
      title: type,
    });
  };
  const saveDetails = async () => {
    await axios
      .post(
        "http://localhost:3001/api/users/builderAdditionalDetails/" + builderId,
        {
          builderId,
          companyName,
          establishedIn,
          noOfEmployees,
          location,
          phoneNumber,
          logo,
          coverImage,
          aboutCompany,
          businessEntity,
          portfolio,
        }
      )
      .then((res) => {
        notify("Hurrrreee! Your Profile is now Live", "success");
        setTimeout(() => {
          window.location.href = "/BuilderDash";
        }, 2000);
      })
      .catch((err) => {
        notify(err.response.data, "error");
      });
  };

  const updateDetails = async () => {
    if (URL1 == "") {
      setlogo(logo);
    } else {
      setlogo(URL1);
    }

    if (URL2 == "") {
      setcoverImage(coverImage);
    } else {
      setcoverImage(URL2);
    }

    await axios
      .put(
        "http://localhost:3001/api/users/builderAdditionalDetails/" + builderId,
        {
          builderId,
          companyName,
          establishedIn,
          noOfEmployees,
          location,
          phoneNumber,
          logo,
          coverImage,
          aboutCompany,
          businessEntity,
          portfolio,
        }
      )
      .then((res) => {
        notify("Updated Successfully!", "success");
        setTimeout(() => {
          window.location.href = "/BuilderDash";
        }, 2000);
      })
      .catch((err) => {
        notify(err.response.data, "error");
      });
  };

  React.useEffect(() => {}, []);

  const uploadImage1 = () => {
    let uploadTask = storage.ref(`logo/${logo.name}`).put(logo);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress1(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("logo")
          .child(logo.name)
          .getDownloadURL()
          .then((url) => {
            setlogo(url);
            setURL1(url);
            console.log(url);
          });
      }
    );
  };

  const uploadImage2 = () => {
    let uploadTask = storage
      .ref(`coverImage/${coverImage.name}`)
      .put(coverImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress2(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("coverImage")
          .child(coverImage.name)
          .getDownloadURL()
          .then((url) => {
            setcoverImage(url);
            setURL2(url);
            console.log(url);
          });
      }
    );
  };

  const uploadPortfolio = () => {
    let uploadTask = storage.ref(`portfolio/${portfolio.name}`).put(portfolio);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress3(progress);
        progress == 100 ? setDone(true) : setDone(false);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("portfolio")
          .child(portfolio.name)
          .getDownloadURL()
          .then((url) => {
            setPortfolio(url);
          });
      }
    );
  };

  return (
    <div>
      <Navbar />
      <ToastContainer align={"center"} position={"bottom"} />

      <div>
        <p className="heading4 ml-20 mt-14 text-bold uppercase">My Profile</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 ml-20 mr-20 p-5 pb-10 mb-10  rounded-lg shadow-lg mt-2 bg-white border">
        <div>
          <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
            Company Name
          </label>

          <input
            type="text"
            value={companyName}
            class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Company Name"
            onChange={(e) => setcompanyName(e.target.value)}
          />
          <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
            Established In
          </label>
          <input
            value={establishedIn}
            type="text"
            class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Establish Date"
            onChange={(e) => setestablishedIn(e.target.value)}
          />

          <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
            Business Entity
          </label>
          <input
            type="text"
            value={businessEntity}
            class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Business Entity"
            onChange={(e) => setBusinessEntity(e.target.value)}
          />
          <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
            No Of Employees
          </label>
          <input
            type="text"
            value={noOfEmployees}
            class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="No Of Employees"
            onChange={(e) => setnoOfEmployees(e.target.value)}
          />
          <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
            Phone Number
          </label>
          <input
            value={phoneNumber}
            type="text"
            class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="Phone Number"
            onChange={(e) => setphoneNumber(e.target.value)}
          />
          <label class="text-gray-700 " style={{ fontSize: "1.2rem" }}>
            location
          </label>
          <input
            value={location}
            type="text"
            class=" rounded-lg mb-4  border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="CITY"
            onChange={(e) => setlocation(e.target.value)}
          />
        </div>
        <div>
          <label class="text-gray-700" style={{ fontSize: "1.2rem" }}>
            Add logo
          </label>
          <ProgressBar
            completed={progress1}
            bgColor="#00235A"
            height="10px"
            borderRadius="10px"
            isLabelVisible={false}
          />
          <input
            type="file"
            className="hoverBtn rounded  pr-4 py-2 mt-4 mb-4 "
            onChange={(e) => {
              setlogo(e.target.files[0]);
            }}
          ></input>{" "}
          <button
            className="hoverBtn rounded colortheme text-white px-10 py-2 mt-4 mb-4 "
            onClick={() => {
              uploadImage1();
            }}
          >
            Upload Image
          </button>
          <img
            src={logo == "" ? "http://via.placeholder.com/150" : logo}
            class="w-40 rounded mb-4"
            alt="Thumbnail"
          ></img>
          <label class="text-gray-700" style={{ fontSize: "1.2rem" }}>
            Add Cover image
          </label>
          <ProgressBar
            completed={progress2}
            bgColor="#00235A"
            height="10px"
            borderRadius="10px"
            isLabelVisible={false}
          />
          <input
            type="file"
            className="hoverBtn rounded  pr-4 py-2 mt-4 mb-4 "
            onChange={(e) => {
              setcoverImage(e.target.files[0]);
            }}
          ></input>{" "}
          <button
            className="hoverBtn rounded colortheme text-white px-10 py-2 mt-4 mb-4 "
            onClick={() => {
              uploadImage2();
            }}
          >
            Upload Image
          </button>
          <img
            src={
              coverImage == "" ? "http://via.placeholder.com/150" : coverImage
            }
            class="w-40 rounded"
            alt="Thumbnail"
          ></img>
        </div>

        <div className="col-span-full">
          <label class="text-gray-700" style={{ fontSize: "1.2rem" }}>
            About Company
          </label>
          <textarea
            value={aboutCompany}
            class="col-span-full appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="A brief intro..."
            name="comment"
            rows="4"
            cols="40"
            onChange={(e) => setaboutCompany(e.target.value)}
          ></textarea>
        </div>
        <div className="flex flex-col">
          <div className="w-full">
            <label class="text-gray-700" style={{ fontSize: "1.2rem" }}>
              Add your portfolio(PDF) to <b>capture more clients</b>
            </label>
            <p>{done == true ? "Portolio Added!" : ""}</p>
            <ProgressBar
              completed={progress3}
              bgColor="#00235A"
              height="10px"
              borderRadius="10px"
              isLabelVisible={false}
            />
            <input
              type="file"
              className="hoverBtn rounded  pr-4 py-2 mt-4 mb-4 "
              onChange={(e) => {
                setPortfolio(e.target.files[0]);
              }}
            ></input>{" "}
            <button
              className="hoverBtn rounded colortheme text-white px-10 py-2 mt-4 mb-4 "
              onClick={() => {
                uploadPortfolio();
              }}
            >
              Upload Portfolio
            </button>
          </div>

          <div>
            <button
              onClick={() => {
                action == "Add" ? saveDetails() : updateDetails();
              }}
              className="hoverBtn rounded colortheme text-white px-10 py-2 mt-4 mb-4 "
            >
              {action == "Add" ? "Submit" : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderDash;
