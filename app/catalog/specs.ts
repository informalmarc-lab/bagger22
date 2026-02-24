export type BagSizeSpec = {
  id: string
  dims: string
  qty: string
}

export const FULL_CUSTOM_STANDARD_SIZES: BagSizeSpec[] = [
  { id: '#21', dims: '3.5" x 1.5" x 10"', qty: '3,000 per case' },
  { id: '#22', dims: '4.5" x 2.25" x 11"', qty: '3,000 per case' },
  { id: '#23', dims: '5" x 2" x 10"', qty: '3,000 per case' },
  { id: '#25', dims: '6" x 4" x 11"', qty: '2,000 per case' },
  { id: '#26', dims: '7" x 4" x 14"', qty: '1,000 per case' },
  { id: '#28', dims: '8" x 5" x 17"', qty: '500 per case' },
  { id: '#12', dims: '7" x 10"', qty: '3,000 per case' },
  { id: '#14', dims: '9" x 11"', qty: '2,000 per case' },
  { id: '#15', dims: '8.5" x 3.5" x 14.5"', qty: '1,000 per case' },
]

export const FULL_CUSTOM_SIZE_SUMMARY = FULL_CUSTOM_STANDARD_SIZES.map((size) => size.id).join(', ')
