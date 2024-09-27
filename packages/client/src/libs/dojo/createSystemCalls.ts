import { Account } from "starknet";
import { ClientComponents } from "./createClientComponents";
import { Direction } from "./typescript/models.gen";
import type { IWorld } from "./typescript/contracts.gen";
import { defineSystem, Has, World } from "@dojoengine/recs";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls({ client }: { client: IWorld }, clientComponents: ClientComponents, world: World) {
  const spawn = async (account: Account) => {
    try {
      await client.actions.spawn({
        account,
      });

      // Wait for the indexer to update the entity
      // By doing this we keep the optimistic UI in sync with the actual state
      await new Promise<void>((resolve) => {
        defineSystem(world, [Has(clientComponents.Position)], () => {
          resolve();
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  const move = async (account: Account, direction: Direction) => {
    try {
      await client.actions.move({
        account,
        direction,
      });

      await new Promise<void>((resolve) => {
        defineSystem(world, [Has(clientComponents.Position)], () => {
          resolve();
        });
      });
    } catch (e) {
      console.log(e);
    }
  };

  return {
    spawn,
    move,
  };
}
