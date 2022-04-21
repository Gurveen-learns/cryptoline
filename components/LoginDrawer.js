import { Drawer, Form, Checkbox,Input, Button } from 'antd';
import Image from 'next/image'
import Link from 'next/link'

const LoginDrawer =  ({visible, toggleDrawer}) => {
    return (
      <>
        <Drawer
          title="CryptoLine"
          onClose={toggleDrawer}
          visible={visible}
        >
          <div className="rounded-2xl overflow-hidden object-cover my-16 w-fit mx-auto">
            <Image src="/logo.png" height={200} width={150}/>
          </div>
          <Form layout="vertical">
            <Form.Item
                    name="email"
                    label="Your Email"
                    rules={[{ required: true, type: "email", message: 'Please enter email' }]}
                  >
                    <Input placeholder="Please enter email" />
              </Form.Item>
              <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please enter password' }]}
                  >
                    <Input.Password placeholder="Please enter password" />
              </Form.Item>
              <div className="flex justify-between">
                <Checkbox>Remember me</Checkbox>
                <Link href="#"><a className="forget-password">Forgot password ?</a></Link>
              </div>
              <Form.Item className="signup-btn">
                <Button>Sign In</Button>
              </Form.Item>
          </Form>
          <p className="signup-text">Dont have a account ? <Link href="#"><a className="signup-link">Sign Up</a></Link></p>
        </Drawer>
      </>
    );
}


export default LoginDrawer;
