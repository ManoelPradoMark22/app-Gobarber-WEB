import React from 'react';
import PropTypes from 'prop-types';

import { Wrapper, Content } from './styles';

export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Content>
        {children}
        {/* pega os componentes passados junto  com o componente AuthLayout */}
      </Content>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

/* pq colocamos apenas .element e nao com o oneOfType(....) como fizemos la em
routes/Route.js?
pq estamos mandando o authlayout como elemento diretamente <AuthLayout /> e nao
como uma func AuthLayout */
