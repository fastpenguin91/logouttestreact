import React, { useState } from "react";

const AuthContext = React.createContext([{}, () => {}]);

const AuthProvider = (props) => {
  const user = props.userData ? props.userData.me : "";
  const [currentUser, setCurrentUser] = useState({
    currentUser: user,
  });

  return (
    <AuthContext.Provider value={[currentUser, setCurrentUser]}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
