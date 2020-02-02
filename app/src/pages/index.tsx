import React, {useState} from 'react';
import '../style/scss/app.scss';
import fetch from 'isomorphic-unfetch';
import {DatePicker, Button, Input, Select, Row, Col, Table, Tooltip, Tag, Icon, Badge} from 'antd';
import '../theme/index.less';
import Link from 'next/link';

const Home = (props: any) => {
  console.log(props);
  const [customers, setCustomers] = useState(props.customers);
  const [adding, setAdding] = useState(props.adding);
  const [removal, setRemoval] = useState(props.removal);

  const { Column } = Table;
  const { Option } = Select;

  /**
   * calc the sum of the given hours for one client
   */
  function getAdd(id: number) {
    const sum: any[] = [0];
    adding.forEach((add: any) => {
      if (add.idUser === id) {sum.push(add.sum)}
    });
    return sum.reduce((t, s) => {return t+s});
  }

  /**
   * calc the sum of the remove hours for one client
   */
  function getRemove(id: number) {
    const sum: any[] = [0];
    removal.forEach((rem: any) => {
      if (rem.idUser === id) {sum.push(rem.sum)}
    });
    return sum.reduce((t, s) => {return t+s});
  }

  /**
   * calc the sum of the rest hours for one client
   */
  function getRest(id: number) {
    return getAdd(id) - getRemove(id)
  }

  /**
   * allow to view the intervention and the adding hours for one client
   */
  function getInfos(id: number) {
    const data: any[] = [];
    adding.forEach((add: any) => {
      if (add.idUser === id) {
        add['type'] = 'add';
        data.push(add);
      }
    });
    removal.forEach((rem: any) => {
      if (rem.idUser === id) {
        rem['type'] = 'rem';
        data.push(rem);
      }
    });
    return data;
  }

  /**
   * the sub row for each client
   */
  function expandedRowRender(record: any) {
    const datas = getInfos(record.id);
    console.log(datas);
    return (
      <Table dataSource={datas} pagination={false} rowKey='id'>
        <Column title="Date" key="date" render={record => (record.date.replace(/(T)|(\.000Z)/g, ' '))}/>
        <Column title="Nb. heures" key="temps" dataIndex="sum"/>
        <Column title="Type" key="type" render={record => (
          record.type === 'rem' ? <Icon type="caret-down" style={{color: 'red'}}/> : <Icon type="caret-up" style={{color: 'green'}}/>
        )}/>
      </Table>
    );
  }

  /**
   * handle the adding button
   */
  function handleAdd() {
    fetch(`http://127.0.0.1:3001/customers`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: 'nouveau client', description: null})
    }).then((resp: any) => resp.json())
      .then((res: any) => {
        setCustomers([...customers, {id: res.identifiers[0].id, name: 'nouveau client', description: null}])
      })
  }

  return (
    <section className="container header">
      <Row gutter={[8, 8]}>
        {/*<Col span={24}>*/}
        {/*  <Select showSearch defaultValue={clients.length > 0 && clients![0].id} optionFilterProp="children" style={{width: '100%'}} filterOption={(input: string, option: any) =>*/}
        {/*    option.props.children!.toLowerCase().indexOf(input.toLowerCase()) >= 0*/}
        {/*  }>*/}
        {/*    {clients.map((client: any) => (*/}
        {/*      <Option key={client.id} value={client.id}>{client.name}</Option>*/}
        {/*    ))}*/}
        {/*  </Select>*/}
        {/*</Col>*/}
        {/*<Col span={24}>*/}
        {/*  <Input allowClear placeholder="Ajouter des heures"/>*/}
        {/*</Col>*/}
        {/*<Col span={24}>*/}
        {/*  <Input allowClear placeholder="Enlever des heures"/>*/}
        {/*</Col>*/}
        {/*<Col span={24}>*/}
        {/*  <DatePicker/>*/}
        {/*</Col>*/}
        {/*<Col span={24}>*/}
        {/*  <Button type="primary" block>*/}
        {/*    Envoyer*/}
        {/*  </Button>*/}
        {/*</Col>*/}
        <Col span={24}>
          <Button onClick={() => handleAdd()}>
            Ajouter une ligne
          </Button>
        </Col>
        <Col span={24}>
          <Table dataSource={customers} rowKey="id" expandedRowRender={(record: any) => expandedRowRender(record)}>
            <Column title="Id" dataIndex="id" key="id"
                    render={id => (
                      <span>
                        <Tag color="blue" key={id}>
                          {id}
                        </Tag>
                      </span>
                    )} />
            <Column title="Nom" key="action"
                    render={record => (
                      <Link href='/edit/:id' as={`/edit/${record.id}`}>
                        <a>
                          <Tooltip placement="right" title="Modifier">
                          {record.name}
                          </Tooltip>
                        </a>
                      </Link>
                    )}/>
            <Column title="Description" key="description"
                    render={record => (
                      <span>
                        {!!record.description ?
                          record.description :
                          <Link href='/edit/:id' as={`/edit/${record.id}`}>
                            <a>
                              <Tooltip placement="right" title="Ajouter une description">
                                <Icon className="edit-icon" type="form" />
                              </Tooltip>
                            </a>
                          </Link>}
                      </span>
                    )} />
            <Column title="Heure vendue" key="adding"
                    render={record => (
                      getAdd(record.id)
                    )}/>
            <Column title="Heure utilisée" key="remove"
                    render={record => (
                      getRemove(record.id)
                    )}/>
            <Column title="Heure restante" key="rest"
                    render={record => (
                      getRest(record.id) >= 0 ? <Badge status="success" text={getRest(record.id)}/> : <Badge status="error" text={getRest(record.id)}/>
                    )}/>
          </Table>
        </Col>
      </Row>
    </section>
  )
};

Home.getInitialProps = async function() {
  const data: any = {};
  await fetch('http://127.0.0.1:3001/customers')
    .then((resp: any) => resp.json())
    .then((res: any) => {
      data['customers'] = res;
    });
  await fetch('http://127.0.0.1:3001/adding')
    .then((resp: any) => resp.json())
    .then((res: any) => {
      data['adding'] = res;
    });
  await fetch('http://127.0.0.1:3001/removal')
    .then((resp: any) => resp.json())
    .then((res: any) => {
      data['removal'] = res;
    });
  return data;
};

export default Home;
