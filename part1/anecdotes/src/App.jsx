import { useState } from 'react';

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>;

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  //Estado para la anécdota seleccionada:
  const [selected, setSelected] = useState(0);

  //Estado para los votos (inicialmente todos en 0):
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  //Manejar el voto:
  const handleVote = () => {
    const newVotes = [...votes]; //Hacemos una copia del array actual.
    newVotes[selected] += 1; //Incrementamos el voto de la anécdota seleccionada.
    setVotes(newVotes); //Actualizamos el estado con la copia modificada.
  };

  //Anécdota con mayor cantidad de votos:
  const anecdoteMaxVotes = () => {
    //Suponemos que es la primera:
    let anecdoteIndex = 0;
    let maxVotes = votes[anecdoteIndex];

    //Analizamos las demás:
    for(let i = 1; i < votes.length; i++){
      let amount = votes[i];
      if(amount > maxVotes){
        anecdoteIndex = i;
        maxVotes = amount;
      }
    }

    //Obtenemos la anécdota más votada:
    const anecdote = anecdotes[anecdoteIndex];

    //Retornamos la anécdota y la cantidad de votos:
    return {anecdote, maxVotes};
  }

  //Llamamos a la función para obtener la anécdota más votada:
  const {anecdote, maxVotes} = anecdoteMaxVotes();

  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} vote/s</p>
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text="next anecdote"/>
      <h2>Anecdote with most votes</h2>
      <p>{anecdote}</p>
      <p>has {maxVotes} vote/s</p>
    </>
  );
};

export default App;