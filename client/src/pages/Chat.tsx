import { FC } from 'react';
import { Breadcrumb } from 'antd';

import { Link, Outlet } from 'react-router-dom';

export const Chat: FC = (): JSX.Element => {
    return (
        <div className='col-lg-6 col-md-8 col-11' style={{ height: '80%' }}>
            <Breadcrumb className='mb-5' separator='/'>
                <Breadcrumb.Item>
                    <Link to='/messages'>Messages</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to='/messages/new'>Create message</Link>
                </Breadcrumb.Item>
            </Breadcrumb>

            <Outlet />
        </div>
    );
};
