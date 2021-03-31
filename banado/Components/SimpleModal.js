import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  return {
    top: "40%",
    left: "45%",
    transform: `translate(-25%, -25%)`,
    borderBottom: "5px solid #FF5E16",
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    outline: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const SimpleModal = (props) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className="items-center justify-center content-center text-center">
        <h2 className="heading4">{props.title}</h2>
        <p className="mytext">{props.text}</p>

        <button
          onClick={() => {
            handleClose;
            window.location.href = props.address;
          }}
          className="hoverBtn rounded colortheme focus:outline-none text-white px-10 py-2 mt-4 mb-4 "
        >
          Ok!
        </button>
        <SimpleModal />
      </div>
    </div>
  );

  return (
    <>
      <div className="outline-none">
        <Modal
          open={props.open == true && open == true ? true : false}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          className="focus:outline-none"
        >
          {body}
        </Modal>
      </div>
    </>
  );
};

export default SimpleModal;
