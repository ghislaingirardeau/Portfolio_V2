export function drawGhosts(ctx, ghosts, tileSize) {
  ghosts.forEach((ghost) => {
    ctx.strokeStyle = ghost.color;
    ctx.fillStyle = ghost.color;
    ctx.beginPath();
    ctx.moveTo(
      ghost.x * tileSize + tileSize / 12, // start x point
      ghost.y * tileSize + (tileSize - tileSize / 6), // start y point
    );
    ctx.quadraticCurveTo(
      ghost.x * tileSize + tileSize / 2, // control x point (entre -8 et 8 donc au milieu)
      ghost.y * tileSize - tileSize / 1.3, // control y point (ajoute un point 25px au dessus)
      ghost.x * tileSize + (tileSize - tileSize / 11), // end x point
      ghost.y * tileSize + (tileSize - tileSize / 10), // end y point
    );
    ctx.moveTo(
      ghost.x * tileSize + (tileSize - tileSize / 8), // end x point
      ghost.y * tileSize + (tileSize - tileSize / 10), // end y point
    );
    ctx.quadraticCurveTo(
      ghost.x * tileSize + tileSize / 3, // end x point
      ghost.y * tileSize + tileSize / 1.6, // end y point
      ghost.x * tileSize + tileSize / 10, // start x point
      ghost.y * tileSize + (tileSize - tileSize / 6), // start y point
    );
    ctx.fill();

    ctx.beginPath();
    ctx.arc(
      ghost.x * tileSize + tileSize / 2.8, // start x point
      ghost.y * tileSize + tileSize / 2.5, // position de l'oeil
      tileSize / 20,
      0,
      2 * Math.PI,
      false,
    );
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(
      ghost.x * tileSize + tileSize / 1.7, // start x point
      ghost.y * tileSize + tileSize / 2.5, // position de l'oeil
      tileSize / 20,
      0,
      2 * Math.PI,
      false,
    );
    ctx.fillStyle = 'black';
    ctx.fill();
  });
}
