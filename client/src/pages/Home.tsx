import { Input, Button } from 'antd';
import { FC, useState } from 'react';
import cn from 'classnames';
import { Layout } from '../layout/Layout';
export const Home: FC = (): JSX.Element => {
    const [value, setValue] = useState('');
    return (
        <Layout>
            <div className='row'>
                <div className='col-sm-5 d-grid gap-2'>
                    <Input
                        type='text'
                        placeholder='Your name'
                        onChange={(event) => {
                            setValue(event.target.value);
                        }}
                        defaultValue={value}
                    ></Input>
                    <Button className='w-100'>Start chat</Button>
                </div>
            </div>
        </Layout>
    );
};
