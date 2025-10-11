const bcrypt = require("bcryptjs");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

const jwt = require("jsonwebtoken");

async function getUser(req, res) {
  const user = await prisma.user.findFirst({
    where: {
      id: Number(req.params.id),
    },
  });

  return res.json({ user });
}

async function getAllUser(req, res) {
  const queryString = req.query;
  let users = [];

  if (
    queryString.gameplay &&
    queryString.gameplayfinished &&
    queryString.gameplay == "true" &&
    queryString.gameplayfinished == "true"
  ) {
    users = await prisma.gameplay.findMany({
      where: {
        isFinished: true,
        AND: {
          finished_at: {
            not: null,
          },
        },
      },
      include: {
        User: true,
      },
    });
  } else
    users = await prisma.user.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

  return res.json(users);
}

async function createUser(req, res, next) {
  try {
    const User = await prisma.user.create({});

    return res.json(User);
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const name = req.body.name;

    let user = {
      id,
      name,
    };

    const User = await prisma.user.update({
      where: {
        id: id,
      },
      data: user,
    });

    return res.json(User);
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
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
  getUser,
  getAllUser,
  createUser,
  updateUser,
  deleteUser,
};
