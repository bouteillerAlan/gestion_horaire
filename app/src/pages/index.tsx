import React, {useState} from 'react';
import '../style/scss/app.scss';
import '../theme/index.less';
import fetch from 'isomorphic-unfetch';
import {Button, Row, Col, Table, Tooltip, Tag, Icon, Badge, Popconfirm, Statistic} from 'antd';
import Link from 'next/link';

const Home = (props: any) => {
  const [customers, setCustomers] = useState(props.customers);
  const [adding, setAdding] = useState(props.adding);
  const [removal, setRemoval] = useState(props.removal);
  const {Column} = Table;
  const currentRemovalMonth = props.rMonth.mCurrent.length !== 0 ? props.rMonth.mCurrent[0].sum : 0;
  const currentAddMonth = props.aMonth.mCurrent.length !== 0 ? props.aMonth.mCurrent[0].sum : 0;
  const precRemovalMonth = props.rMonth.mPrec.length !== 0 ? props.rMonth.mPrec[0].sum : 0;
  const precAddMonth = props.aMonth.mPrec.length !== 0 ? props.aMonth.mPrec[0].sum : 0;
  console.log(props);

  /**
   * calc the sum of the given hours for one client
   */
  function getAdd(id: number) {
    const sum: any[] = [0];
    adding.forEach((add: any) => {
      if (add.idUser === id) {
        sum.push(add.sum);
      }
    });
    return sum.reduce((t, s) => {
      return t+s;
    });
  }

  /**
   * calc the sum of the remove hours for one client
   */
  function getRemove(id: number) {
    const sum: any[] = [0];
    removal.forEach((rem: any) => {
      if (rem.idUser === id) {
        sum.push(rem.sum);
      }
    });
    return sum.reduce((t, s) => {
      return t+s;
    });
  }

  /**
   * calc the sum of the rest hours for one client
   */
  function getRest(id: number) {
    return getAdd(id) - getRemove(id);
  }

  /**
   * allow to view the intervention and the adding hours for one client
   */
  function getInfos(id: number) {
    const data: any[] = [];
    adding.forEach((add: any) => {
      if (add.idUser === id) {
        add['type'] = 'add';
        add['key'] = `a${add.id}`;
        data.push(add);
      }
    });
    removal.forEach((rem: any) => {
      if (rem.idUser === id) {
        rem['type'] = 'rem';
        rem['key'] = `r${rem.id}`;
        data.push(rem);
      }
    });
    return data;
  }

  /**
   * handle the adding button
   */
  function handleAdd() {
    fetch(`http://127.0.0.1:3001/customers`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: 'nouveau client', description: null}),
    }).then((resp: any) => resp.json())
        .then((res: any) => {
          setCustomers([...customers, {id: res.identifiers[0].id, name: 'nouveau client', description: null}]);
        });
  }

  /**
   * handle the sub adding button
   */
  function handleSubAdd(type: string, idUser: number) {
    const table: string = type === 'rem' ? 'removal' : 'adding';
    const sqlDate: any = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const data: any = {date: sqlDate, sum: 1, idUser};
    console.log(data);
    fetch(`http://127.0.0.1:3001/${table}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    }).then((resp: any) => resp.json())
        .then((res: any) => {
          data['id'] = res.identifiers[0].id;
        type === 'rem' ?
          setRemoval([...removal, data]) :
          setAdding([...adding, data]);
        });
  }

  /**
   * handle the delete button
   */
  function handleDelete(id: number) {
    fetch(`http://127.0.0.1:3001/customers/${id}`, {
      method: 'DELETE',
    }).then((resp: any) => resp.json())
        .then((res: any) => {
          setCustomers(customers.filter((obj: any) => {
            return obj.id !== id;
          }));
        });
  }

  /**
   * handle the sub delete button
   */
  function handleSubDelete(id: number, type: string) {
    const table: string = type === 'rem' ? 'removal' : 'adding';
    fetch(`http://127.0.0.1:3001/${table}/${id}`, {
      method: 'DELETE',
    }).then((resp: any) => resp.json())
        .then((res: any) => {
        type === 'rem' ?
          setRemoval(removal.filter((obj: any) => {
            return obj.id !== id;
          })) :
          setAdding(adding.filter((obj: any) => {
            return obj.id !== id;
          }));
        });
  }

  /**
   * the sub row for each client
   */
  function expandedRowRender(record: any) {
    const datas: any = getInfos(record.id).sort((a: any, b: any) => {
      return Date.parse(b.date)-Date.parse(a.date);
    });
    return (
      <div>
        <div className='btn-group'>
          <Button onClick={() => handleSubAdd('add', record.id)}>Ajouter des heures</Button> <Button onClick={() => handleSubAdd('rem', record.id)}>Ajouter une prestation</Button>
        </div>
        <Table dataSource={datas} pagination={false} rowKey='key'>
          <Column title="Date" key="date"
            render={ (record) => (
              <span style={record.type === 'rem' ? {color: 'red'} : {color: 'green'}}>
                {record.date.replace(/(T)|(\.000Z)/g, ' ')}
              </span>
            )}/>
          <Column title="Nb. heures" key="temps" dataIndex="sum"/>
          <Column title="Type" key="type" render={(record) => (
            record.type === 'rem' ? <Icon type="caret-down" style={{color: 'red'}}/> : <Icon type="caret-up" style={{color: 'green'}}/>
          )}/>
          <Column title="" key="deleteRow"
            render={(record) => (
              <Popconfirm title="Voulez vous vraiment supprimer cette ligne ?" onConfirm={() => handleSubDelete(record.id, record.type)}>
                <Tooltip placement="right" title="Supprimer">
                  <Icon type="delete"/>
                </Tooltip>
              </Popconfirm>
            )}/>
          <Column title="" key="editRow"
            render={(record) => (
              <Link href='/edit/line/:id' as={`/edit/line/${record.key}`}>
                <a>
                  <Tooltip placement="right" title="Modifier">
                    <Icon type="edit" />
                  </Tooltip>
                </a>
              </Link>
            )}/>
        </Table>
      </div>
    );
  }

  return (
    <section className="container header">
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <div className="data-header">
            <Button onClick={() => handleAdd()}>
              Ajouter un client
            </Button>
            <Statistic title="Heure vendue du dernier mois" value={currentAddMonth} prefix={currentAddMonth>precAddMonth ? <Icon type="rise" /> : currentAddMonth===precAddMonth ? <Icon type="minus" /> : <Icon type="fall" />}/>
            <Statistic title="Heure consomée du dernier mois" value={currentRemovalMonth} prefix={currentRemovalMonth>precRemovalMonth ? <Icon type="rise" /> : currentRemovalMonth===precRemovalMonth ? <Icon type="minus" /> : <Icon type="fall" />}/>
          </div>
        </Col>
        <Col span={24}>
          <Table dataSource={customers} rowKey="id" expandedRowRender={(record: any) => expandedRowRender(record)} rowClassName={() => 'editable-row'}>
            <Column title="Id" dataIndex="id" key="id"
              render={(id) => (
                <span>
                  <Tag color="blue" key={id}>
                    {id}
                  </Tag>
                </span>
              )} />
            <Column title="Nom" key="action"
              render={(record) => (
                <Link href='/edit/customer/:id' as={`/edit/customer/${record.id}`}>
                  <a>
                    <Tooltip placement="right" title="Modifier">
                      {record.name}
                    </Tooltip>
                  </a>
                </Link>
              )}/>
            <Column title="Description" key="description"
              render={(record) => (
                <span>
                  {!!record.description ?
                          record.description :
                          <Link href='/edit/customer/:id' as={`/edit/customer/${record.id}`}>
                            <a>
                              <Tooltip placement="right" title="Ajouter une description">
                                <Icon className="edit-icon" type="form" />
                              </Tooltip>
                            </a>
                          </Link>}
                </span>
              )} />
            <Column title="Heure vendue" key="adding"
              render={(record) => (
                getAdd(record.id)
              )}/>
            <Column title="Heure utilisée" key="remove"
              render={(record) => (
                getRemove(record.id)
              )}/>
            <Column title="Heure restante" key="rest"
              render={(record) => (
                      getRest(record.id) >= 0 ? <Badge status="success" text={getRest(record.id)}/> : <Badge status="error" text={getRest(record.id)}/>
              )}/>
            <Column title="" key="deleteRow"
              render={(record) => (
                <Popconfirm title="Voulez vous vraiment supprimer cette ligne ?" onConfirm={() => handleDelete(record.id)}>
                  <Tooltip placement="right" title="Supprimer">
                    <Icon type="delete"/>
                  </Tooltip>
                </Popconfirm>
              )}/>
          </Table>
        </Col>
      </Row>
    </section>
  );
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
  await fetch('http://127.0.0.1:3001/adding/month')
      .then((resp: any) => resp.json())
      .then((res: any) => {
        data['aMonth'] = res;
      });
  await fetch('http://127.0.0.1:3001/removal/month')
      .then((resp: any) => resp.json())
      .then((res: any) => {
        data['rMonth'] = res;
      });
  return data;
};

export default Home;
