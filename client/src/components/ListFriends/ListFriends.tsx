import { FC } from 'react';
import { List } from 'antd';
import styles from './ListFriends.module.scss';
import messageStore from '@store/MessageStore';
import { observer } from 'mobx-react';
import { orderBy } from 'lodash';
import moment from 'moment';
import { ItemList } from '@components/ItemList/ItemList';

export const ListFriends: FC = observer((): JSX.Element => {
    const reversedMessages = orderBy(messageStore.messages, [(message) => moment(message.date)], ['desc']);
    return (
        <div>
            <List className={styles.list}>
                {reversedMessages.map((item) => {
                    return <ItemList message={item}></ItemList>;
                })}
            </List>
        </div>
    );
});
