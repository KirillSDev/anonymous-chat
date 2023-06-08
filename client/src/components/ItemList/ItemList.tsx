import { IMessage } from '@interfaces/IMessage.interface';
import { Collapse } from 'antd';
import { FC } from 'react';
import styles from './ItemList.module.scss';
import { formatDate } from '@utils/formatDate';
const { Panel } = Collapse;
interface ItemListProps {
    message: IMessage;
}
export const ItemList: FC<ItemListProps> = ({ message }): JSX.Element => {
    return (
        <div key={message.id} className={styles['item-list']}>
            <div className={styles['item-list__header']}>
                <div className={styles['item-list__name']}>
                    <a>{message.sender.name}</a>
                </div>
                <div className={styles['item-list__subject']}>
                    <Collapse bordered={false} size={'small'} ghost>
                        <Panel header='Message subject' key='1'>
                            <p className={styles['item-list__subject__text']}>{message.subject}</p>
                        </Panel>
                    </Collapse>
                </div>
            </div>
            <div>
                <a>{message.message}</a>
                <a className={styles['item-list__date']}>{formatDate(message.date)}</a>
            </div>
        </div>
    );
};
