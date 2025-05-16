export function drawPacman(ctx, pacman, tileSize) {
  // depend on direction, need to draw a different pacman orientation
  if (pacman.dx === 1 && pacman.dy === 0) {
    // right
    return pacmanGoOnDirection(
      ctx,
      pacman,
      tileSize,
      0.25,
      1.25,
      0.75,
      1.75,
      tileSize / 10,
      tileSize / -4,
      pacman.x * tileSize + tileSize + 2,
      pacman.y * tileSize + tileSize / 2,
    )
  }
  if (pacman.dx === -1 && pacman.dy === 0) {
    // left
    return pacmanGoOnDirection(
      ctx,
      pacman,
      tileSize,
      1.25,
      2.25,
      1.75,
      2.75,
      tileSize / 10,
      tileSize / -4,
      pacman.x * tileSize + 2,
      pacman.y * tileSize + tileSize / 2,
    )
  }
  if (pacman.dx === 0 && pacman.dy === 1) {
    // down
    return pacmanGoOnDirection(
      ctx,
      pacman,
      tileSize,
      1.25,
      2.25,
      0.75,
      1.75,
      tileSize / -5,
      0,
      pacman.x * tileSize + tileSize / 2 + 2,
      pacman.y * tileSize + tileSize,
    )
  }
  if (pacman.dx === 0 && pacman.dy === -1) {
    // up
    return pacmanGoOnDirection(
      ctx,
      pacman,
      tileSize,
      0.25,
      1.25,
      1.75,
      2.75,
      tileSize / -5,
      0,
      pacman.x * tileSize + tileSize / 2 + 2,
      pacman.y * tileSize,
    )
  }

  // Position par default
  pacmanGoOnDirection(
    ctx,
    pacman,
    tileSize,
    0.25,
    1.25,
    0.75,
    1.75,
    tileSize / 10,
    tileSize / -4,
    pacman.x * tileSize + tileSize + 2,
    pacman.y * tileSize + tileSize / 2,
  )
}

/**
 * Draw a pacman depending on the direction
 * x1 and y2 is the angle fill by the first arc
 * x2 and y2 is the angle fill by the second arc
 * eyeX and eyeY is the position of the eye
 * if mouthclose, add a line stroke depend on direction
 */
export function pacmanGoOnDirection(
  ctx,
  pacman,
  tileSize,
  x1,
  y1,
  x2,
  y2,
  eyeX,
  eyeY,
  mouthCloseX,
  mouthCloseY,
) {
  ctx.beginPath()
  ctx.arc(
    pacman.x * tileSize + tileSize / 2 + 2, // position du pacman légérement vers l'avant pour ne pas voir le point
    pacman.y * tileSize + tileSize / 2,
    tileSize / 2 - 2,
    pacman.openMouth ? x1 * Math.PI : 0,
    pacman.openMouth ? y1 * Math.PI : Math.PI * 2,
    false,
  )
  ctx.fillStyle = pacman.color
  ctx.fill()
  if (pacman.openMouth) {
    ctx.beginPath()
    ctx.arc(
      pacman.x * tileSize + tileSize / 2 + 2,
      pacman.y * tileSize + tileSize / 2,
      tileSize / 2 - 2,
      x2 * Math.PI,
      y2 * Math.PI,
      false,
    )
    ctx.fill()
  } else {
    ctx.beginPath() // Start a new path
    ctx.moveTo(pacman.x * tileSize + tileSize / 2 + 2, pacman.y * tileSize + tileSize / 2)
    ctx.lineTo(mouthCloseX, mouthCloseY)
    ctx.strokeStyle = 'black'
    ctx.stroke()
  }

  ctx.beginPath()
  ctx.arc(
    pacman.x * tileSize + tileSize / 2 + eyeX,
    pacman.y * tileSize + tileSize / 2 + eyeY, // position de l'oeil
    tileSize / 14, // 10% de la taille
    0,
    2 * Math.PI,
    false,
  )
  ctx.fillStyle = 'rgb(0, 0, 0)'
  ctx.fill()
}
