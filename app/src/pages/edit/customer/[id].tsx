import React, {useEffect, useState} from 'react';
import '../../../style/scss/app.scss';
import fetch from 'isomorphic-unfetch';
import {Button, Input, Row, Col, Avatar, Badge, Icon, Alert, Progress} from 'antd';
import '../../../theme/index.less';
import Router from 'next/router';
import {checkUser} from '../../../config/checkUser';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';

const API_URL = process.env.API_URL;

interface loadInt {
  status: boolean;
  type: 'active' | 'success' | 'exception' | 'normal' | undefined;
}

const Home = (props: any) => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState<loadInt>({status: false, type: 'active'});

  const client = props.customer[0];
  const {TextArea} = Input;
  const jwt = cookie.get('jwt');

  useEffect(() => {
    checkUser();
  });

  function handleForm(e: any) {
    const target = e.target;
    setError('');
    if (target.name === 'name') {
      setName(target.value);
    } else if (target.name === 'description') {
      setDescription(target.value);
    }
  }

  function sendData() {
    if (!name && !description) {
      setError('Vous n\'avez apporté aucune modification');
    } else {
      setLoading({status: true, type: 'active'});
      fetch(`${API_URL}/customers/${client.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}`},
        body: JSON.stringify({name, description}),
      }).then((res: any) => {
        console.log(res);
        if (res.status === 200) {
          setLoading({status: true, type: 'success'});
        } else {
          setLoading({status: true, type: 'exception'});
          setError(res.statusText);
        }
      });
    }
  }

  return (
    <section className="container header">
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <div className="header-avatar">
            <Button type="primary" size="small" onClick={() => Router.push('/')}>
              <Icon type="left" />
            </Button>
            <Badge count={client.id}>
              <Avatar shape="square" size="small">
                {name ? name.slice(0, 1)[0].toUpperCase() : client.name.slice(0, 1)[0].toUpperCase()}
              </Avatar>
            </Badge>
            <p>Modification</p>
          </div>
        </Col>
        <Col span={24}>
          <Input allowClear placeholder={client.name} value={name} name="name" onChange={(e) => handleForm(e)}/>
        </Col>
        <Col span={24}>
          <TextArea allowClear placeholder={client.description} value={description} name="description" onChange={(e) => handleForm(e)}/>
        </Col>
        <Col span={24}>
          <Button type="primary" block onClick={() => sendData()}>
            Envoyer
          </Button>
        </Col>
        <Col span={24}>
          {error && <Alert message={error} type="error" showIcon />}
          {loading.status && <Progress percent={100} status={loading.type}/>}
        </Col>
      </Row>
    </section>
  );
};

Home.getInitialProps = async function(context: any) {
  const {jwt} = nextCookie(context);
  const options = {headers: {'Authorization': `Bearer ${jwt}`}};

  return fetch(`${API_URL}/customers/${context.query.id}/false`, options)
      .then((resp: any) => resp.json())
      .then((res: any) => {
        return {customer: res};
      });
};

export default Home;
