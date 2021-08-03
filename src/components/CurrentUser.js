import React from "react";
import { firebaseSignOut } from "services/firebase";

import moment from "moment";
import FirestoreService from "services/FirebaseService";

const CurrentUser = ({ displayName, photoURL, email, createdAt, children }) => {
  const handleClick = () => {
    firebaseSignOut(()=>{
      localStorage.clear();
      window.indexedDB
        .databases()
        .then(r => {
          for (var i = 0; i < r.length; i++)
            window.indexedDB.deleteDatabase(r[i].name);
        })
        .then(() => {
          console.log('clear indexedDB - success');
        });
        window.location.reload(true);
    })
  };
  return (
    <section className="CurrentUser">
      'aaaa'
      <div className="CurrentUser--profile">
        {photoURL && <img src={photoURL} alt={displayName} />}
        <div className="CurrentUser--information">
          <h2>{displayName}</h2>
          <p className="email">{email}</p>
          <p className="created-at">{moment(createdAt).calendar()}</p>
        </div>
      </div>
      <div>
        <div>{children}</div>
        <button onClick={handleClick}>Sign Out</button>
      </div>
    </section>
  );
};

CurrentUser.defaultProps = {
  displayName: "Bill Murray",
  email: "billmurray@mailinator.com",
  photoURL: "https://www.fillmurray.com/300/300",
  createdAt: new Date(),
};

export default CurrentUser;
