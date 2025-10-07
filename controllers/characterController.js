const bcrypt = require("bcryptjs");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

async function getCharacter(req, res) {
  const user = await prisma.user.findFirst({
    where: {
      id: Number(req.params.id),
    },
  });

  return res.json({ user });
}

async function getCharacters(req, res) {
  const characters = await prisma.character.findMany({
    where: {
      isActive: true,
    },
  });

  return res.json(characters);
}

async function createCharacter(req, res, next) {
  try {
    const character = {
      name: req.body.name,
      position_x: Number(req.body.position_x),
      position_y: Number(req.body.position_y),
    };

    const Character = await prisma.character.create({
      data: character,
    });

    return res.json(Character);
  } catch (err) {
    next(err);
  }
}

async function updateCharacter(req, res, next) {
  try {
    req.params.id = parseInt(req.params.id);

    let user = {};
    for (const [key, value] of Object.entries(req.body)) {
      if (key === "password") {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;
      } else if (value === "") {
        continue;
      } else {
        user[key] = value;
      }
    }

    await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: user,
    });

    return res.json({ user });
  } catch (err) {
    next(err);
  }
}

async function deleteCharacter(req, res, next) {
  const id = Number(req.params.id);

  const user = await prisma.user.update({
    where: {
      id: id,
      AND: {
        isActive: true,
      },
    },
    data: {
      isActive: false,
    },
  });

  return res.json({
    user,
  });
}

module.exports = {
  getCharacter,
  getCharacters,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
