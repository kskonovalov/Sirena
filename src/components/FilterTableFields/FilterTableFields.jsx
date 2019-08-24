import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc';

const FilterTableFields = props => {
  const { tableFields, updateTableFields } = props;

  const toggleField = field => {
    const newFields = {
      ...tableFields
    };
    newFields[field] = {
      ...newFields[field],
      visible: !tableFields[field].visible
    };
    updateTableFields(newFields);
  };

  const DragHandle = SortableHandle(() => (
    <span className="filter-table-fields__drag">&harr;</span>
  ));

  const SortableItem = SortableElement(({ itemKey: key, value }) => (
    <li key={key} className="list-inline-item filter-table-fields__item">
      <button
        type="button"
        className={`btn filter-table-fields__button ${
          value.visible ? 'btn-secondary active' : 'btn-light'
        }`}
        onClick={() => toggleField(key)}
      >
        <DragHandle />
        {value.name}
      </button>
    </li>
  ));
  const SortableList = SortableContainer(({ items }) => {
    return (
      <ul className="btn-group filter-table-fields__wrap">
        {Object.keys(items).map(key => (
          <SortableItem
            key={key}
            itemKey={key}
            index={items[key].index}
            value={items[key]}
          />
        ))}
      </ul>
    );
  });

  const onSortEnd = ({ oldIndex, newIndex }) => {
    // this.setState(({items}) => ({
    //   items: arrayMove(items, oldIndex, newIndex),
    // }));
    const newTableFields = {};
    Object.keys(tableFields).forEach(key => {
      switch (tableFields[key].index) {
        case oldIndex:
          newTableFields[key] = {
            ...tableFields[key],
            index: newIndex
          };
          break;
        case newIndex:
          newTableFields[key] = {
            ...tableFields[key],
            index: oldIndex
          };
          break;
        default:
          newTableFields[key] = tableFields[key];
      }
    });
    updateTableFields(newTableFields);
  };

  return (
    <SortableList
      axis="x"
      items={tableFields}
      onSortEnd={onSortEnd}
      useDragHandle
    />
  );
};

FilterTableFields.propTypes = {
  tableFields: PropTypes.objectOf(PropTypes.object).isRequired,
  updateTableFields: PropTypes.func.isRequired
};

export default FilterTableFields;
