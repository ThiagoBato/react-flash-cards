/* eslint-disable react/prop-types */

export function FlashCard({
  id = '',
  title = 'Título do card', 
  description = 'Descrição do card, que pode conter mais palavras que o título',
  showFlashCardTitle = false,
  onToggleFlashCard = null
}) {
  const fontSizeClassName = showFlashCardTitle ? 'text-xl' : 'text-sm';

  function handleCardClick(){
    if(onToggleFlashCard){
      onToggleFlashCard(id);
    }
  }

  return (
    <div 
      className={`shadow-lg p-2 flex justify-center items-center w-80 h-48 font-semibold ${fontSizeClassName} cursor-pointer`} 
      style={{fontFamily:`'Courier New', Courier, monospace`}}
      onClick={handleCardClick}
    >
      {showFlashCardTitle ? title : description}
    </div>
  )
}
