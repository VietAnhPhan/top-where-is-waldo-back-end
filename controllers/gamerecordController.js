const bcrypt = require("bcryptjs");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

async function getGamerecord(req, res) {
  const Gamerecord = await prisma.gamerecord.findFirst({
    where: {
      id: Number(req.params.id),
    },
  });

  return res.json(Gamerecord);
}

async function getGamerecords(req, res) {
  const gamerecords = await prisma.gamerecord.findMany();

  return res.json(gamerecords);
}

async function createGamerecord(req, res, next) {
  try {
    const characters = await prisma.character.findMany();

    let gamerecordRows = [];

    characters.forEach((character) => {
      const gamerecordRow = {
        gameplayId: Number(req.body.gameplayId),
        characterId: Number(character.id),
      };
      gamerecordRows.push(gamerecordRow);
    });

    const Gamerecord = await prisma.gamerecord.createManyAndReturn({
      data: gamerecordRows,
    });

    return res.json(Gamerecord);
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
  getGamerecord,
  getGamerecords,
  createGamerecord,
  // updateCharacter,
  // deleteCharacter,
};
