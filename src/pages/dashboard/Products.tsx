import React from 'react'
import ProductsTable from '../../components/dashboard/ProductsTable'
import { useProducts } from '../../contexts/ProductsContext'

type Props = {}


export default function Products({}: Props) {
    const {productsData} = useProducts();

  return (
    <div>
        <ProductsTable productsData={productsData} />
    </div>
  )
}