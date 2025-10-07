const bcrypt = require("bcryptjs");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

async function getGameplay(req, res) {
  const gameplay = await prisma.gameplay.findFirst({
    where: {
      id: Number(req.params.id),
    },
  });

  return res.json(gameplay);
}

async function getGameplays(req, res) {
  const gameplays = await prisma.gameplay.findMany();

  return res.json(gameplays);
}

async function createGameplay(req, res, next) {
  try {
    // const characters = await prisma.character.findMany();

    // let gameplay = [];

    // characters.forEach((character) => {
    //   const gameplayRow = {
    //     userId: Number(req.body.userId),
    //     characterId: Number(character.id),
    //     result: false,
    //   };
    //   gameplay.push(gameplayRow);
    // });

    // console.log(gameplay);
    // return;
    const Gameplay = await prisma.gameplay.create({
      data: { userId: Number(req.body.userId) },
    });

    return res.json(Gameplay);
  } catch (err) {
    next(err);
  }
}

// async function updateCharacter(req, res, next) {
//   try {
//     req.params.id = parseInt(req.params.id);

//     let user = {};
//     for (const [key, value] of Object.entries(req.body)) {
//       if (key === "password") {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         user.password = hashedPassword;
//       } else if (value === "") {
//         continue;
//       } else {
//         user[key] = value;
//       }
//     }

//     await prisma.user.update({
//       where: {
//         id: req.params.id,
//       },
//       data: user,
//     });

//     return res.json({ user });
//   } catch (err) {
//     next(err);
//   }
// }

// async function deleteCharacter(req, res, next) {
//   const id = Number(req.params.id);

//   const user = await prisma.user.update({
//     where: {
//       id: id,
//       AND: {
//         isActive: true,
//       },
//     },
//     data: {
//       isActive: false,
//     },
//   });

//   return res.json({
//     user,
//   });
// }

module.exports = {
  getGameplay,
  getGameplays,
  createGameplay,
  // updateCharacter,
  // deleteCharacter,
};
