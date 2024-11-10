// eslint-disable-next-line react/prop-types
export function FlashCards({children: flashCards}) {
  return (
    <div className="border p-2 flex items-center justify-center flex-wrap gap-5">{flashCards}</div>
  )
}
