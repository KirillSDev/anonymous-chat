import { FC } from 'react';
import styles from './styles.module.scss';
import { Button, Input } from 'antd';
import cn from 'classnames';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './pages/Home';

const App: FC = (): JSX.Element => {
    return (
        <div className={cn(styles.container, 'fluid')}>
            <Home />;
        </div>
    );
};

export default App;
