/**
 * Style maze
 * 0 mur extérieur, en bleu foncé
 * 1 ce sont les points
 * 2 case vide une fois que les points sont mangé
 * 3 mur intérieur, en bleu clair
 * 4 les supers points
 * 5 position initial de pacman
 */
export function drawMaze(ctx, tileSize, cols, rows, maze) {
  // le contanier sera un rectangle noir
  // width cols * tileSize et height rows * tileSize
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, cols * tileSize, rows * tileSize)
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // pour chaque rectangle de maze
      // si 0 c'est la bordure
      if (maze[row][col] === 0) {
        ctx.strokeStyle = '#42e6f5'
        ctx.beginPath()
        // ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
        ctx.roundRect(col * tileSize, row * tileSize, tileSize, tileSize, [5])
        ctx.stroke()
      } else if (maze[row][col] === 1) {
        // Si 1, c'est un petit point centré
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(
          col * tileSize + tileSize / 2,
          row * tileSize + tileSize / 2,
          tileSize / 13,
          0,
          Math.PI * 2,
        )
        ctx.fill()
      } else if (maze[row][col] === 4) {
        // Si 1, c'est un petit point centré
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.arc(
          col * tileSize + tileSize / 2,
          row * tileSize + tileSize / 2,
          tileSize / 5,
          0,
          Math.PI * 2,
        )
        ctx.fill()
      } else if (maze[row][col] === 3) {
        // c'est un mur
        // ctx.fillStyle = '#42e6f5';
        ctx.strokeStyle = '#42e6f5'
        ctx.beginPath()
        // ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
        ctx.roundRect(col * tileSize, row * tileSize, tileSize, tileSize, [5])
        ctx.stroke()
      }
    }
  }
}
