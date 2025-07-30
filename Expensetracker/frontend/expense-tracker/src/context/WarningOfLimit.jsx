
import { createContext, useState } from "react";

export const WarningOfLimit = createContext();

export const WarningProvider = ({ children }) => {
  const [warning, setWarning] = useState("");

  return (
    <WarningOfLimit.Provider value={[warning, setWarning]}>
      {children}
    </WarningOfLimit.Provider>
  );
};