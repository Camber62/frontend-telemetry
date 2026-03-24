import type {
  BffDashboardPayload,
  PeakSaleTimeAtDay,
  ProductsTotalSalesOverview,
  SalesIndex,
  VendingMachineMoneyStatus,
  VendingMachinesItemFillOverview,
  VendingMachinesOverview,
  VendingMachinesTotalSalesOverview,
} from '@/entities/dashboard'

export const dashboardQueryKey = ['bff', 'dashboard'] as const

const BASE = '/api/bff'

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) {
    throw new Error(`${path}: ${res.status} ${res.statusText}`)
  }
  return res.json() as Promise<T>
}

export async function loadDashboard(): Promise<BffDashboardPayload> {
  const [
    overview,
    salesIndex,
    productFill,
    moneyFill,
    salesByVm,
    salesByProduct,
    peakPerDay,
  ] = await Promise.all([
    getJson<VendingMachinesOverview>('/machines/overview'),
    getJson<SalesIndex[]>('/sales/index-by-historic-avg'),
    getJson<VendingMachinesItemFillOverview>('/machines/product-fill'),
    getJson<VendingMachineMoneyStatus[]>('/machines/money-fill'),
    getJson<VendingMachinesTotalSalesOverview>('/sales/by-vending-machine'),
    getJson<ProductsTotalSalesOverview>('/sales/by-product-type'),
    getJson<PeakSaleTimeAtDay[]>('/sales/peak-sale-count-per-day'),
  ])

  return {
    overview,
    salesIndex,
    productFill,
    moneyFill,
    salesByVm,
    salesByProduct,
    peakPerDay: Array.isArray(peakPerDay) ? peakPerDay : [],
  }
}
