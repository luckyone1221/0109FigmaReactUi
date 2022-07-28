import React from "react";
import {CheсkMark} from "./icons";


export const Alert = ({alert}) =>
  <div className={`sMain__alert sMain__alert--${alert.theme}`}>
    <div className="row gx-3 align-items-center">
      <div className="col-auto sMain__alert-icon">
        <CheсkMark/>
      </div>
      <div className="col">
        {alert.message}
      </div>
    </div>
  </div>
;