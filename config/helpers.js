function isRightMove(move, characters, range) {
  const result = characters.filter((character) => {
    move.position_x > character.position_x + range &&
      move.position_x < character.position_x + range &&
      move.position_y > character.position_y + range &&
      move.position_y < character.position_y + range &&
      move.characterId == character.id;
  });

  if (result.length > 0) {
    return true;
  } else return false;
}
