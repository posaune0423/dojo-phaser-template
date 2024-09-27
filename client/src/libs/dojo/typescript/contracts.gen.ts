
// Generated by dojo-bindgen on Fri, 27 Sep 2024 04:02:05 +0000. Do not modify this file manually.
// Import the necessary types from the recs SDK
// generate again with `sozo build --typescript` 
import { Account, byteArray } from "starknet";
import { DojoProvider } from "@dojoengine/core";
import * as models from "./models.gen";

export type IWorld = Awaited<ReturnType<typeof setupWorld>>;

export async function setupWorld(provider: DojoProvider) {
    // System definitions for `dojo_phaser-actions` contract
    function actions() {
        const contract_name = "actions";

        
        // Call the `spawn` system with the specified Account and calldata
        const spawn = async (props: { account: Account }) => {
            try {
                return await provider.execute(
                    props.account,
                    {
                        contractName: contract_name,
                        entrypoint: "spawn",
                        calldata: [],
                    },
                    "dojo_phaser"
                );
            } catch (error) {
                console.error("Error executing spawn:", error);
                throw error;
            }
        };
            

    
        // Call the `move` system with the specified Account and calldata
        const move = async (props: { account: Account, direction: models.Direction }) => {
            try {
                return await provider.execute(
                    props.account,
                    {
                        contractName: contract_name,
                        entrypoint: "move",
                        calldata: [["None", "Left", "Right", "Up", "Down"].indexOf(props.direction.type)],
                    },
                    "dojo_phaser"
                );
            } catch (error) {
                console.error("Error executing move:", error);
                throw error;
            }
        };
            

    
        // Call the `world` system with the specified Account and calldata
        const world = async (props: { account: Account }) => {
            try {
                return await provider.execute(
                    props.account,
                    {
                        contractName: contract_name,
                        entrypoint: "world",
                        calldata: [],
                    },
                    "dojo_phaser"
                );
            } catch (error) {
                console.error("Error executing world:", error);
                throw error;
            }
        };
            

        return {
            spawn, move, world
        };
    }

    return {
        actions: actions()
    };
}
