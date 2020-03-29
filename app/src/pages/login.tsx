import React, {useState} from 'react';
import '../style/scss/app.scss';
import '../theme/index.less';
import {Alert, Button, Col, Input, Progress, Row} from 'antd';
import fetch from 'isomorphic-unfetch';
import cookie from 'js-cookie';
import {useRouter} from 'next/router';

const API_URL = 'http://127.0.0.1:3001';

interface loadInt {
  status: boolean;
  type: 'active' | 'success' | 'exception' | 'normal' | undefined;
}

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });
  const [error, setError] = useState();
  const [loading, setLoading] = useState<loadInt>({
    status: false,
    type: 'active',
  });
  const router = useRouter();

  /**
   * handle the login form
   * @Param {any} event the dom event
   */
  function handleForm(event: any) {
    setError(null);
    const value: string = event.target.value;
    const name: string = event.target.name;
    const oldState: any = formData;
    oldState[name] = value;
    setFormData({...oldState});
  }

  /**
   * send the data to the api
   */
  function sendData() {
    setLoading({status: true, type: 'active'});
    fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({...formData}),
    }).then( async (res: any) => {
      const resJson = await res.json();
      if (res.status === 201) {
        setError(null);
        setLoading({status: true, type: 'success'});
        cookie.set('jwt', resJson.jwt, {expires: 1});
        router.push('/');
      } else {
        setLoading({status: true, type: 'exception'});
        setError(resJson.message);
      }
    });
  }

  return (
    <section className="container header">
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <h1>Login</h1>

          <Col sm={6} xs={12}>
            <Input allowClear placeholder='identifiant' name="name"
              value={formData.name}
              onChange={(e) => handleForm(e)}
            />
          </Col>

          <Col sm={6} xs={12}>
            <Input allowClear placeholder='password' name="password"
              type='password'
              value={formData.password}
              onChange={(e) => handleForm(e)}
            />
          </Col>

          <Col sm={6} xs={12}>
            <Button type="primary" block onClick={() => sendData()}>
              Envoyer
            </Button>
          </Col>

          <Col span={24}>
            {error && <Alert message={error} type="error" showIcon />}
            {loading.status && <Progress percent={100} status={loading.type}/>}
          </Col>
        </Col>
      </Row>
    </section>
  );
};

export default Login;
