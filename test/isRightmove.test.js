const checkRightMove = require("../config/helpers");

test("check move of the user", () => {
  const characters = [
    {
      id: 1,
      name: "Captain Calamity Carl",
      position_x: 902,
      position_y: 92,
      isActive: true,
      created_at: "2025-10-06T04:10:44.516Z",
    },
    {
      id: 2,
      name: "Penelope The Parasol Plume",
      position_x: 465,
      position_y: 445,
      isActive: true,
      created_at: "2025-10-06T04:15:41.219Z",
    },
    {
      id: 3,
      name: "Buster The Brute Barnett",
      position_x: 295,
      position_y: 517,
      isActive: true,
      created_at: "2025-10-06T04:18:44.695Z",
    },
    {
      id: 4,
      name: "Sailor Sarah Sunbeam",
      position_x: 316,
      position_y: 157,
      isActive: true,
      created_at: "2025-10-06T04:19:51.347Z",
    },
    {
      id: 5,
      name: "Jasper The Juggler Jenkins",
      position_x: 430,
      position_y: 436,
      isActive: true,
      created_at: "2025-10-06T04:22:00.994Z",
    },
  ];
  const move = {
    position_x: 1000,
    position_y: 100,
    characterId: 1,
  };

  const range = 50;

  expect(checkRightMove(move, characters, range)).toEqual(null);
});
