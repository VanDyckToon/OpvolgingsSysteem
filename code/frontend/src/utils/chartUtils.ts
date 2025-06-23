export function getDateStr(dateTime: string): string {
  return dateTime.split('T')[0]
}

export function beoordelingToDataMap(beoordelingen: any[]): Map<string, number> {
  const dataMap = new Map<string, number>()
  beoordelingen.forEach(beoordeling => {
    const dateStr = getDateStr(beoordeling.datumBeoordeeld)
    dataMap.set(dateStr, beoordeling.score.waarde * 100)
  })
  return dataMap
}

export type MonthOption = {
  value: string
  label: string
}

export function extractMonthOptions(beoordelingen: any[]): MonthOption[] {
  const uniqueDates = new Set<string>()
  const monthOptions: MonthOption[] = []

  beoordelingen.forEach(beoordeling => {
    const date = new Date(beoordeling.datumBeoordeeld)
    const key = `${date.getFullYear()}-${date.getMonth()}`
    if (!uniqueDates.has(key)) {
      uniqueDates.add(key)
      monthOptions.push({
        value: key,
        label: `${date.toLocaleString('nl-NL', { month: 'long' })} ${date.getFullYear()}`
      })
    }
  })

  return monthOptions.sort((a, b) => {
    const [aYear, aMonth] = a.value.split('-').map(Number)
    const [bYear, bMonth] = b.value.split('-').map(Number)
    return aYear === bYear ? aMonth - bMonth : aYear - bYear
  })
}