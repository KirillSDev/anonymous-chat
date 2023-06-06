import { FC } from 'react';
import { LayoutProps } from './Layout.props';
import styles from './Layout.module.scss';
export const Layout: FC<LayoutProps> = ({ children }): JSX.Element => {
    return <div className='container-lg bg-white'></div>;
};
