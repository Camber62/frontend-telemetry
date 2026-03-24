import { useMemo } from 'react'
import type { VendingMachineMoneyStatus } from '@/entities/dashboard'

export function useCashStatus(
  moneyFill: VendingMachineMoneyStatus[],
  sortDescending = true,
) {
  return useMemo(() => {
    const copy = [...moneyFill]
    copy.sort((a, b) => {
      const ta = a.coinFillPercentage + a.banknotesFillPercentage
      const tb = b.coinFillPercentage + b.banknotesFillPercentage
      return sortDescending ? tb - ta : ta - tb
    })
    return copy.slice(0, 5)
  }, [moneyFill, sortDescending])
}
