import React, { useEffect, useRef, useState } from "react";
import styles from "./Structure.module.scss";
import groupMock from "../../../assets/ContainerGroupMock.svg";

type Props = {
  isMobile?: boolean;
};

const Structure: React.FC<Props> = ({ isMobile }) => {
  return (
    <div className={styles.container}>
      <h2
        className={styles.title}
        style={{
          color: "#5784BA",
          fontSize: isMobile ? "1.65rem" : undefined,
        }}
      >
        Structure Your Light Show
      </h2>
      <div className={styles.structureBox}>
        <div className={styles.textBox}>
          <h3
            className={styles.titleMock}
            style={{
              color: "#5784BA",
              fontSize: isMobile ? "1.4rem" : undefined,
            }}
          >
            Groups
          </h3>
          <div
            className={styles.subtitle}
            style={{
              color: "#5784BA",
              fontSize: isMobile ? "1.05rem" : undefined,
            }}
          >
            <span>
              Organize your lights into sets like drums, guitars, or vocals for
              easier control and scene changes.
            </span>
          </div>
        </div>
        <div className={styles.imgMock}>
          <img
            src={groupMock}
            alt="Group mock"
            className={styles.mockSvg}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Structure;