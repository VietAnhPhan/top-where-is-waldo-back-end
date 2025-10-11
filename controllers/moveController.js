const bcrypt = require("bcryptjs");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");
const checkRightMove = require("../config/helpers");

async function getMove(req, res) {
  const Move = await prisma.move.findFirst({
    where: {
      id: Number(req.params.id),
    },
  });

  return res.json({ Move });
}

async function getMoves(req, res) {
  const queryString = req.query;
  let moves = [];

  if (
    queryString.gameplayId &&
    queryString.userId &&
    queryString.gameplayId !== "" &&
    queryString.userId !== ""
  ) {
    moves = await prisma.move.findMany({
      where: {
        gameplayId: Number(queryString.gameplayId),
        AND: {
          isActive: true,
          AND: {
            GamePlay: {
              userId: Number(queryString.userId),
            },
          },
        },
      },
      include: {
        GamePlay: {
          select: {
            userId: true,
          },
        },
      },
    });
  } else moves = await prisma.move.findMany();

  return res.json(moves);
}

async function createMove(req, res, next) {
  try {
    const finishedGameplay = await prisma.gameplay.findFirst({
      where: {
        id: Number(req.body.gameplayId),
        AND: {
          isFinished: true,
        },
      },
    });

    if (finishedGameplay && finishedGameplay.isFinished) {
      return res.json(null);
    }

    let move = {
      position_x: Number(req.body.position_x),
      position_y: Number(req.body.position_y),
      characterId: Number(req.body.characterId),
      gameplayId: Number(req.body.gameplayId),
    };

    const range = Number(req.body.range) / 2;

    const characters = await prisma.character.findMany({
      select: {
        id: true,
        position_x: true,
        position_y: true,
      },
    });

    const matchedCharacter = checkRightMove(move, characters, range);

    if (matchedCharacter) {
      const gamerecord = await prisma.gamerecord.findFirst({
        select: {
          id: true,
        },
        where: {
          gameplayId: move.gameplayId,
          AND: {
            characterId: move.characterId,
          },
        },
      });

      const UpdatedGamerecord = await prisma.gamerecord.update({
        where: {
          id: gamerecord.id,
          AND: {
            gameplayId: move.gameplayId,
            AND: {
              characterId: move.characterId,
            },
          },
        },
        data: {
          result: true,
        },
      });

      move.marker = true;
    } else {
      move.marker = false;
    }

    const Move = await prisma.move.create({
      data: move,
    });

    const remainCharacters = await prisma.gamerecord.findMany({
      where: {
        gameplayId: move.gameplayId,
        AND: {
          result: false,
        },
      },
    });

    if (remainCharacters.length == 0) {
      try {
        await prisma.gameplay.update({
          where: {
            id: move.gameplayId,
          },
          data: {
            status: "finished",
            finished_at: new Date(),
            isFinished: true,
          },
        });
      } catch (err) {
        next(err);
      }
    }

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
