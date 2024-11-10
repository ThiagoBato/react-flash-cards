import ClipLoader from 'react-spinners/ClipLoader';

export function Loading() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <ClipLoader />
    </div>
  )
}
