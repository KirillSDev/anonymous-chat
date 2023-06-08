import { FC } from 'react';
import { LayoutProps } from './Layout.props';
import cn from 'classnames';
import styles from './Layout.module.scss';
export const Layout: FC<LayoutProps> = ({ children }): JSX.Element => {
    return (
        <div className={cn(styles.container)}>
            <div className='container-lg bg-light'>
                <div className={cn('row', styles.row)}>{children}</div>
            </div>
        </div>
    );
};
