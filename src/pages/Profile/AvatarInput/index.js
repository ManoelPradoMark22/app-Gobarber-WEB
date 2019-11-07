import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';
import api from '~/services/api';

import { Container } from './styles';

export default function AvatarInput() {
  /* 'avatar' é o nomo como a info foi armazenada no redux,
  defaultValue pega o valor que queremos (no caso, avatar). */
  const { defaultValue, registerField } = useField('avatar');

  /* id do avatar que ja esta cadastrado, file pega o id p/ depois q formos
  atualiar novamente fazer a busca na api com o id */
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  /* o unform precisa da referencia do input para só depois buscar o valor dele
  atraves da prop data-file */
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        /* qnd a prop comeca com "data-" usamos "dataset." do input e depois o sufixo, que
        nesse caso é "file". estamos usando a prop data-file nos comp abaixo */
        path: 'dataset.file',
      });
    }
  }, [ref]);// eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();

    /* lá na api o campo é file, entao temos q criá-lo aqui tb
  passamos [0] pq se selecionar mais de um arquivo, pega apenas o primeiro */
    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        {/* se o preview nao existir coloca o avatar padrão */}
        <img
          src={
            preview || 'https://api.adorable.io/avatars/50/abott@adorable.png'
          }
          alt=""
        />

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
