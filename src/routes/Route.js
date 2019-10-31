import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

export default function RouteWrapper({
  component: Component, // com C maiusculo p/ usarmos como componente
  isPrivate, // definimos no proptypes q por padrão é false
  ...rest /* é repassado aqui toda e qualquer prop usada nas rotas */
}) {
  const signed = false;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool, // não obrigatoria
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  /* pode ser classe ou função. como para renderizar é obrigatorio o componente,
  entao essa prop deve ser obrigatoria */
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
