import React from "react";
const AccountContext = React.createContext();

const AccountProvider = AccountContext.Provider;

const AccountConsumer = AccountContext.Consumer;

export { AccountProvider, AccountConsumer };
