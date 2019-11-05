import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 900px;
  margin: 0 auto; /*"margin: 0 auto" é p/ centralizar, e somado com o max-widht
  acima, centraliza com no maximo 900 px de largura */
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee; /*barra vertical de separação */
    }

    a {
      font-weight: bold;
      color: #7159c1;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee; /*barra vertical p/ separar as notif do perfil */

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block; /*ocupa a linha toda e nao permite outro na msma linha */
      color: #333;
    }

    a {
      display: block; /*ocupa a linha toda e nao permite outro na msma linha */
      margin-top: 2px; /*com o display:block permite dar o margin-top */
      font-size: 12px;
      color: #999;
    }
  }

  img {
    height: 32px;
    border-radius: 50%;
  }
`;
