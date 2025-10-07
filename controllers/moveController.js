const bcrypt = require("bcryptjs");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

async function getMove(req, res) {
  const Move = await prisma.move.findFirst({
    where: {
      id: Number(req.params.id),
    },
  });

  return res.json({ Move });
}

async function getMoves(req, res) {
  const moves = await prisma.move.findMany();

  return res.json(moves);
}

async function createMove(req, res, next) {
  try {
    let move = {};
    const x = Number(req.body.position_x);
    const y = Number(req.body.position_y);
    const characterId = Number(req.body.characterId);
    const gameplayId = Number(req.body.gameplayId);

    const characters = await prisma.character.findMany({
      select: {
        id: true,
        position_x: true,
        position_y: true,
      },
    });

    const matchCharacter = characters.filter(
      (character) =>
        character.id === characterId &&
        character.position_x === x &&
        character.position_y === y
    );

    move = {
      position_x: x,
      position_y: y,
      characterId: characterId,
      gameplayId: gameplayId,
    };

    if (matchCharacter.length > 0) {
      move.marker = true;
    } else {
      move.marker = false;
    }

    const Move = await prisma.move.create({
      data: move,
    });

    return res.json(Move);
  } catch (err) {
    next(err);
  }
}

// async function updateMove(req, res, next) {
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

// async function deleteMove(req, res, next) {
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
  getMove,
  getMoves,
  createMove,
  // updateMove,
  // deleteMove,
};
