import { Alert, Button, Form, Input, Select } from 'antd';
import { FC, useEffect, useState } from 'react';
import { IFormProps } from './FormGroup.props';
import { UserOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import socket from '@sockets/socket';
import { useForm } from 'antd/es/form/Form';
import { observer } from 'mobx-react';
import userStore from '@store/UserStore';

export const FormGroup: FC<IFormProps> = observer(({ options }): JSX.Element => {
    interface IFormValues {
        message: string;
        receiversName: string[];
        subject: string;
    }
    const [form] = useForm();
    const [selectedItems, setSelectedItems] = useState<string[]>();
    const [alertDisplay, setAlertDisplay] = useState<boolean>(false);
    const [values, setValues] = useState<IFormValues>({
        message: '',
        receiversName: [],
        subject: '',
    });
    const sendMessage = (values: IFormValues) => {
        socket.emit('sendMessage', {
            sender_id: userStore.userId,
            ...values,
        });
        setAlertDisplay(true);
        form.resetFields();
    };

    return (
        <Form form={form} autoComplete='off' onFinish={sendMessage}>
            {alertDisplay && (
                <Alert
                    style={{ position: 'absolute', top: 0, left: '50%', transform: 'translate(-50%, 50%)' }}
                    message='You have successfully sent a message'
                    type='success'
                    showIcon
                    onClose={() => {
                        setAlertDisplay(false);
                    }}
                    closable={true}
                    banner={true}
                    className='w-50'
                />
            )}
            <Form.Item
                labelCol={{ span: 3 }}
                label={'To:'}
                name='receiversName'
                rules={[
                    {
                        required: true,
                        message: `Please enter your friend's name!`,
                    },
                ]}
            >
                <Select
                    mode='tags'
                    allowClear={true}
                    maxTagCount={5}
                    value={selectedItems}
                    placeholder={`Your friend's name`}
                    onChange={setSelectedItems}
                    options={options}
                    suffixIcon={<UserOutlined />}
                />
            </Form.Item>
            <Form.Item
                labelCol={{ span: 3 }}
                name='subject'
                initialValue={values.subject}
                label='Subject'
                rules={[
                    {
                        required: true,
                        message: 'Please enter a message subject!',
                    },
                ]}
            >
                <Input showCount maxLength={50}></Input>
            </Form.Item>
            <Form.Item
                name='message'
                initialValue={values.message}
                rules={[
                    {
                        required: true,
                        message: 'Please enter a message!',
                    },
                ]}
            >
                <TextArea size='middle' autoSize={{ minRows: 3, maxRows: 5 }} style={{ resize: 'none' }}></TextArea>
            </Form.Item>
            <Form.Item className='row'>
                <Button type='primary' className='col-12' htmlType='submit'>
                    Send message
                </Button>
            </Form.Item>
        </Form>
    );
});
