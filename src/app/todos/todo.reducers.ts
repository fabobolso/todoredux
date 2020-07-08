import { createReducer, on } from '@ngrx/store';
import { crear, toggle, editar, borrar, all, limpiar } from './todo.acctions';
import { Todo } from './models/todo.model';

export const initialState:Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Vencer al mundo'),
  new Todo('Comprar mundo'),
  new Todo('Vender mundo'),
];

const _todoReducer = createReducer(initialState,
  on(crear, (state, {texto}) => [...state, new Todo(texto)]),
  on(limpiar, state => state.filter(todos => !todos.completado) ),

  on(borrar, (state, {id}) => state.filter(todo => todo.id !== id)),
  on(toggle, (state, {id}) => {
    return state.map( todo => {
      if(todo.id === id){
      return {
        ...todo,
        completado: !todo.completado
      }
    }
    else{
      return todo;
    }
    })
  }),

  on(editar, (state, {id, texto}) => {
    return state.map( todo => {
      if(todo.id === id){
      return {
        ...todo,
        texto: texto
      }
    }
    else{
      return todo;
    }
    })
  }),
  on(all, (state, {valor}) =>  state.map( todo => {      
      return {
        ...todo,
        completado: valor
      }    
    })
  ),
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}