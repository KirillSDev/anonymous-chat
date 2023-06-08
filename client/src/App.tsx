import { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '@pages/Home';
import { Layout } from '@layout/Layout';
import { Chat } from '@pages/Chat';
import { FormGroup } from '@components/FormGroup/FormGroup';
import { ListFriends } from '@components/ListFriends/ListFriends';
import socket from '@sockets/socket';
import userStore from '@store/UserStore';
import { observer } from 'mobx-react';
import messageStore from '@store/MessageStore';
import { notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import { PrivateRoute } from '@components/PrivateRoute/PrivateRoute';
import './styles.module.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: FC = observer((): JSX.Element => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = (placement: NotificationPlacement) => {
        api.info({
            message: `New message!`,
            description: `${messageStore.messages.at(-1)?.message}`,
            placement,
            duration: 4,
        });
    };

    useEffect(() => {
        socket.on('connect_error', (err) => {
            if (err.message === 'invalid name') {
                userStore.isAuthenticated = false;
            }
        });
        userStore.getAllUsers();
        userStore.isAuthenticated = true;
        messageStore.getAllMessages();
        messageStore.getNewMessage();
    }, []);

    useEffect(() => {
        if (messageStore.newMessageStatus) {
            openNotification('topRight');
            messageStore.changeStatusMessage(false);
        }
    }, [messageStore.newMessageStatus]);

    const options = userStore.users.map((item, idx) => {
        return { value: item.name };
    });

    return (
        <Layout>
            {contextHolder}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route
                    path='/messages'
                    element={
                        <PrivateRoute isAuthenticated={userStore.isAuthenticated} redirectPath='/'>
                            <Chat />
                        </PrivateRoute>
                    }
                >
                    <Route path='new' element={<FormGroup options={options} />} />
                    <Route index element={<ListFriends />} />
                </Route>
            </Routes>
        </Layout>
    );
});

export default App;
