/* eslint-disable react/prop-types */
export  function Error({children: errorDescription}) {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-red-300 text-red-900 font-semibold">{errorDescription}</div>
  )
}
