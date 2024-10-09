<script lang="ts">
  import Monster from "./data/data.json";
  import { toElementColor } from "./lib/toElement";

  let selectedOption: "monster" | "quest" = "monster";
  let searchQuery: string = "";
  let filteredMonster: any = [];

  $: {
    if (selectedOption === "monster") {
      filteredMonster = Monster.filter((monster) =>
        monster.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedOption === "quest") {
      filteredMonster = Monster.filter((monster) => {
        const allQuests = [
          ...monster.quest.low,
          ...monster.quest.high,
          ...monster.quest.master,
        ];

        return allQuests.some((quest) =>
          quest.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      });
    }
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").then(
        (registration) => {
          console.log(
            "ServiceWorker registered with scope:",
            registration.scope,
          );
        },
        (error) => {
          console.log("ServiceWorker registration failed:", error);
        },
      );
    });
  }
</script>

<main class="m-auto flex h-full w-10/12 flex-col items-center gap-4 py-10">
  <div class="flex w-full gap-2">
    <select
      class="rounded-lg border-2 border-[rgba(1,1,1,0.4)] px-2"
      bind:value={selectedOption}
    >
      <option value="monster" selected>Monster</option>
      <option value="quest">Quest</option>
    </select>
    <input
      class="w-full rounded-lg border-2 border-[rgba(1,1,1,0.4)] p-4 outline-none"
      bind:value={searchQuery}
    />
  </div>

  <div class="h-full w-full overflow-auto">
    <table class="w-full">
      <thead class="bg-gray-200">
        <tr>
          <th class="sticky top-0 bg-gray-200 p-2 text-left"></th>
          <th class="sticky top-0 bg-gray-200 px-4 py-2 text-left">Name</th>
          <th class="sticky top-0 bg-gray-200 p-2 text-left">Weakness</th>
        </tr>
      </thead>

      {#each filteredMonster as monster}
        <tr>
          <td>
            <img
              class="mx-auto w-20 py-1"
              alt={monster.name}
              src={monster.image}
            />
          </td>
          <td class="px-2">
            {monster.name}
          </td>
          <td class={"font-bold " + toElementColor(monster.weakness)}>
            {monster.weakness}
          </td>
        </tr>
      {/each}
    </table>
  </div>
</main>
