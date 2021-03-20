import React from "react";
import styles from "./InfoCard.module.css";
const InfoCard = (props) => {
  return (
    <>
      <div class="w-80 flex justify-center items-center">
        <div class="w-full p-4">
          <div
            class={
              styles.effect +
              " card flex flex-col justify-center pt-2 pb-2 pl-4 bg-white rounded-lg "
            }
          >
            <div class="prod-title">
              <p class={styles.title}>{props.title}</p>
              <p class={styles.num}>{props.num}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoCard;
