import theme from '../constants/theme'
import colorTheme from '../constants/colorTheme'

export const getColorFromGroup = (nodeGroup) => {
  if (nodeGroup === 'object') {
    return colorTheme.OBJECT
  }

  return {
    '1-Dark': colorTheme.ONE,
    '1-Med': colorTheme.ONE,
    '1-Light': colorTheme.ONE,
    '2-Dark': colorTheme.TWO,
    '2-Med': colorTheme.TWO,
    '2-Light': colorTheme.TWO,
    '3-Dark': colorTheme.THREE,
    '3-Med': colorTheme.THREE,
    '3-Light': colorTheme.THREE,
    '4-Dark': colorTheme.FOUR,
    '4-Med': colorTheme.FOUR,
    '4-Light': colorTheme.FOUR,
    '5-Dark': colorTheme.FIVE,
    '5-Med': colorTheme.FIVE,
    '5-Light': colorTheme.FIVE,
    '6-Dark': colorTheme.SIX,
    '6-Med': colorTheme.SIX,
    '6-Light': colorTheme.SIX,
    '7-Dark': colorTheme.SEVEN,
    '7-Med': colorTheme.SEVEN,
    '7-Light': colorTheme.SEVEN,
  }[nodeGroup]
}

export const getThemeFromGroup = (group) => {
  if (group.startsWith('1')) {
    return theme.HISTORICAL_INQUIRY
  }

  if (group.startsWith('2')) {
    return theme.THRESHOLD
  }

  if (group.startsWith('3')) {
    return theme.MEANING_MAKING_SENSE_MAKING
  }

  if (group.startsWith('4')) {
    return theme.WORLD_BUILDING
  }

  if (group.startsWith('5')) {
    return theme.GAME_PLAY_CULTURE
  }

  if (group.startsWith('6')) {
    return theme.OBJECT_AND_ITS_CONTEXTS
  }

  if (group.startsWith('7')) {
    return theme.UNCLASSIFIED
  }
}
