import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faGithub,
  faBlogger,
} from "@fortawesome/free-brands-svg-icons";

const rttrue = () => {
  return true;
};

const FollowMe = () => {
  return (
    <div className="followMe">
      <div className="FollowTitle">Project Members</div>
      <div className="team1">
        <div className="social" onClick={rttrue}>
          <a
            className="fab fa-2x "
            href="https://github.com/afashs"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            className="fab fa-2x "
            href="mailto:dev.afashs@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGoogle} />
          </a>
          <a
            className="fab fa-2x "
            href="https://velog.io/@afashs"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faBlogger} />
          </a>

          <div className="btn-team">
            <a>서정욱</a>
          </div>
        </div>
      </div>
      <div className="team2">
        <div className="social" onClick={rttrue}>
          <a className="fab fa-2x " href="#">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a className="fab fa-2x " href="#">
            <FontAwesomeIcon icon={faGoogle} />
          </a>
          <a className="fab fa-2x " href="#">
            <FontAwesomeIcon icon={faBlogger} />
          </a>

          <div className="btn-team">
            <a>이상원</a>
          </div>
        </div>
      </div>
      <div className="team3">
        <div className="social" onClick={rttrue}>
          <a
            className="fab fa-2x "
            href="https://github.com/nain93"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            className="fab fa-2x "
            href="mailto:rnrb555@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGoogle} />
          </a>
          <a
            className="fab fa-2x "
            href="https://velog.io/@nain93"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faBlogger} />
          </a>

          <div className="btn-team">
            <a>구남규</a>
          </div>
        </div>
      </div>
      <div className="team4">
        <div className="social" onClick={rttrue}>
          <a className="fab fa-2x " href="#">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a className="fab fa-2x " href="#">
            <FontAwesomeIcon icon={faGoogle} />
          </a>
          <a className="fab fa-2x " href="#">
            <FontAwesomeIcon icon={faBlogger} />
          </a>

          <div className="btn-team">
            <a>김노아</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowMe;
