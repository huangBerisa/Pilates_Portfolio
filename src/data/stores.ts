import type { Store } from '../types'

export const STORES: Store[] = [
  { id: 'moriguchi', name: '京阪守口市店', favorite: true },
  { id: 'umeda', name: '東梅田店', favorite: true },
]

export const storeName = (id: Store['id']) => STORES.find((s) => s.id === id)?.name ?? ''
