import type { BffDashboardPayload } from '@/entities/dashboard'
import { CashStatusList } from '@/features/cashStatusList'
import { SalesIndexList } from '@/features/salesIndexList'
import { StockLevelList } from '@/features/stockLevelList'

type Props = {
  data: BffDashboardPayload
  selectedMachineId: number | null
  onSelectMachine: (id: number | null) => void
}

export function MonitoringOverview({ data, selectedMachineId, onSelectMachine }: Props) {
  return (
    <div className="tri-columns tri-columns--status">
      <SalesIndexList
        rows={data.salesIndex}
        selectedMachineId={selectedMachineId}
        onSelectMachine={onSelectMachine}
      />
      <StockLevelList
        productFill={data.productFill}
        overviewTotal={data.overview.total}
        lowSupply={data.overview.lowSupply}
      />
      <CashStatusList
        moneyFill={data.moneyFill}
        selectedMachineId={selectedMachineId}
        onSelectMachine={onSelectMachine}
      />
    </div>
  )
}
