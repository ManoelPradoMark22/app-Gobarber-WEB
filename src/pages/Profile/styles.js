import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto; /*margem cima e baixo e centraliza nas laterais */

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;

      &::placeholder {
        /*o styled components já converte o placeholder p/ cada
      navegador entender */
        color: rgba(255, 255, 255, 0.7);
      }
    }

    span {
      /* estilizando a mensagem de erro para os inputs vazios! */
      color: #f64c75;
      align-self: flex-start; /*p/ nao ficar no centro */
      margin: 0 12px 10px;
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px; /*coloquei so 10px encima pq o input acima ja tem 10px
      de bottom */
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #3b9eff;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#3b9eff')};
      }
    }
  }

  > button {
    /*button fora do formulario (sair do gobarber) */
    width: 100%;
    margin: 10px 0 0;
    height: 44px;
    background: #f64c75;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.08, '#f64c75')};
    }
  }
`;
