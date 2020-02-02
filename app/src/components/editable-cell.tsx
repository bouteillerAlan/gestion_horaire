import React, {useState} from 'react';
import '../../src/theme/index.less';
import {Form, Input} from 'antd';
import {Simulate} from 'react-dom/test-utils';

const EditableContext = React.createContext('');

const EditableRow = ({ form, index, ...props }: any) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

const EditableCell = (props: any) => {
  const {
    editable,
    dataIndex,
    title,
    record,
    index,
    handleSave,
    children,
    ...restProps
  } = props;
  const [editing, setEditing] = useState(false);

  /**
   * handle the edit for the cell
   */
  function handleEdit() {
    setEditing(!editing);
  }

  function save() {
    console.log(save);
  }

  function renderCell(form: any) {
    const { children, dataIndex, record, title } = props;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`
            }
          ],
          initialValue: record[dataIndex]
        })(
          <Input
            // ref={node => (input = node)}
            onPressEnter={save}
            onBlur={save}
          />
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={handleEdit}
      >
        {children}
      </div>
    );
  }

  return (
    <td {...restProps}>
      {editable ? (
        <EditableContext.Consumer>{renderCell}</EditableContext.Consumer>
      ) : (
        children
      )}
    </td>
  );
};

export default EditableCell;
