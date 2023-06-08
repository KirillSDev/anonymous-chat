import socket from '@sockets/socket';
import { Input, Button } from 'antd';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home: FC = (): JSX.Element => {
    const [value, setValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [disable, setDisable] = useState<boolean>(true);
    const navigate = useNavigate();
    const sendData = () => {
        setLoading(true);
        socket.auth = { name: value };
        socket.connect();
        setValue('');
        setTimeout(() => {
            setLoading(false);
            navigate('/messages/new');
        }, 2000);
    };
    useEffect(() => {
        if (value) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }, [value]);

    return (
        <div className='col-lg-4 col-md-8 col-11 d-grid gap-2'>
            <Input
                type='text'
                placeholder='Your name'
                onChange={(event) => {
                    setValue(event.target.value);
                    setDisable;
                }}
                value={value}
                defaultValue={value}
            ></Input>
            <Button className='w-100' disabled={disable} loading={loading} onClick={sendData}>
                Start chat
            </Button>
        </div>
    );
};
