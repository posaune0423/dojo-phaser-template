import { type BurnerAccount, useBurnerManager } from "@dojoengine/create-burner";
import { type ReactNode, createContext, useContext, useMemo } from "react";
import { Account } from "starknet";
import { type SetupResult } from "@/libs/dojo/setup";
import { useAccount } from "@starknet-react/core";

interface DojoContextType extends SetupResult {
  masterAccount: Account;
  account: BurnerAccount;
  connectedAccount: Account | undefined;
}

export const DojoContext = createContext<DojoContextType | null>(null);

export const DojoProvider = ({ children, value }: { children: ReactNode; value: SetupResult }) => {
  const currentValue = useContext(DojoContext);
  if (currentValue) throw new Error("DojoProvider can only be used once");

  const {
    config: { masterAddress, masterPrivateKey },
    burnerManager,
    dojoProvider,
  } = value;

  const masterAccount = useMemo(
    () => new Account(dojoProvider.provider, masterAddress, masterPrivateKey, "1"),
    [masterAddress, masterPrivateKey, dojoProvider.provider]
  );

  const { account: connectedAccount } = useAccount();

  const {
    create,
    list,
    get,
    select,
    deselect,
    remove,
    clear,
    account,
    isDeploying,
    count,
    copyToClipboard,
    applyFromClipboard,
    checkIsDeployed,
  } = useBurnerManager({
    burnerManager,
  });

  return (
    <DojoContext.Provider
      value={{
        ...value,
        masterAccount,
        account: {
          create,
          list,
          get,
          select,
          deselect,
          remove,
          clear,
          account: account ? account : masterAccount,
          isDeploying,
          count,
          copyToClipboard,
          applyFromClipboard,
          checkIsDeployed,
        },
        connectedAccount: connectedAccount as Account,
      }}
    >
      {children}
    </DojoContext.Provider>
  );
};
