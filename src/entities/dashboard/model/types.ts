export interface VendingMachinesOverview {
  total: number
  working: number
  lowSupply: number
  needsRepair: number
}

export interface SalesIndex {
  machineId: number
  machineType: string
  percentage: number
}

export interface VendingMachineItemFill {
  itemCount: number
  fillPercentage: number
}

export interface VendingMachinesItemFillOverview {
  total: number
  topFilled: VendingMachineItemFill[]
}

export interface VendingMachineMoneyStatus {
  machineId: number
  machineType: string
  coinFillPercentage: number
  banknotesFillPercentage: number
}

export interface VendingMachineTotalSales {
  totalSales: number
  percentageOfAllSales: number
}

export interface VendingMachinesTotalSalesOverview {
  totalSales: number
  soldInTopFive: number
  topVendingMachines: VendingMachineTotalSales[]
}

export interface ProductTotalSales {
  productId: number
  soldTotal: number
  percentageOfAllSales: number
}

export interface ProductsTotalSalesOverview {
  totalSold: number
  soldInTopFive: number
  differentProductCategoriesCount: number
  topProducts: ProductTotalSales[]
}

export interface PeakSaleTimeAtDay {
  day: number
  peakSalesTime: string
}

export interface BffDashboardPayload {
  overview: VendingMachinesOverview
  salesIndex: SalesIndex[]
  productFill: VendingMachinesItemFillOverview
  moneyFill: VendingMachineMoneyStatus[]
  salesByVm: VendingMachinesTotalSalesOverview
  salesByProduct: ProductsTotalSalesOverview
  peakPerDay: PeakSaleTimeAtDay[]
}
