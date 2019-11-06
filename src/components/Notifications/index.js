import React, { useState, useEffect, useMemo } from 'react';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
} from './styles';

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const hasUnread = useMemo(
    /* desssa forma retornaria a notificacao encontrada:
    () => notifications.find(notification => notification.read === false)
    Entao para receber true ou false usamos assim:
    () => Boolean(notifications.find(notification => notification.read === false))
    ou assim: */
    () =>
      Boolean(notifications.find(notification => notification.read === false)),
    [notifications]
  );

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('notifications');

      const data = response.data.map(notification => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(), // horario atual
          {
            addSuffix: true,
            locale: pt,
          } /* sendo true coloca o "há" antes
          fala sufixo pq em ingles acrescenta o "ago" depois, por isso sufixo */
        ),
      }));

      setNotifications(data);
    }

    loadNotifications();
  }, []);

  function handleToggleVisible() {
    setVisible(!visible); // seta o valor contrario q esta
  }

  async function handleMarkAsRead(id) {
    await api.put(`notifications/${id}`);

    /* estamos colocando o map() direto no notifications pq ele ja retorna um array */
    setNotifications(
      notifications.map(notification =>
        notification._id === id ? { ...notification, read: true } : notification
      )
    );
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        <MdNotifications color="#7159c1" size={20} />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(notification => (
            /* o id dop MONGOdb é com um _ na frente: _id */
            <Notification key={notification._id} unread={!notification.read}>
              <p>{notification.content}</p>
              <time>{notification.timeDistance}</time>
              {!notification.read && (
                <button
                  type="button"
                  onClick={() => handleMarkAsRead(notification._id)}
                >
                  Marcar como lida
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
