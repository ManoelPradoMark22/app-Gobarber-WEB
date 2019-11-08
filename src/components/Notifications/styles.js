import styled, { css } from 'styled-components';
/* { css } como temos que aplicar mais de uma linha de css,
serve para adicionar um conjunto de css a mais em um componente baseado em uma
informacao */
import PerfectScrollbar from 'react-perfect-scrollbar';
import { lighten } from 'polished';

export const Container = styled.div`
  position: relative;
`;
export const Badge = styled.button`
  background: none;
  border: 0;
  position: relative;

  /*esse css adicional só é ativado quando a propriedade que estamos observando,
  no caso hasUnread, for true (se tiver alguma notif que o usuairo nao leu ainda) */
  ${props =>
    props.hasUnread &&
    css`
      &::after {
        /*pegamos o componente e acessamos a prop after (que é p/ add algum tipo
    de conteudo antes tag Badge (button) fechar) */
        position: absolute;
        right: 0;
        top: 0;
        width: 8px;
        height: 8px;
        background: #ff892e;
        content: ''; /*obrigatorio, colocaremos vazio */
        border-radius: 50px;
      }
    `}
`;

export const NotificationList = styled.div`
  position: absolute;
  width: 260px;
  left: calc(50% - 130px);
  /*calcula 50% do tamanho dela e subtrai 130px, vai
  fazer com q fique ao centro, 130px p esq e 130 p direita, logo abaixo do
  sino de notificacao, bem alinhado*/
  top: calc(100% + 30px); /*alinha 30px p/  baixo*/
  background: rgba(0, 0, 0, 0.7);
  border-radius: 4px;
  padding: 15px 5px;
  display: ${props => (props.visible ? 'block' : 'none')};

  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 20px);
    /*pq meu icone (triang) vai ter 40px de larg entao
    menos 20px vai deixar bem no centro mesmo */
    top: -20px; /*pq o icone vai ter 20px de altura */
    width: 0;
    height: 0;
    /**abaixo faremos o triangulo: */
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid rgba(0, 0, 0, 0.7);
  }
`;

export const Scroll = styled(PerfectScrollbar)`
  max-height: 260px;
  padding: 5px 15px;
`;

export const Notification = styled.div`
  color: #fff;

  z-index: 5;

  /*pegamos a referencia da notificacao e toda notificacao SEGUIDA de uma
  notificacao anterior, nunca a primeira */
  & + div {
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  p {
    font-size: 13px;
    line-height: 18px;
  }

  time {
    display: block;
    font-size: 12px;
    opacity: 0.6;
    margin-bottom: 5px;
    margin-top: 2px;
  }

  button {
    font-size: 12px;
    border: 0;
    background: none;
    color: ${lighten(0.2, '#7159c1')};
  }

  ${props =>
    props.unread &&
    css`
      &::after {
        content: '';
        display: inline-block; /*faz ficar ao lado do botão "Marcar como lida" */
        width: 8px;
        height: 8px;
        background: #ff892e;
        border-radius: 50%;
        margin-left: 10px;
      }
    `}
`;
