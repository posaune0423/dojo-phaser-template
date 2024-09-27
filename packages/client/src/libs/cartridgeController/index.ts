import { Connector } from "@starknet-react/core";
import CartridgeConnector from "@cartridge/connector";
import { getContractByName } from "@dojoengine/core";
import { ControllerOptions } from "@cartridge/controller";
import { manifest } from "../../../dojoConfig";
import { shortString } from "starknet";

const contract = getContractByName(manifest, "dojo_phaser", "actions");
if (!contract?.address) {
  throw new Error("dojo_phaser actions contract not found");
}
const action_contract_address = contract?.address;

const ETH_TOKEN_ADDRESS = "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7";

const policies = [
  {
    target: ETH_TOKEN_ADDRESS,
    method: "approve",
  },
  {
    target: action_contract_address,
    method: "move",
    description: "Move",
  },
];

const options: ControllerOptions = {
  rpc: import.meta.env.VITE_PUBLIC_RPC_URL,
  indexerUrl: import.meta.env.VITE_PUBLIC_TORII_URL,
  policies,
  paymaster: {
    caller: shortString.encodeShortString("ANY_CALLER"),
  },
  // theme: "dope-wars",
  // colorMode: "light"
};

const cartridgeConnector = new CartridgeConnector(options) as never as Connector;

export default cartridgeConnector;
