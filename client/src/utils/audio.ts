export function formatAudioTime(seconds: number): string {
  if (isNaN(seconds)) {
    return '00:00'
  }

  const min = Math.floor(seconds / 60)
  const minStr = `${min >= 10 ? min : '0' + min}`
  const sec = Math.floor(seconds % 60)
  const secStr = `${sec >= 10 ? sec : '0' + sec}`

  return `${minStr}:${secStr}`
}
