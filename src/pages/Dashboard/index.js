import React, { useState, useMemo } from 'react';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import api from '~/services/api';

import { Container, Time } from './styles';

export default function Dashboard() {
  /* valor padrão da data vai ser o new Date() (data atual) */
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    /* lembre de usar aspas duplas, pq aspas simples é o q vc não quer formatar */
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
    /* esse segundo parametro são as dependencias, ou seja, qnd eu quero q
    esse dateFormatted seja recalculado? quando o date alterar! */
  );

  function handlePrevDay() {
    /* setando um novo valor para o nosso estado de data e reduzindo em um dia
    este valor */
    setDate(subDays(date, 1));
  }

  function handleNextDay() {
    /* setando um novo valor para o nosso estado de data e adicionando em um dia
    este valor */
    setDate(addDays(date, 1));
  }

  return (
    <Container>
      <header>
        <button type="button" onClick={handlePrevDay}>
          <MdChevronLeft size={36} color="#fff" />
        </button>
        <strong>{dateFormatted}</strong>
        <button type="button" onClick={handleNextDay}>
          <MdChevronRight size={36} color="#fff" />
        </button>
      </header>

      <ul>
        <Time past>
          <strong>08:00</strong>
          <span>Manoel Prado</span>
        </Time>
        <Time available>
          <strong>09:00</strong>
          <span>Em aberto</span>
        </Time>
        <Time>
          <strong>10:00</strong>
          <span>João</span>
        </Time>
        <Time>
          <strong>11:00</strong>
          <span>Lucas</span>
        </Time>
      </ul>
    </Container>
  );
}
