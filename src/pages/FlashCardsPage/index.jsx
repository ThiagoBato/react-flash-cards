import { useEffect, useState } from "react";
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { Header } from "../../components/Header";
import { Main } from "../../components/Main";
import { FlashCardForm } from "../../components/FlashCardForm";
import { FlashCardItem } from "../../components/FlashCardItem";
import { FlashCards } from "../../components/FlashCards";
import { FlashCard } from "../../components/FlashCard";
import { Button } from "../../components/Button";
import { RadioButton } from "../../components/RadioButton";
import { Loading } from "../../components/Loading";
import { Error } from "../../components/Error";

import { helperShuffleArray } from '../../helpers/arrayHelpers'
import { apiCreateFlashCard, apiDeleteFlashCard, apiGetAllFlashCards, apiUpdateFlashCard } from '../../services/apiService'

export default function FlashCardsPage() {
  const [radioButtonShowTitle, setRadioButtonShowTitle] = useState(true);
  const [allCards, setAllCards] = useState([]);
  const [studyCards, setStudyCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [createMode, setCreateMode] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedFlashCard, setSelectedFlashCard] = useState({});

  useEffect(()=>{
    async function getAllCards(){
      try{
        const backendAllCards = await apiGetAllFlashCards();
        setAllCards(backendAllCards);
        setTimeout(()=>{
          setLoading(false);
        },500)
      }
      catch(error){
        setError(error.message)
      }
    }
    getAllCards();
  },[])

  function handleShuffleCards(){
    const shuffledCards = helperShuffleArray(studyCards);
    setStudyCards(shuffledCards)
  }

  useEffect(()=> {
    setStudyCards(allCards.map((card)=>{
      return {...card, showTitle: true}
    }))
  },[allCards])

  function handleRadioShowTitleClick(){
    const updatedCards = [...studyCards].map((card)=> ({...card, showTitle: true}));
    setStudyCards(updatedCards)
    setRadioButtonShowTitle(true)
  }
  function handleRadioShowDescriptionClick(){
    const updatedCards = [...studyCards].map((card)=> ({...card,showTitle: false}));
    setStudyCards(updatedCards)
    setRadioButtonShowTitle(false)
  }
  function handleToggleFlashCard(cardId){
    const updatedCards = [...studyCards];
    const cardIndex = updatedCards.findIndex(card => card.id === cardId);
    updatedCards[cardIndex].showTitle = !updatedCards[cardIndex].showTitle;
    setStudyCards(updatedCards)
  }

  function handleEditFlashCard(card){
    setCreateMode(false);
    setSelectedTab(1);
    setSelectedFlashCard(card);
  }
  async function handleDeleteFlashCard(cardId){
    try{
      await apiDeleteFlashCard(cardId);
      setAllCards(allCards.filter(card=> card.id !== cardId));
      setError('')
    }catch(error){
      setError(error.message)
    }
  }
  function handleTabSelect (tabIndex){
    setSelectedTab(tabIndex)
  }
  function handleNewFlashCard (){
    setCreateMode(true)
    setSelectedFlashCard({})
  }
  async function handlePersist (title, description){
    if(createMode){
      try {
        const newFlashCard = await apiCreateFlashCard(title, description);
        setAllCards([...allCards, newFlashCard]);
        setError('');
      } catch(error){
        setError(error.message)
      }
    } else {
      try {
        await apiUpdateFlashCard(selectedFlashCard.id, title, description);

        setAllCards(allCards.map((card)=>{
          if(card.id === selectedFlashCard.id){
            return {...card, title, description}
          }
          return card;
        }))
  
        setSelectedFlashCard(null);
        setCreateMode(true);
        setError('');
      }catch(error){
        setError(error.message);
      }
    }
  }
  return (
    <>
      <Header>
        React Flash Cards V3.0.0
      </Header>
      {error ? <Error>{error}</Error> : 
        loading ? <Loading /> : (
          <Main>
            <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
              <TabList>
                <Tab>Listagem</Tab>
                <Tab>Cadastro</Tab>
                <Tab>Estudo</Tab>
              </TabList>
              <TabPanel>
                {allCards.map(flashCard => (
                  <FlashCardItem 
                    key={flashCard.id}
                    onEdit={handleEditFlashCard}
                    onDelete={handleDeleteFlashCard}
                  >
                    {flashCard}
                  </FlashCardItem>
                ))}
              </TabPanel>
              <TabPanel>
                <div className="my-4">
                  <Button onButtonClick={handleNewFlashCard}>Novo Flash Card</Button>
                </div>
                <FlashCardForm
                  createMode={createMode}
                  onPersist={handlePersist}
                >
                  {selectedFlashCard}
                </FlashCardForm>
              </TabPanel>
              <TabPanel>
                <div className="text-center mb-4">
                  <Button onButtonClick={handleShuffleCards}>Embaralhar Cards</Button>
                </div>
                <div className="flex flex-row justify-center gap-5 mb-8">
                  <RadioButton 
                    id="radioButtonShowTitle" 
                    name="showInfo" 
                    RadioChecked={radioButtonShowTitle} 
                    onButtonClick={handleRadioShowTitleClick}
                  >
                    Mostrar Título
                  </RadioButton>
                  <RadioButton 
                    id="radioButtonShowDescription" 
                    name="showInfo" 
                    RadioChecked={!radioButtonShowTitle} 
                    onButtonClick={handleRadioShowDescriptionClick}
                  >
                    Mostrar Descrição
                  </RadioButton>
                </div>
                <FlashCards>
                  {studyCards.map(({id, title, description, showTitle}) => {
                    return (
                      <FlashCard 
                        key={id} 
                        id={id}
                        title={title} 
                        description={description} 
                        showFlashCardTitle={showTitle}
                        onToggleFlashCard={handleToggleFlashCard}
                      />
                    )
                  })}
                </FlashCards>
              </TabPanel>
            </Tabs>
          </Main>
        )
      }
    </>
  )
}
