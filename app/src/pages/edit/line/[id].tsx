import React, {useState} from 'react';
import '../../../style/scss/app.scss';
import fetch from 'isomorphic-unfetch';
import {Button, Input, Row, Col, Avatar, Badge, Icon, Alert, Progress, DatePicker} from 'antd';
import '../../../theme/index.less';
import Router from 'next/router';

const API_URL = 'http://127.0.0.1:3001';

interface loadInt {
  status: boolean;
  type: 'active' | 'success' | 'exception' | 'normal' | undefined;
}

const Home = (props: any) => {
  const [date, setDate] = useState();
  const [sum, setSum] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState<loadInt>({status: false, type: 'active'});
  console.log(props);
  const type: string = props.type;
  const line: any = props.row[0];

  function handleSum(e: any) {
    const target = e.target;
    setError('');
    setSum(target.value);
  }

  function handleDate(date: any, dateString: any) {
    setDate(date);
  }

  function sendData() {
    if (!date && !sum) {
      setError('Vous n\'avez apporté aucune modification');
    } else {
      setLoading({status: true, type: 'active'});
      fetch(`${API_URL}/${type}/${line.id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({date, sum}),
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
            <p>{type} line modification</p>
          </div>
        </Col>
        <Col sm={6} xs={12}>
          <Input allowClear placeholder={line.sum} value={sum} name="sum" onChange={(e) => handleSum(e)}/>
        </Col>
        <Col sm={6} xs={12}>
          <DatePicker placeholder={line.date.replace(/(T)|(\.000Z)/g, ' ')} onChange={handleDate}/>
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
      </Row>
    </section>
  );
};

Home.getInitialProps = async function(context: any) {
  const table = context.query.id.slice(0, 1) === 'a' ? 'adding' : 'removal';
  const id = context.query.id.slice(1);
  return fetch(`${API_URL}/${table}/${id}`)
      .then((resp: any) => resp.json())
      .then((res: any) => {
        return {type: table, row: res};
      });
};

export default Home;
