/* eslint-disable react/prop-types */

export function Button({
  children: description = 'Descrição do Botão',
  textColorClass = 'text-black',
  bgColorClass = 'bg-gray-200',
  onButtonClick = null,
  type = 'button'
}) {
  function handleButtonClick(){
    if(onButtonClick){
      onButtonClick();
    }
  }
  return (
    <button
      className={`${bgColorClass} ${textColorClass} p-2 m-1 rounded-md`}
      onClick={handleButtonClick}
      type={type}
    >
      {description}
    </button>
  )
}
