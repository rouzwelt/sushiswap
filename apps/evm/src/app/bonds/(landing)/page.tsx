import { getBonds } from '@sushiswap/client'
import { Container } from '@sushiswap/ui'
import React from 'react'
import {
  BondsTable,
  TableFiltersAuctionType,
  TableFiltersNetwork,
  TableFiltersPositiveDiscountOnly,
  TableFiltersResetButton,
} from '../../../ui/bonds'

export default async function BondsPage() {
  const bonds = await getBonds()

  return (
    <Container maxWidth="7xl" className="px-4">
      <div className="flex flex-wrap gap-3 mb-4">
        <TableFiltersNetwork />
        <TableFiltersAuctionType />
        <TableFiltersPositiveDiscountOnly />
        <TableFiltersResetButton />
      </div>
      <BondsTable initialData={bonds} />
    </Container>
  )
}
